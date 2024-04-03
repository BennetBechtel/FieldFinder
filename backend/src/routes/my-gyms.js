import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Gym from "../models/gym.js";
import verifyToken from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("pricePerHour")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Hour is required and must be an number"),
    body("filters")
      .notEmpty()
      .isArray()
      .withMessage("Select at least one filter"),
  ],
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newGym = req.body;

      // Upload Images to Cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Add urls and missing information to the newGym
      newGym.imageUrls = imageUrls;
      newGym.lastUpdated = new Date();
      newGym.userId = req.userId;

      // Save newGym to the Database
      const gym = new Gym(newGym);
      await gym.save();

      // Return 201 status
      res.status(201).send(gym);
    } catch (error) {
      console.log("Error creating Gym: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req, res) => {
  try {
    const gyms = await Gym.find({ userId: req.userId });
    res.status(200).json(gyms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gyms" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const gym = await Gym.find({
      _id: id,
      userId: req.userId,
    });
    res.json(gym);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gym" });
  }
});

export default router;

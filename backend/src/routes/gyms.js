import express from "express";
import Gym from "../models/gym.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const pageSize = 10;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const searchTerm = req.query.searchTerm;

    const skip = (pageNumber - 1) * pageSize;

    let gyms;
    let total;
    if (searchTerm === "") {
      gyms = await Gym.find().skip(skip).limit(pageSize);

      total = await Gym.countDocuments();
    } else {
      const modSearchTerm =
        searchTerm[0].toUpperCase() + searchTerm.slice(1).toLowerCase();
      gyms = await Gym.find({ city: modSearchTerm }).skip(skip).limit(pageSize);

      total = await Gym.countDocuments({ city: modSearchTerm });
    }

    const response = {
      data: gyms,
      pagination: {
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
        total,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

export default router;

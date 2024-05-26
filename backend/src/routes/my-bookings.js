import express from "express";
import verifyToken from "../middleware/auth.js";
import Gym from "../models/gym.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const gyms = await Gym.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = gyms.map((gym) => {
      const userBookings = gym.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const gymWithUserBookings = {
        ...gym.toObject(),
        bookings: userBookings,
      };

      return gymWithUserBookings;
    });
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;

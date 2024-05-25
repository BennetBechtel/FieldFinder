import "dotenv/config";
import express from "express";
import verifyToken from "../middleware/auth.js";
import { param, validationResult } from "express-validator";
import Gym from "../models/gym.js";
import {
  generateAccessToken,
  handleResponse,
  createOrder,
  captureOrder,
} from "../util/paypal-api-functions.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "A-Z":
        sortOptions = { name: 1 };
        break;
      case "Z-A":
        sortOptions = { name: -1 };
        break;
      case "pricePerHourAsc":
        sortOptions = { pricePerHour: 1 };
        break;
      case "pricePerHourDesc":
        sortOptions = { pricePerHour: -1 };
        break;
    }

    const pageSize = 16;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const gyms = await Gym.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Gym.countDocuments(query);

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
    console.log(error);
    res.status(500).json("Something went wrong");
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Gym ID is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const gym = await Gym.findById(id);
      res.json(gym);
    } catch (error) {
      res.status(400).json({ message: "Error fetching gym" });
    }
  }
);

router.post("/:id/orders", verifyToken, async (req, res) => {
  try {
    const { numberOfHours } = req.body;
    const gymId = req.params.id;

    const { jsonResponse, httpStatusCode } = await createOrder(
      gymId,
      numberOfHours
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.post("/:id/orders/:orderID/capture", verifyToken, async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

router.post("/:id/bookings", verifyToken, async (req, res) => {
  try {
    const newBooking = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bookingDate: req.body.bookingDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      userId: req.userId,
      totalCost: req.body.totalCost,
    };

    const gym = await Gym.findOneAndUpdate(
      { _id: req.params.id.toString() },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!gym) {
      return res.status(400).json({ message: "Gym not found" });
    }

    await gym.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.searchTerm) {
    const modSearchTerm =
      queryParams.searchTerm[0].toUpperCase() +
      queryParams.searchTerm.slice(1).toLowerCase();

    constructedQuery.$or = [
      { city: new RegExp(modSearchTerm, "i") },
      { name: new RegExp(modSearchTerm, "i") },
      { address: new RegExp(modSearchTerm, "i") },
      { zipCode: new RegExp(modSearchTerm, "i") },
    ];
  }

  if (queryParams.sports) {
    constructedQuery.sports = {
      $all: Array.isArray(queryParams.sports)
        ? queryParams.sports
        : [queryParams.sports],
    };
  }

  if (queryParams.equipment) {
    constructedQuery.equipment = {
      $all: Array.isArray(queryParams.equipment)
        ? queryParams.equipment
        : [queryParams.equipment],
    };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerHour = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;

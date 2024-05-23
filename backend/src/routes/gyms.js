import express from "express";
import verifyToken from "../middleware/auth.js";
import { param, validationResult } from "express-validator";
import Gym from "../models/gym.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

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

router.post("/:id/bookings/payment-intent", verifyToken, async (req, res) => {
  const { numberOfHours } = req.body;
  const gymId = req.params.id;

  const gym = await Gym.findById(gymId);
  if (!gym) {
    return res.status(400).json({ message: "Gym not found" });
  }

  const totalCost = gym.pricePerHour * numberOfHours;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "EUR",
    metadata: {
      gymId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: "Error creating payment intent" });
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    client_secret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);
});

router.post("/:id/bookings", verifyToken, async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (
      paymentIntent.metadata.gymId !== req.params.id ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking = {
      ...req.body,
      userId: req.userId,
    };

    const gym = await Gym.findOneAndUpdate(
      { _id: req.params.id },
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

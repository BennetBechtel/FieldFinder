import "dotenv/config";
import express from "express";
import verifyToken from "../middleware/auth.js";
import { param, validationResult } from "express-validator";
import Gym from "../models/gym.js";
import paypal from "@paypal/checkout-server-sdk";

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

/* router.post("/:id/bookings/payment-intent", verifyToken, async (req, res) => {
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
}); */

/* router.post("/:id/orders", verifyToken, async (req, res) => {
  const Environment =
    process.env.NODE_ENV === "production"
      ? paypal.core.LiveEnvironment
      : paypal.core.SandboxEnvironment;

  const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )
  );

  const { numberOfHours } = req.body;
  const gymId = req.params.id;

  const gym = await Gym.findById(gymId);
  if (!gym) {
    return res.status(400).json({ message: "Gym not found" });
  }

  const totalCost = gym.pricePerHour * numberOfHours;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: totalCost,
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: totalCost,
            },
          },
        },
        items: [
          {
            name: gym.name,
            unit_amount: {
              currency_code: "EUR",
              value: gym.pricePerHour,
            },
            quantity: numberOfHours,
          },
        ],
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating order" });
  }
});

router.post("/:id/capture-order", verifyToken, async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.status(200).json(captureData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}); */

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

// PayPal-Api
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

const createOrder = async (gymId, numberOfHours) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const gym = await Gym.findById(gymId);
  if (!gym) {
    return res.status(400).json({ message: "Gym not found" });
  }

  const totalCost = gym.pricePerHour * numberOfHours;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: totalCost,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

export default router;

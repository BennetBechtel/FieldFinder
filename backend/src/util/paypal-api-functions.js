import "dotenv/config";
import Gym from "../models/gym.js";

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

const correctDate = (date) => {
  const start = date.substring(0, date.indexOf("T") + 1);
  let time = String(
    Number(date.substring(date.indexOf("T") + 1, date.indexOf("T") + 3))
  );
  if (time < 10) {
    time = "0" + time;
  }
  const end = date.substring(date.indexOf("T") + 3, date.length);

  const output = start + time + end;
  return output;
};

const isDateValid = (start, end, bookings) => {
  const newStart = new Date(correctDate(start.toString()));
  const newEnd = new Date(correctDate(end.toString()));

  if (newStart > newEnd) {
    return false;
  }

  let events = [];
  bookings.forEach((booking) => {
    events.push({
      start: new Date(booking.startTime.toString().substring(0, 19)),
      end: new Date(booking.endTime.toString().substring(0, 19)),
    });
  });

  let isValid = true;
  events.forEach((event) => {
    const existingStart = new Date(event.start.toString());
    const existingEnd = new Date(event.end.toString());

    if (newStart <= existingStart && newEnd >= existingEnd) {
      isValid = false;
    }
    if (newStart <= existingStart && newEnd > existingStart) {
      isValid = false;
    }
    if (newStart < existingEnd && newEnd >= existingEnd) {
      isValid = false;
    }
    if (newStart >= existingStart && newEnd <= existingEnd) {
      isValid = false;
    }
  });

  return isValid;
};

export { createOrder, captureOrder, isDateValid };

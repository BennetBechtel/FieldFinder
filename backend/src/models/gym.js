import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  firstLast: { type: String, required: true },
  email: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

const gymSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  sports: [{ type: String, required: true }],
  equipment: [{ type: String, required: true }],
  pricePerHour: { type: Number, required: true },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
});

const Gym = mongoose.model("Gym", gymSchema);

export default Gym;

import mongoose from "mongoose";

const gymSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sports: [
    {
      type: String,
      required: true,
    },
  ],
  equipment: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerHour: {
    type: Number,
    required: true,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const Gym = mongoose.model("Gym", gymSchema);

export default Gym;

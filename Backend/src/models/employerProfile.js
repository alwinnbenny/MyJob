import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: String,

    company : String,
  },
  {
    timestamps: true,
  },
);

export const EmployerProfile = mongoose.model(
  "EmployerProfile",
  employerProfileSchema,
);

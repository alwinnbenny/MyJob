import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: String,

    experience: String,

    skills: [String],

    profileImage: String,

    resume: String,
  },
  {
    timestamps: true,
  },
);

export const CandidateProfile = mongoose.model(
  "CandidateProfile",
  candidateProfileSchema,
);

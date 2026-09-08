import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // company: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "EmployerProfile",
    //   required: true,
    // },
    
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Remote",
        "Hybrid",
      ],
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    openings: {
      type: Number,
      required: true,
      min: 1,
    },

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Job = mongoose.model("Job", jobSchema);

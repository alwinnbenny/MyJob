import { EmployerProfile } from "../models/employerProfile.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/postjob.model.js";

export const employerProfile = async (req, res) => {
  try {
    const { phone, company } = req.body;

    if (!phone || !company) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }
    const existingProfile = await EmployerProfile.findOne({
      user: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Employer already exists",
      });
    }

    const profile = await EmployerProfile.create({
      user: req.user._id,
      phone,
      company,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get profile

export const getEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({
      user: req.user._id,
    }).populate("user", "username email");

    if (!profile) {
      return res.status(404).json({
        message: "Please complete the profile",
      });
    }

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update employer-phone and company

export const updateEmployerProfile = async (req, res) => {
  try {
    const { phone, company } = req.body;

    const profile = await EmployerProfile.findOne({
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Employer profile not found",
      });
    }

    profile.phone = phone;
    profile.company = company;

    await profile.save();

    return res.status(200).json({
      message: "Employer profile updated successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get applicants — only for an employer's jobs
export const getApplicants = async (req, res) => {
  try {
    const myJobs = await Job.find({ employer: req.user._id }, { _id: 1 });
    const jobIds = myJobs.map((job) => job._id);

    // Find applications only for those jobs
    const applicants = await Application.find({ job: { $in: jobIds } })
      .populate("candidate", "username email")
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    return res.status(200).json(applicants);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



//get company

export const getEmployers = async (req, res) => {
  try {
    const employers = await EmployerProfile.find()
      .populate("user", "fullname email");

    res.status(200).json({
      employers,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employers",
      error: error.message,
    });
  }
};
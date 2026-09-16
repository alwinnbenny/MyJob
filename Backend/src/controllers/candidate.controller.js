import { CandidateProfile } from "../models/candidateProfile.model.js";
import { Job } from "../models/postjob.model.js";
import { Application } from "../models/application.model.js";
import cloudinary from "../utils/cloudinary.js";

export const candidateProfile = async (req, res) => {
  try {
    const { phone, experience, skills } = req.body;

    if (!phone || !experience || !skills) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingProfile = await CandidateProfile.findOne({
      user: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Candidate profile already exists",
      });
    }

    // Upload profile image to Cloudinary if provided
    let profileImageUrl = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "candidate_profiles" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });
      profileImageUrl = result.secure_url;
    }

    const profile = await CandidateProfile.create({
      user: req.user._id,
      phone,
      experience,
      skills,
      profileImage: profileImageUrl,
    });

    return res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCandidateProfile = async (req, res) => {
  try {
    console.log(req.user._id);
    const profile = await CandidateProfile.findOne({
      user: req.user._id,
    });

    console.log(profile);

    if (!profile) {
      return res.status(404).json({
        message: "Candidate profile not found",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update candidate

export const updateCandidateProfile = async (req, res) => {
  try {
    const { phone, experience, skills } = req.body;

    const profile = await CandidateProfile.findOne({
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Candidate profile not found",
      });
    }

    profile.phone = phone;
    profile.experience = experience;
    profile.skills = skills;

    // Upload new profile image to Cloudinary if provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "candidate_profiles" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });
      profile.profileImage = result.secure_url;
    }

    await profile.save();

    res.status(200).json({
      message: "Candidate profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//apply for Job

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not Found",
      });
    }

    //is active

    if (job.status !== "Active") {
      return res.status(404).json({
        message: "No longer accepting responses",
      });
    }

    if (new Date() > new Date(job.deadline)) {
      return res.status(404).json({
        message: "Deadline Exceeded",
      });
    }

    const profile = await CandidateProfile.findOne({
      user: req.user._id,
    });

    if (!profile) {
      return res.status(400).json({
        message: "Please complete your profile before applying",
      });
    }

    const existingApplication = await Application.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get applicants - find with jobId in application schema

export const getApplicants = async (req, res) => {
  try {
    const applicants = await Application.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

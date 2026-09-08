import { CandidateProfile } from "../models/candidateProfile.model.js";
import { Job } from "../models/postjob.model.js";
import { Application } from "../models/application.model.js";

export const candidateProfile = async (req, res) => {
  try {
    const { phone, experience, skills, profileImage, resume } = req.body;

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

    const profile = await CandidateProfile.create({
      user: req.user._id,
      phone,
      experience,
      skills,
      profileImage,
      resume,
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
    const { phone, experience, skills, profileImage, resume } = req.body;

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

    if (profileImage !== undefined) {
      profile.profileImage = profileImage;
    }

    if (resume !== undefined) {
      profile.resume = resume;
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

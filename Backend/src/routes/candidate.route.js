import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import {
  applyJob,
  candidateProfile,
  getCandidateProfile,
  updateCandidateProfile,
} from "../controllers/candidate.controller.js";
import { getJobs, getSingleJob } from "../controllers/Job.controller.js";

export const router = Router();

// candidate
router.route("/complete-profile").post(verifyJWT, candidateProfile);
router.route("/profile").get(verifyJWT, getCandidateProfile);
router.route("/update-profile").put(verifyJWT, updateCandidateProfile);
router.route("/applications/applyjob/:jobId").post(verifyJWT, applyJob);
router.route("/joblist").get(getJobs);
router.route("/getsinglejob/:id").get(verifyJWT, getSingleJob);

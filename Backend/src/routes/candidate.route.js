import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import {
  applyJob,
  candidateProfile,
  getCandidateProfile,
  updateCandidateProfile,
} from "../controllers/candidate.controller.js";
import { getJobs, getSingleJob } from "../controllers/Job.controller.js";
import { upload } from "../middleware/upload.js";

export const router = Router();


router.route("/complete-profile").post(verifyJWT, upload.single("profileImage"), candidateProfile);
router.route("/profile").get(verifyJWT, getCandidateProfile);
router.route("/update-profile").put(verifyJWT, upload.single("profileImage"), updateCandidateProfile);
router.route("/applications/applyjob/:jobId").post(verifyJWT, applyJob);
router.route("/joblist").get(getJobs);
router.route("/getsinglejob/:id").get(verifyJWT, getSingleJob);

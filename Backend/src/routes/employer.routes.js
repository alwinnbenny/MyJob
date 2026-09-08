import { Router } from "express";
import { isEmployee, verifyJWT } from "../middleware/auth.js";
import {
  deleteJob,
  getEmployerStats,
  getJobs,
  getMyJobs,
  getRecentJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/Job.controller.js";
import { getApplicants } from "../controllers/employer.controller.js";
import {
  employerProfile,
  getEmployerProfile,
  updateEmployerProfile,
} from "../controllers/employer.controller.js";

export const router = Router();

//employee

router.route("/postjob").post(verifyJWT, isEmployee, postJob);
router.route("/joblist").get(verifyJWT, isEmployee, getJobs);
router.route("/applicantlist").get(verifyJWT, isEmployee, getApplicants);
router.route("/getmyjob").get(verifyJWT, isEmployee, getMyJobs);
router.route("/getsinglejob/:id").get(verifyJWT, isEmployee, getSingleJob);
router.route("/getrecentjob").get(verifyJWT, isEmployee, getRecentJobs);
router.route("/updatejob/:id").put(verifyJWT, isEmployee, updateJob);
router.route("/deletejob/:id").delete(verifyJWT, isEmployee, deleteJob);
router.route("/complete-profile").post(verifyJWT, isEmployee, employerProfile);
router.route("/profile").get(verifyJWT, isEmployee, getEmployerProfile);
router.route("/update-profile").put(verifyJWT, isEmployee, updateEmployerProfile);
router.route("/employerstats").get(verifyJWT, isEmployee, getEmployerStats);

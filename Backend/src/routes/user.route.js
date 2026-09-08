import { Router } from "express";
import { createAccount, forgotPassword, loginUser, logOut, resetPassword, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.js";



export const router = Router();


router.route("/create-account").post(createAccount);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/update-user").put(verifyJWT,updateUser);
router.route("/logout").post(verifyJWT,logOut);
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { GenerateToken } from "../utils/generateToken.js";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

export const createAccount = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmpassword, role } =
      req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "passwords do not match",
      });
    }

    if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !confirmpassword ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "user Registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("CREATE ACCOUNT ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "invalid credentials",
      });

    const token = GenerateToken(user, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal Server error",
      error,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "user not found",
      });

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//forgot password -token generation

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    //generate reset token

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    return res.status(200).json({
      message: "Password reset token generated successfully",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//reset password- token validation

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update user username amd email

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        message: "Usename and email required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "email already exists",
      });
    }
    

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username = username;
    user.email = email.toLowerCase();

    await user.save();

    return res.status(200).json({
      message: "User profile updated successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//google OAuth


const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();//details about the user 

    const {
      sub,
      email,
      name,
      picture,
    } = payload;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not available",
      });
    }

  
    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Create new user if not found
    if (!user) {
      let username = email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

     
      const existingUsername = await User.findOne({
        username,
      });

      if (existingUsername) {
        username = `${username}${Date.now()}`;
      }

      user = await User.create({
        fullname: name || username,
        username,
        email: email.toLowerCase(),
        googleId: sub,
        role: "candidate",
      });
    } else {

      // If existing user doesn't have googleId,

      // connect the Google account to it.

      if (!user.googleId) {
        user.googleId = sub;
        await user.save();
      }
    }

   
    const token = GenerateToken(user, res);

    return res.status(200).json({
      message: "Google login successful",

      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: picture || null,
      },

      token,
    });

  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
};
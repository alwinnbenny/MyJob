import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

//read the token from the request
//check if token is valid
export const verifyJWT= async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return res.status(401).json({ error: "Not Authorized,no token provided" });

  try {
    //verify token and extract user id

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    //if user not exists
    if (!user)
      return res.status(401).json({
        message: "User not found",
      });
    req.user = user;
    next();
    
  } catch (error) {
    res.status(500).json({ error: "Not authorized,token failed " });
  }
};

export const isEmployee = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};
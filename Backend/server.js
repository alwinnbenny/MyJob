import dotenv from "dotenv";
import cors from "cors"

dotenv.config({ path: "./.env" });

import express from "express";
import { connectDB } from "./src/config/db.js";
import { router as employerRouter } from "./src/routes/employer.routes.js";
import { router as candidateRouter } from "./src/routes/candidate.route.js";
import { router as userRouter } from "./src/routes/user.route.js";

export const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/job-portal/employer", employerRouter);
app.use("/api/job-portal/candidate", candidateRouter);
app.use("/api/job-portal", userRouter);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found:",
  });
});

const serverStart = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server Running on port: ${process.env.PORT || 4000}`);
    });
  } catch (error) {
    console.log("Server failed to start:", error);
    process.exit(1);
  }
};

serverStart();

import mongoose from "mongoose";
import dns from "dns";

// Force public DNS servers to fix SRV lookup failures on mobile/restricted networks
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected !!!");
  } catch (error) {
    console.log("mongoDB failed to connect", error);
    process.exit(1);
  }
};

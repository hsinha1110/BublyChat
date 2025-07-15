import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

export default connectDB;

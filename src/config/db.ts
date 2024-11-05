import mongoose from "mongoose";
import config from ".";

const connectDB = async () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;

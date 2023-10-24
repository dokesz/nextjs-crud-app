import mongoose from "mongoose";

let isConnected = false; //track if db is connected

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    isConnected = false; // Reset the connection status
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow the error for further debugging
  }
};

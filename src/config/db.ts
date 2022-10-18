import mongoose from "mongoose";

export const connectDB = async () => {
  const uri: any = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

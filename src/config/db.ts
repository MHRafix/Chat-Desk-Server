import mongoose from "mongoose";

export const connectDB = async () => {
  const uri: any = process.env.MONGO_URI;
  try {
    const conn: any = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

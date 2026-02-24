import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected`.bgRed);
  } catch (error) {
    await mongoose.disconnect();
    console.log("database connection failed");
    process.exit(1);
  }
};

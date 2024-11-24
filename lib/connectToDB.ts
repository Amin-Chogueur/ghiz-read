import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI!);
    console.log("db connected");
  } catch (error) {
    console.log("can not connect to db");
  }
}

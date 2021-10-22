import mongoose from "mongoose";

//the connection to the database
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;

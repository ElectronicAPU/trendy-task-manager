import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "data_tables",
    });

    console.log(`MongoDB connected on ${connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`);
  }
};

import mongoose from "mongoose";

const config = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (config.isConnected) {
    return;
  }
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "data_tables",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("dbConnection", config.isConnected);
    config.isConnected = dbConnection.connection.readyState;

    // Set maximum number of listeners to avoid MaxListenersExceededWarning
    dbConnection.connection.setMaxListeners(15);

    // Event listener for successful connection
    dbConnection.connection.on("connected", () => {
      console.log(`MongoDB connected on ${dbConnection.connection.host}`);
    });

    // Event listener for connection error
    dbConnection.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    // Event listener for disconnected
    dbConnection.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Close the Mongoose connection if the Node process ends
    process.on("SIGINT", () => {
      dbConnection.connection.close(() => {
        console.log(
          "MongoDB connection closed due to Node process termination"
        );
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
  }
};

const mongoose = require('mongoose');

const connectDB = async () => {
  // MongoDB connection options
  const options = {
    serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
    retryWrites: true,
    retryReads: true,
    connectTimeoutMS: 15000
  };

  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, options);

    // Set up connection event handlers
    mongoose.connection.on('connected', () => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    });

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Will auto-reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

    // Initial connection successful
    console.log('MongoDB connection established successfully');
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Throw the error for handling in the main app
    throw error;
  }
};

module.exports = connectDB;

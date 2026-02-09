const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Import routes
const birthRoutes = require('./routes/birthRoutes');
const deathRoutes = require('./routes/deathRoutes');
const marriageRoutes = require('./routes/marriageRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB with retries
const connectWithRetry = async (retryCount = 0) => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error(`Failed to connect to MongoDB (attempt ${retryCount + 1}):`, err.message);
    if (retryCount < 5) {  // Try 5 times before giving up
      console.log('Retrying in 5 seconds...');
      setTimeout(() => connectWithRetry(retryCount + 1), 5000);
    } else {
      console.error('Failed to connect to MongoDB after 5 attempts. Server will continue running, but database operations will fail.');
    }
  }
};

// Initial connection attempt
connectWithRetry();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong! Please try again.' 
  });
});

// Routes with error handling
app.use('/api/birth', (req, res, next) => {
  try {
    birthRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/death', (req, res, next) => {
  try {
    deathRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/marriage', (req, res, next) => {
  try {
    marriageRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('E-COM X Backend is running!');
});

// Error handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});
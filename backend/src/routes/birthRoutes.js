const express = require('express');
const router = express.Router();
const Birth = require('../models/Birth');

// POST - Create new birth registration
router.post('/', async (req, res) => {
  try {
    // Format date properly
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }

    // Create new birth record
    const birth = new Birth(req.body);

    // Validate the document
    const validationError = birth.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors)
        .map(error => error.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessages
      });
    }

    // Save to database
    const savedBirth = await birth.save();
    console.log('New birth record saved:', savedBirth); // Log the saved data
    res.status(201).json({
      success: true,
      message: 'Birth registration successful',
      data: savedBirth
    });
  } catch (error) {
    console.error('Birth registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessages
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A record with this information already exists'
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Error submitting birth registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET - Get all birth registrations
// Get all birth records
router.get('/', async (req, res) => {
  try {
    const births = await Birth.find().sort({ registrationDate: -1 });
    console.log('Total birth records found:', births.length); // Log the count
    res.json({
      success: true,
      count: births.length,
      data: births
    });
  } catch (error) {
    console.error('Error fetching birth records:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching birth records',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

module.exports = router;
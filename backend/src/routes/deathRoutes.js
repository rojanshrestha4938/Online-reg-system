const express = require('express');
const router = express.Router();
const Death = require('../models/Death');

// POST - Create new death registration
router.post('/', async (req, res) => {
  try {
    const death = new Death(req.body);
    const savedDeath = await death.save();
    res.status(201).json({
      success: true,
      message: 'Death registration successful',
      data: savedDeath
    });
  } catch (error) {
    console.error('Death registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error submitting death registration',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// GET - Get all death registrations
router.get('/', async (req, res) => {
  try {
    const deaths = await Death.find();
    res.json(deaths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
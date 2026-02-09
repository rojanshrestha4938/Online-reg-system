const express = require('express');
const router = express.Router();
const Marriage = require('../models/Marriage');

// POST - Create new marriage registration
router.post('/', async (req, res) => {
  try {
    const marriage = new Marriage(req.body);
    const savedMarriage = await marriage.save();
    res.status(201).json({
      success: true,
      message: 'Marriage registration successful',
      data: savedMarriage
    });
  } catch (error) {
    console.error('Marriage registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error submitting marriage registration',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// GET - Get all marriage registrations
router.get('/', async (req, res) => {
  try {
    const marriages = await Marriage.find();
    res.json(marriages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const birthSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: [true, 'Child name is required'],
    trim: true,
    minlength: [2, 'Child name must be at least 2 characters long'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Date of birth cannot be in the future'
    }
  },
  placeOfBirth: {
    type: String,
    required: [true, 'Place of birth is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not a valid gender'
    }
  },
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required'],
    trim: true,
    minlength: [2, 'Father\'s name must be at least 2 characters long']
  },
  motherName: {
    type: String,
    required: [true, 'Mother\'s name is required'],
    trim: true,
    minlength: [2, 'Mother\'s name must be at least 2 characters long']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Birth', birthSchema);
const mongoose = require('mongoose');

const deathSchema = new mongoose.Schema({
  deceasedName: {
    type: String,
    required: true,
  },
  dateOfDeath: {
    type: Date,
    required: true,
  },
  placeOfDeath: {
    type: String,
    required: true,
  },
  causeOfDeath: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    type: String,
    required: true,
  },
  informantName: {
    type: String,
    required: true,
  },
  informantRelation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Death', deathSchema);
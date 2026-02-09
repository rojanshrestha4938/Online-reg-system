const mongoose = require('mongoose');

const marriageSchema = new mongoose.Schema({
  groomName: {
    type: String,
    required: true,
  },
  groomDateOfBirth: {
    type: Date,
    required: true,
  },
  groomAddress: {
    type: String,
    required: true,
  },
  brideName: {
    type: String,
    required: true,
  },
  brideDateOfBirth: {
    type: Date,
    required: true,
  },
  brideAddress: {
    type: String,
    required: true,
  },
  dateOfMarriage: {
    type: Date,
    required: true,
  },
  placeOfMarriage: {
    type: String,
    required: true,
  },
  witnessName1: {
    type: String,
    required: true,
  },
  witnessName2: {
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

module.exports = mongoose.model('Marriage', marriageSchema);
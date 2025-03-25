
// models/Career.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CareerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: [{
    type: String
  }],
  suitableInterests: [{
    type: String
  }],
  suitablePersonalityTraits: [{
    type: String
  }],
  educationRequirements: [{
    type: String
  }],
  workEnvironment: [{
    type: String
  }],
  averageSalary: {
    type: String
  },
  growthProspects: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Career', CareerSchema);
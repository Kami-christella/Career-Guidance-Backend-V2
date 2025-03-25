// models/Assessment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  careerTest: {
    type: Object,
    required: true
  },
  skillsAssessment: {
    type: Object,
    required: true
  },
  personalityAssessment: {
    type: Object,
    required: true
  },
  recommendedCareers: [{
    careerTitle: String,
    matchPercentage: Number,
    description: String,
    skills: [String],
    educationPath: [String],
    averageSalary: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
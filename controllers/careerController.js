
// controllers/careerController.js
const recommendationEngine = require('../utils/careerRecommendationEngine');
const Career = require('../models/Career');
const Assessment = require('../models/Assessment');

exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ title: 1 });
    res.json(careers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    
    if (!career) {
      return res.status(404).json({ msg: 'Career not found' });
    }
    
    res.json(career);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Career not found' });
    }
    
    res.status(500).send('Server error');
  }
};

exports.recommendCareers = async (req, res) => {
  try {
    const { assessmentId } = req.body;
    
    // Get the assessment
    const assessment = await Assessment.findById(assessmentId);
    
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    if (assessment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Get all careers
    const careers = await Career.find();
    
    // Calculate match scores - THIS LINE NEEDS FIXING
    const recommendations = recommendationEngine.calculateCareerMatches(assessment, careers);
    
    // Update assessment with recommendations
    assessment.recommendedCareers = recommendations;
    await assessment.save();
    
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
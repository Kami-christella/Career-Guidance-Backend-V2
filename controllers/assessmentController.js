// controllers/assessmentController.js
const Assessment = require('../models/Assessment');
const User = require('../models/user');

exports.submitAssessment = async (req, res) => {
  try {
    const { careerTest, skillsAssessment, personalityAssessment } = req.body;
    
    // Create new assessment
    const assessment = new Assessment({
      user: req.user.id,
      careerTest,
      skillsAssessment,
      personalityAssessment,
      recommendedCareers: [] // Will be populated by recommendation algorithm
    });

    // Save assessment
    await assessment.save();

    // Update user with assessment reference
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { assessments: assessment._id } },
      { new: true }
    );

    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    // Check if assessment exists
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    // Check if assessment belongs to user
    if (assessment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    res.status(500).send('Server error');
  }
};

exports.getAssessmentByUserId = async (req, res) => {
  try {
    // Find all assessments for the specific user
    const assessments = await Assessment.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    // Check if any assessments exist
    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ msg: 'No assessments found for this user' });
    }
    
    // Extract the last 2 assessments
    const lastTwoAssessments = assessments.slice(0, 2);
    
    // Extract recommended careers from the last 2 assessments
    const lastTwoRecommendedCareers = lastTwoAssessments.flatMap(assessment => 
      assessment.recommendedCareers
    ).slice(0, 2);

    // Return both full assessments and the last 2 recommended careers
    res.json({
      assessments: assessments,
      lastTwoRecommendedCareers: lastTwoRecommendedCareers
    });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invalid user ID' });
    }
    
    res.status(500).send('Server error');
  }
};
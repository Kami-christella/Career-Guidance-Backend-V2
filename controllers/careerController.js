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
    const allCareers = await Career.find();
    console.log("Total Careers in Database:", allCareers.length);
    console.log("Sample Career:", allCareers[0]);
    
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

// Helper function to count recommendations for a specific career title
const countCareerRecommendations = async (careerTitle) => {
  try {
    // Get the career ID by title
    const career = await Career.findOne({ title: careerTitle });
    
    if (!career) {
      return { title: careerTitle, count: 0, error: 'Career not found in database' };
    }
    
    // Find assessments that have this career in recommendations
    // This assumes recommendedCareers contains an array of objects with career references
    const count = await Assessment.countDocuments({
      'recommendedCareers.career': career._id
    });
    
    return { title: careerTitle, count };
  } catch (err) {
    console.error(`Error counting recommendations for ${careerTitle}:`, err.message);
    return { title: careerTitle, count: 0, error: err.message };
  }
};

// Individual count functions for each specific career

exports.countSoftwareDeveloperRecommendations = async (req, res) => {
  try {
    const result = await countCareerRecommendations('Software Developer');
    res.json(result);
  } catch (err) {
    console.error('Error in countSoftwareDeveloperRecommendations:', err.message);
    res.status(500).send('Server error'); 
  }
};

exports.countTeacherRecommendations = async (req, res) => {
  try {
    const result = await countCareerRecommendations('Teacher');
    res.json(result);
  } catch (err) {
    console.error('Error in countTeacherRecommendations:', err.message);
    res.status(500).send('Server error');
  }
};

exports.countDataScientistRecommendations = async (req, res) => {
  try {
    const result = await countCareerRecommendations('Data Scientist');
    res.json(result);
  } catch (err) {
    console.error('Error in countDataScientistRecommendations:', err.message);
    res.status(500).send('Server error');
  }
};

exports.countGraphicDesignerRecommendations = async (req, res) => {
  try {
    const result = await countCareerRecommendations('Graphic Designer');
    res.json(result);
  } catch (err) {
    console.error('Error in countGraphicDesignerRecommendations:', err.message);
    res.status(500).send('Server error');
  }
};

exports.countProjectManagerRecommendations = async (req, res) => {
  try {
    const result = await countCareerRecommendations('Project Manager');
    res.json(result);
  } catch (err) {
    console.error('Error in countProjectManagerRecommendations:', err.message);
    res.status(500).send('Server error');
  }
};

// Function to get all career counts at once
exports.getAllCareerCounts = async (req, res) => {
  try {
    const careers = [
      'Software Developer',
      'Teacher',
      'Data Scientist',
      'Graphic Designer',
      'Project Manager'
    ];
    
    const counts = await Promise.all(
      careers.map(career => countCareerRecommendations(career))
    );
    
    res.json({
      counts,
      total: counts.reduce((sum, item) => sum + item.count, 0)
    });
  } catch (err) {
    console.error('Error getting all career counts:', err.message);
    res.status(500).send('Server error');
  }
};

// Alternative implementation if recommendedCareers contains embedded documents
const countCareerRecommendationsByTitle = async (careerTitle) => {
  try {
    // Find assessments with recommendations that include the career title
    const assessments = await Assessment.find({
      'recommendedCareers.career.title': careerTitle
    });
    
    return { title: careerTitle, count: assessments.length };
  } catch (err) {
    console.error(`Error counting recommendations for ${careerTitle} by title:`, err.message);
    return { title: careerTitle, count: 0, error: err.message };
  }
};




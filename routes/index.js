const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const assessmentController = require('../controllers/assessmentController');
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/auth');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Assessment routes (protected with auth middleware)
router.post('/assessments', authMiddleware, assessmentController.submitAssessment);
router.get('/assessments', authMiddleware, assessmentController.getUserAssessments);
router.get('/assessments/:id', authMiddleware, assessmentController.getAssessmentById);
router.get('/assessments/user/:userId', authMiddleware, assessmentController.getAssessmentByUserId);
// Career routes
router.get('/careers', careerController.getAllCareers);
router.get('/careers/:id', careerController.getCareerById);
router.post('/careers/recommend', authMiddleware, careerController.recommendCareers);

module.exports = router;
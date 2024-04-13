const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticatePatient } = require('../middleware/authMiddleware');

// Routes for patient functionalities
router.post('/daily-info', authenticatePatient, patientController.addDailyInfo);
router.post('/symptoms', authenticatePatient, patientController.submitSymptoms);
router.get('/fitness-games', authenticatePatient, patientController.getFitnessGames);

module.exports = router;

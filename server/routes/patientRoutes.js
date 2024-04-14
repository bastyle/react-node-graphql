// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const patientController = require('../controller/patientController');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Add patient data
router.post('/', patientController.addPatientData);

// Get all patient data
router.get('/', patientController.getAllPatientData);

// Get patient data by ID
router.get('/:id', patientController.getPatientDataById);

// Delete patient data by ID
router.delete('/:id', patientController.deletePatientData);

module.exports = router;

// routes/nurseRoutes.js
const express = require('express');
router = express.Router();
const authMiddleware = require('../middleware/auth');
const nurseController = require('../controller/nurseController');
const roleValidator = require('../middleware/authRoleValidator');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Apply role validation middleware for nurses
router.use(roleValidator('nurse'));

// Add patient health info
router.post('/', nurseController.addPatientHealthInfo);

// Get all patient health information
router.get('/', nurseController.getAllPatientHealthInfo);

// Get patient health information by ID
router.get('/:id', nurseController.getPatientHealthInfoById);

// Delete patient health information by ID
router.delete('/:id', nurseController.deletePatientHealthInfo);

// Get advice for patient
router.post('/advice', nurseController.getAdvice);

module.exports = router;

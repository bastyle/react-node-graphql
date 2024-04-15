const PatientData = require('../models/PatientData');

// Controller for handling patient-related operations
const patientController = {
  // Function to add daily information for a patient
  addDailyInfo: async (req, res) => {
    try {
      const { userId } = req.user; // Assuming user ID is stored in req.user
      const { bodyTemperature, heartRate, bloodPressure, respiratoryRate, symptoms } = req.body;
      
      // Create a new patient data entry
      const patientData = new PatientData({
        user: userId,
        vitalSigns: {
          bodyTemperature,
          heartRate,
          bloodPressure,
          respiratoryRate
        },
        symptoms
      });

      // Save the patient data
      await patientData.save();

      res.status(201).json({ message: 'Daily information added successfully' });
    } catch (error) {
      console.error('Error adding daily information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Function to submit symptom checklist
  submitSymptoms: async (req, res) => {
    try {
      const { userId } = req.user; // Assuming user ID is stored in req.user
      const { symptoms } = req.body;

      // Find patient data by user ID
      const patientData = await PatientData.findOne({ user: userId });

      if (!patientData) {
        return res.status(404).json({ error: 'Patient data not found' });
      }

      // Update symptoms
      patientData.symptoms = symptoms;
      await patientData.save();

      res.json({ message: 'Symptoms submitted successfully' });
    } catch (error) {
      console.error('Error submitting symptoms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = patientController;

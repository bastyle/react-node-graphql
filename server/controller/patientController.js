const PatientData = require('../models/patientDataModel');
const { classifyHealth, provideAdvice } = require('../neuralNetwork/neuralNetworkModal');

// This function is responsible for adding patient health information to the database
// based on the provided request body, which includes health metrics and user ID.
module.exports.addPatientData = async (req, res) => {
    try {
        // Log the start of the process and the request body for debugging purposes
        console.log('Adding patient data...', req.body);
        
        // Extract user ID from the request body
        const userId = req.body.user;

        // Extract patient health information from the request body
        // and remove the 'user' field from the input data
        const { user, ...inputData } = req.body;

        // Use the 'classifyHealth' function to predict the medical condition
        // based on the extracted health metrics
        const predictedCondition = classifyHealth(inputData);

        // Provide advice based on the predicted condition
        provideAdvice(predictedCondition);

        // Store patient health information along with the predicted condition
        const patientData = await PatientData.create({ user: userId, ...inputData, predictedCondition });

        // Respond with the created patient data
        res.status(201).json(patientData);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: 'Failed to add patient data: ' + error });
    }
}

// Get all patient health data
module.exports.getAllPatientData = async (req, res) => {
    try {
        const patientData = await PatientData.find();
        res.json(patientData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient data' });
    }
}

// Get patient health data by ID
module.exports.getPatientDataById = async (req, res) => {
    try {
        const patientData = await PatientData.findById(req.params.id);
        if (patientData) {
            res.json(patientData);
        } else {
            res.status(404).json({ error: 'Patient data not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient data' });
    }
}

// Delete patient health data
module.exports.deletePatientData = async (req, res) => {
    try {
        console.log('Deleting patient data...');
        const patientData = await PatientData.findByIdAndDelete(req.params.id);
        if (patientData) {
            res.json({ message: 'Patient data deleted' });
        } else {
            res.status(404).json({ error: 'Patient data not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete patient data' });
    }
}

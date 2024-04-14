const DailyHealthInfo = require('../models/dailyHealthInfoModel');
const {classifyHealth, provideAdvice} = require('../neuralNetwork/neuralNetWorkModal');


// This function is responsible for adding patient health information to the database
// based on the provided request body, which includes health metrics and user ID.
module.exports.addPatientHealthInfo = async (req, res) => {
    try {
        // Log the start of the process and the request body for debugging purposes
        console.log('Adding patient information...', req.body);
        
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
        const patientInfo = await DailyHealthInfo.create({ user: userId, ...inputData, predictedCondition });

        // Respond with the created patient information
        res.status(201).json(patientInfo);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: 'Failed to add patient information: ' + error });
    }
}


// Get all patient health information
module.exports.getAllPatientHealthInfo = async (req, res) => {
    try {
        const patientInfo = await DailyHealthInfo.find();
        res.json(patientInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient information' });
    }
}

// Get patient health information by ID
module.exports.getPatientHealthInfoById = async (req, res) => {
    try {
        const patientInfo = await DailyHealthInfo.findById(req.params.id);
        if (patientInfo) {
            res.json(patientInfo);
        } else {
            res.status(404).json({ error: 'Patient information not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patient information' });
    }
}

// Delete patient health information
module.exports.deletePatientHealthInfo = async (req, res) => {
    try {
        console.log('Deleting patient information...');
        const patientInfo = await DailyHealthInfo.findByIdAndDelete(req.params.id);
        if (patientInfo) {
            res.json({ message: 'Patient information deleted' });
        } else {
            res.status(404).json({ error: 'Patient information not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete patient information' });
    }
}


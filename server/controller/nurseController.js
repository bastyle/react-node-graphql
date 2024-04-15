const DailyHealthInfo = require('../models/dailyHealthInfoModel');
const PatientData = require('../models/patientDataModel');
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
        const {user, ...inputData} = req.body;

        // Use the 'classifyHealth' function to predict the medical condition
        // based on the extracted health metrics
        const predictedCondition = classifyHealth(inputData);

        // Provide advice based on the predicted condition
        provideAdvice(predictedCondition);

        // Store patient health information along with the predicted condition
        const patientInfo = await DailyHealthInfo.create({user: userId, ...inputData, predictedCondition});

        // Respond with the created patient information
        res.status(201).json(patientInfo);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({error: 'Failed to add patient information: ' + error});
    }
}

/*module.exports.getAdvice = async (req, res) => {
    try {
        console.log('Getting advice for patient...', req.body);
        const {user, ...inputData} = req.body;


        const predictedCondition = classifyHealth(inputData);
        const advice = provideAdvice(predictedCondition);
        res.status(201).json({advice: advice});
    } catch (error) {
        res.status(500).json({error: 'Failed to get advice for patient: ' + error});
    }
}*/

/*module.exports.getAdvice0 = async (req, res) => {
    try {
        const userId = req.body.userId; // Get the userId from the request parameters
        console.log('Getting advice for patient with userId:', userId);
        // Find the last record for the given userId
        const lastRecord = await PatientData.find({ user: userId })
            .sort({ date: -1 })
            .limit(1)
            .select('vitalSigns.pulseRate vitalSigns.bloodPressure vitalSigns.weight vitalSigns.bodyTemperature vitalSigns.respiratoryRate');
        console.log('lastRecord:', lastRecord)
        console.log('lastRecord:', lastRecord[0].vitalSigns)
        if (lastRecord) {
            //res.json(lastRecord);
            const predictedCondition = classifyHealth(lastRecord[0].vitalSigns);
            const advice = provideAdvice(predictedCondition);
            res.status(200).json({advice: advice, lastRecord: lastRecord});
        } else {
            res.status(404).json({ error: 'No records found for this user' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the last record' });
    }
}*/

module.exports.getAdvice = async (req, res) => {
    try {
        const userId = req.body.userId; // Get the userId from the request parameters
        console.log('Getting advice for patient with userId:', userId);
        // Find the last record for the given userId
        const lastRecord = await DailyHealthInfo.find({user: userId})
            .sort({date: -1})
            .limit(1)
            .select('pulseRate bloodPressure weight bodyTemperature respiratoryRate');

        if (lastRecord && lastRecord[0]) {
            const healthData = {
                "pulseRate": lastRecord[0].pulseRate,
                "bloodPressure": lastRecord[0].bloodPressure,
                "weight": lastRecord[0].weight,
                "bodyTemperature": lastRecord[0].bodyTemperature,
                "respiratoryRate": lastRecord[0].respiratoryRate
            };
            console.log(healthData);
            const predictedCondition = classifyHealth(healthData);
            const advice = provideAdvice(predictedCondition);
            res.status(200).json({advice: advice, lastRecord: lastRecord});
        } else {
            res.status(404).json({error: 'No records found for this user'});
        }

    } catch (error) {
        res.status(500).json({error: 'Failed to fetch the last record'});
    }
}


// Get all patient health information
module.exports.getAllPatientHealthInfo = async (req, res) => {
    try {
        const patientInfo = await DailyHealthInfo.find();
        res.json(patientInfo);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch patient information'});
    }
}

// Get patient health information by ID
module.exports.getPatientHealthInfoById = async (req, res) => {
    try {
        const patientInfo = await DailyHealthInfo.findById(req.params.id);
        if (patientInfo) {
            res.json(patientInfo);
        } else {
            res.status(404).json({error: 'Patient information not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch patient information'});
    }
}

// Delete patient health information
module.exports.deletePatientHealthInfo = async (req, res) => {
    try {
        console.log('Deleting patient information...');
        const patientInfo = await DailyHealthInfo.findByIdAndDelete(req.params.id);
        if (patientInfo) {
            res.json({message: 'Patient information deleted'});
        } else {
            res.status(404).json({error: 'Patient information not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete patient information'});
    }
}


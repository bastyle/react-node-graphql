const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    vitalSigns: {
        type: Object,
        required: true,
        properties: {
            bodyTemperature: { type: Number },
            heartRate: { type: Number },
            bloodPressure: { type: String }, // Example: "120/80 mmHg"
            respiratoryRate: { type: Number }
        }
    },
    symptoms: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('PatientData', patientDataSchema);
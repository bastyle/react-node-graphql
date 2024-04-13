const mongoose = require('mongoose');

const dailyHealthInfoSchema = new mongoose.Schema({
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
    pulseRate: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: String, // Example: "120/80 mmHg"
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bodyTemperature: {
        type: Number,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    predictedCondition: {
        type: String
    }
});

module.exports = mongoose.model('DailyHealthInfo', dailyHealthInfoSchema);
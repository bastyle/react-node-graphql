const brain = require('brain.js');


const trainingData = [
    { input: { pulseRate: 120, bloodPressure: 200, weight: 75, bodyTemperature: 37.5, respiratoryRate: 155 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 80, bloodPressure: 120, weight: 70, bodyTemperature: 36.8, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 90, bloodPressure: 140, weight: 85, bodyTemperature: 37.2, respiratoryRate: 22 }, output: { highPulseRate: 0, normal: 0, hypertension: 1, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 70, bloodPressure: 110, weight: 65, bodyTemperature: 37.0, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 100, bloodPressure: 160, weight: 90, bodyTemperature: 38.0, respiratoryRate: 30 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 75, bloodPressure: 115, weight: 60, bodyTemperature: 36.5, respiratoryRate: 16 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 1, tachycardia: 0 } },
    { input: { pulseRate: 130, bloodPressure: 180, weight: 80, bodyTemperature: 37.8, respiratoryRate: 25 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 85, bloodPressure: 125, weight: 70, bodyTemperature: 37.2, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 110, bloodPressure: 150, weight: 70, bodyTemperature: 37.1, respiratoryRate: 24 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 95, bloodPressure: 130, weight: 75, bodyTemperature: 37.3, respiratoryRate: 21 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 80, bloodPressure: 120, weight: 65, bodyTemperature: 36.7, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 115, bloodPressure: 160, weight: 85, bodyTemperature: 37.6, respiratoryRate: 27 }, output: { highPulseRate: 0, normal: 0, hypertension: 1, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 70, bloodPressure: 110, weight: 70, bodyTemperature: 36.9, respiratoryRate: 19 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 1, tachycardia: 0 } },
    { input: { pulseRate: 105, bloodPressure: 145, weight: 80, bodyTemperature: 37.4, respiratoryRate: 23 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 120, bloodPressure: 170, weight: 75, bodyTemperature: 37.9, respiratoryRate: 28 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 110, bloodPressure: 120, weight: 70, bodyTemperature: 36.8, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 105, bloodPressure: 118, weight: 65, bodyTemperature: 37.0, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 115, bloodPressure: 122, weight: 75, bodyTemperature: 37.2, respiratoryRate: 22 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 120, bloodPressure: 125, weight: 80, bodyTemperature: 37.5, respiratoryRate: 24 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 125, bloodPressure: 130, weight: 85, bodyTemperature: 37.7, respiratoryRate: 26 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 130, bloodPressure: 135, weight: 90, bodyTemperature: 38.0, respiratoryRate: 28 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 90, bloodPressure: 125, weight: 60, bodyTemperature: 36.6, respiratoryRate: 17 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 100, bloodPressure: 135, weight: 70, bodyTemperature: 37.0, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 85, bloodPressure: 125, weight: 80, bodyTemperature: 36.8, respiratoryRate: 19 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 110, bloodPressure: 150, weight: 65, bodyTemperature: 37.3, respiratoryRate: 22 }, output: { highPulseRate: 0, normal: 0, hypertension: 1, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 70, bloodPressure: 110, weight: 75, bodyTemperature: 36.5, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 125, bloodPressure: 165, weight: 85, bodyTemperature: 37.7, respiratoryRate: 24 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 95, bloodPressure: 130, weight: 70, bodyTemperature: 36.9, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 130, bloodPressure: 175, weight: 80, bodyTemperature: 37.8, respiratoryRate: 26 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 75, bloodPressure: 120, weight: 65, bodyTemperature: 37.1, respiratoryRate: 17 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 1, tachycardia: 0 } },
    { input: { pulseRate: 105, bloodPressure: 140, weight: 75, bodyTemperature: 37.5, respiratoryRate: 23 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 80, bloodPressure: 125, weight: 70, bodyTemperature: 36.6, respiratoryRate: 21 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 135, bloodPressure: 140, weight: 95, bodyTemperature: 38.2, respiratoryRate: 30 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 140, bloodPressure: 145, weight: 100, bodyTemperature: 38.5, respiratoryRate: 32 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 145, bloodPressure: 150, weight: 105, bodyTemperature: 38.8, respiratoryRate: 34 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 150, bloodPressure: 155, weight: 110, bodyTemperature: 39.0, respiratoryRate: 36 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 110, bloodPressure: 120, weight: 70, bodyTemperature: 36.8, respiratoryRate: 18 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 105, bloodPressure: 118, weight: 65, bodyTemperature: 37.0, respiratoryRate: 20 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 90, bloodPressure: 140, weight: 85, bodyTemperature: 37.2, respiratoryRate: 22 }, output: { highPulseRate: 0, normal: 0, hypertension: 1, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 70, bloodPressure: 110, weight: 75, bodyTemperature: 37.5, respiratoryRate: 25 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 100, bloodPressure: 160, weight: 90, bodyTemperature: 38.0, respiratoryRate: 30 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 85, bloodPressure: 125, weight: 80, bodyTemperature: 36.6, respiratoryRate: 19 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 120, bloodPressure: 170, weight: 75, bodyTemperature: 37.9, respiratoryRate: 28 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 125, bloodPressure: 150, weight: 70, bodyTemperature: 37.3, respiratoryRate: 22 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 100, bloodPressure: 140, weight: 65, bodyTemperature: 37.1, respiratoryRate: 21 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 1, tachycardia: 0 } },
    { input: { pulseRate: 115, bloodPressure: 145, weight: 80, bodyTemperature: 37.7, respiratoryRate: 26 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 130, bloodPressure: 180, weight: 90, bodyTemperature: 37.5, respiratoryRate: 24 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 90, bloodPressure: 135, weight: 75, bodyTemperature: 36.9, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 120, bloodPressure: 160, weight: 85, bodyTemperature: 37.4, respiratoryRate: 23 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 75, bloodPressure: 115, weight: 70, bodyTemperature: 36.5, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 110, bloodPressure: 155, weight: 80, bodyTemperature: 37.2, respiratoryRate: 22 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 80, bloodPressure: 130, weight: 75, bodyTemperature: 36.8, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 115, bloodPressure: 170, weight: 90, bodyTemperature: 37.8, respiratoryRate: 25 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 95, bloodPressure: 140, weight: 70, bodyTemperature: 37.0, respiratoryRate: 19 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 105, bloodPressure: 125, weight: 65, bodyTemperature: 36.7, respiratoryRate: 17 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 95, bloodPressure: 150, weight: 80, bodyTemperature: 37.3, respiratoryRate: 24 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 90, bloodPressure: 120, weight: 70, bodyTemperature: 36.8, respiratoryRate: 18 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 130, bloodPressure: 140, weight: 80, bodyTemperature: 37.2, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 0, hypertension: 1, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 100, bloodPressure: 110, weight: 75, bodyTemperature: 37.0, respiratoryRate: 22 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 75, bloodPressure: 130, weight: 65, bodyTemperature: 36.5, respiratoryRate: 16 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 1, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 110, bloodPressure: 160, weight: 90, bodyTemperature: 38.0, respiratoryRate: 30 }, output: { highPulseRate: 1, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 85, bloodPressure: 125, weight: 70, bodyTemperature: 37.5, respiratoryRate: 25 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 1, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 120, bloodPressure: 170, weight: 80, bodyTemperature: 37.8, respiratoryRate: 28 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 1, tachycardia: 0 } },
    { input: { pulseRate: 95, bloodPressure: 135, weight: 75, bodyTemperature: 36.9, respiratoryRate: 20 }, output: { highPulseRate: 0, normal: 1, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 0 } },
    { input: { pulseRate: 130, bloodPressure: 150, weight: 85, bodyTemperature: 37.4, respiratoryRate: 23 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } },
    { input: { pulseRate: 105, bloodPressure: 145, weight: 70, bodyTemperature: 37.1, respiratoryRate: 21 }, output: { highPulseRate: 0, normal: 0, hypertension: 0, hypotension: 0, fever: 0, bradycardia: 0, tachycardia: 1 } }

    
];

// Create a neural network
const net = new brain.NeuralNetwork();
// Function to classify health condition based on input data
function classifyHealth(input) {
    const output = net.run(input);
    const condition = Object.keys(output).find(key => output[key] === Math.max(...Object.values(output)));
    return condition;
}

// Function to provide advice based on the predicted condition
function provideAdvice(predictedCondition) {
    if (predictedCondition !== 'normal') {
        console.log(`Based on the provided health metrics, you may have ${predictedCondition}. It's advisable to consult a doctor.`);
    } else {
        console.log(`Based on the provided health metrics, you appear to be in a normal condition. However, if you have any concerns, consulting a doctor is always a good idea.`);
    }
}

// Train the neural network with the training data
net.train(trainingData);

// export default classifyHealth();
module.exports = {classifyHealth, provideAdvice};
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
    // Add more training data as needed
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
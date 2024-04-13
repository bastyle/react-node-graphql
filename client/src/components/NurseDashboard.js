import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const NurseDashboard = () => {
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [weight, setWeight] = useState('');
  const [predictedCondition] = useState('');
  const [previousVisits, setPreviousVisits] = useState([]);

  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    const fetchPreviousVisits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3300/api/nurse/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPreviousVisits(response.data);
      } catch (error) {
        console.error('Error fetching previous visit records:', error);
      }
    };
  
    fetchPreviousVisits();
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the backend
    const data = {
      bodyTemperature,
      pulseRate,
      bloodPressure,
      respiratoryRate,
      weight
    };
     // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('token');
  
  // Send a POST request to add the patient's vitals with Authorization header
  axios.post('http://localhost:3300/api/nurse/', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Patient vitals added successfully:', response.data);
    // Update the state with the newly added visit
    setPreviousVisits([...previousVisits, response.data]);
    // Clear the form fields
    setBodyTemperature('');
    setPulseRate('');
    setBloodPressure('');
    setRespiratoryRate('');
    setWeight('');
  })
  .catch(error => {
    console.error('Error adding patient vitals:', error);
  });
  };

  return (
    <div>
      <Dashboard />
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bodyTemperature">Body Temperature:</label>
          <input
            type="text"
            id="bodyTemperature"
            value={bodyTemperature}
            onChange={(e) => setBodyTemperature(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pulseRate">Heart Rate:</label>
          <input
            type="text"
            id="pulseRate"
            value={pulseRate}
            onChange={(e) => setPulseRate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bloodPressure">Blood Pressure:</label>
          <input
            type="text"
            id="bloodPressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input
            type="text"
            id="respiratoryRate"
            value={respiratoryRate}
            onChange={(e) => setRespiratoryRate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Previous Clinical Visits</h3>
        {/* Display previous visit information here */}
        <ul>
          {previousVisits.map(visit => (
            <li key={visit._id}>{visit.date}: Temperature - {visit.bodyTemperature}, Heart Rate - {visit.pulseRate}, Blood Pressure - {visit.bloodPressure}, Respiratory Rate - {visit.respiratoryRate},Weight - {visit.weight}, Predicted Contition - {visit.predictedCondition}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default NurseDashboard;

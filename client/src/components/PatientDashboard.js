import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DAILY_INFO_MUTATION, SUBMIT_SYMPTOMS_MUTATION } from '../mutations';

const PatientDashboard = () => {
  const [dailyInfo, setDailyInfo] = useState({
    pulseRate: '',
    bloodPressure: '',
    weight: '',
    temperature: '',
    respiratoryRate: ''
  });

  const [checklist, setChecklist] = useState({
    cough: false,
    fever: false,
    fatigue: false,
    shortnessOfBreath: false
  });

  const [addDailyInfoMutation] = useMutation(ADD_DAILY_INFO_MUTATION);
  const [submitSymptomsMutation] = useMutation(SUBMIT_SYMPTOMS_MUTATION);

  const handleDailyInfoChange = (e) => {
    const { name, value } = e.target;
    setDailyInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setChecklist(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmitDailyInfo = async (e) => {
    e.preventDefault();
    try {
      await addDailyInfoMutation({
        variables: { input: { ...dailyInfo } }
      });
      setDailyInfo({
        pulseRate: '',
        bloodPressure: '',
        weight: '',
        temperature: '',
        respiratoryRate: ''
      });
    } catch (error) {
      console.error('Error submitting daily information:', error);
    }
  };

  const handleSubmitChecklist = async (e) => {
    e.preventDefault();
    try {
      await submitSymptomsMutation({
        variables: { input: Object.keys(checklist).filter(symptom => checklist[symptom]) }
      });
      setChecklist({
        cough: false,
        fever: false,
        fatigue: false,
        shortnessOfBreath: false
      });
    } catch (error) {
      console.error('Error submitting checklist:', error);
    }
  };

  return (
    <div>
      <div>
        <h3>Enter Daily Information</h3>
        <form onSubmit={handleSubmitDailyInfo}>
          <div>
            <label htmlFor="pulseRate">Pulse Rate:</label>
            <input
              type="text"
              id="pulseRate"
              name="pulseRate"
              value={dailyInfo.pulseRate}
              onChange={handleDailyInfoChange}
            />
          </div>
          {/* Add more input fields for other daily information */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h3>Checklist of Symptoms</h3>
        <form onSubmit={handleSubmitChecklist}>
          <div>
            <label>
              <input
                type="checkbox"
                name="cough"
                checked={checklist.cough}
                onChange={handleChecklistChange}
              />
              Cough
            </label>
          </div>
          {/* Add more checkboxes for other symptoms */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h3>Fitness Games</h3>
        <p>Placeholder for fitness games</p>
      </div>
    </div>
  );
};

export default PatientDashboard;

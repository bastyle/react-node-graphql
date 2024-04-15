import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "../styles/NurseDashboard.css";

const NurseDashboard = () => {
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [weight, setWeight] = useState("");
  const [predictedCondition] = useState("");
  const [previousVisits, setPreviousVisits] = useState([]);

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const fetchPreviousVisits = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3300/api/nurse/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPreviousVisits(response.data);
      } catch (error) {
        console.error("Error fetching previous visit records:", error);
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
      weight,
    };
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");

    // Send a POST request to add the patient's vitals with Authorization header
    axios
      .post("http://localhost:3300/api/nurse/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Patient vitals added successfully:", response.data);
        // Update the state with the newly added visit
        setPreviousVisits([...previousVisits, response.data]);
        // Clear the form fields
        setBodyTemperature("");
        setPulseRate("");
        setBloodPressure("");
        setRespiratoryRate("");
        setWeight("");
      })
      .catch((error) => {
        console.error("Error adding patient vitals:", error);
      });
  };

  const handleDelete = (visitId) => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");

    // Send a DELETE request to delete the visit record with Authorization header
    axios
      .delete(`http://localhost:3300/api/nurse/${visitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Visit record deleted successfully:", response.data);
        // Filter out the deleted visit record from the previousVisits state
        setPreviousVisits(
          previousVisits.filter((visit) => visit._id !== visitId)
        );
      })
      .catch((error) => {
        console.error("Error deleting visit record:", error);
      });
  };

  return (
    <div className="container">
      <Dashboard />
      <form onSubmit={handleSubmit} className="form-container">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="bodyTemperature">Body Temperature</label>
                <input
                  type="text"
                  id="bodyTemperature"
                  value={bodyTemperature}
                  onChange={(e) => setBodyTemperature(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="pulseRate">Heart Rate</label>
                <input
                  type="text"
                  id="pulseRate"
                  value={pulseRate}
                  onChange={(e) => setPulseRate(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="bloodPressure">Blood Pressure</label>
                <input
                  type="text"
                  id="bloodPressure"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="respiratoryRate">Respiratory Rate</label>
                <input
                  type="text"
                  id="respiratoryRate"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </td>

              <td>
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="visits-container">
        <h3>Previous Clinical Visits</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Body Temperature</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>Respiratory Rate</th>
              <th>Weight</th>
              <th>Predicted Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {previousVisits.map((visit) => (
              <tr key={visit._id}>
                <td>{visit.date}</td>
                <td>{visit.bodyTemperature}</td>
                <td>{visit.pulseRate}</td>
                <td>{visit.bloodPressure}</td>
                <td>{visit.respiratoryRate}</td>
                <td>{visit.weight}</td>
                <td>{visit.predictedCondition}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(visit._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseDashboard;

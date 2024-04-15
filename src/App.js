import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NurseDashboard from './components/NurseDashboard';
import PatientDashboard from './components/PatientDashboard';
import Register from './components/Register'; 

function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/nurseDashboard" element={<NurseDashboard />} />
    <Route path="/patientDashboard" element={<PatientDashboard />} />
    <Route path="/register" element={<Register />} />
    {/* Add more routes for other components */}
  </Routes>
  );
}

export default App;

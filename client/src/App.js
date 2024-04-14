import './App.css';
import Login from './components/Login';
import {Route, Routes} from 'react-router-dom';
import NurseDashboard from './components/NurseDashboard';
import PatientDashboard from './components/PatientDashboard';
import Register from './components/Register';
import NurseDash from "./components/nurse/NurseDash";
import PatientComponent from "./components/nurse/PatientData";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/nurseDashboard" element={<NurseDashboard/>}/>
            <Route path="/patientDashboard" element={<PatientDashboard/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/nurse" element={<NurseDash/>}/>
            <Route path="/patient/:id" element={<PatientComponent />} />
            {/* Add more routes for other components */}
        </Routes>
    );
}

export default App;

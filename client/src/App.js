import './App.css';
import Login from './components/Login';
import {Route, Routes} from 'react-router-dom';

import PatientDashboard from './components/PatientDashboard';
import Register from './components/Register';
import NurseDash from "./components/nurse/NurseDash";
import PatientComponent from "./components/nurse/PatientData";
import NurseDashboard from "./components/nurse/NurseDash";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/patientDashboard" element={<PatientDashboard/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/nurse" element={<NurseDashboard/>}/>
            <Route path="/patient/:id/:name" element={<PatientComponent />} />
            {/* Add more routes for other components */}
        </Routes>
    );
}

export default App;

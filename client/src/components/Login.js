import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // Import bcrypt library for password hashing
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import NurseDashboard from './NurseDashboard'; // Import NurseDashboard component
import PatientDashboard from './PatientDashboard'; // Import PatientDashboard component

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userExists, setUserExists] = useState(null); // State to track if user exists in the database
  const [users, setUsers] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3300/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check if the user exists in the database
    const user = users.find(user => user.username === username);
    if (user) {
      setUserExists(true); // Set user exists state to true
      // Hash the entered password using bcrypt before comparison
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        setSuccess(true);
        setUserRole(user.role); // Set user role
        setError(''); // Clear any previous error messages

        // Redirect based on user role
        if (user.role === 'nurse') {
          navigate('/nurseDashboard');
        } else if (user.role === 'patient') {
          navigate('/patientDashboard');
        }
      } else {
        setError('Invalid password');
      }
    } else {
      setUserExists(false); // Set user exists state to false
      setError('User does not exist');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

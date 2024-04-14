import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3300/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        
        // Save the token in local storage
        localStorage.setItem('token', token);

        // Decode the JWT token to extract the user's role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.profile;
  
        // Just for testing
        console.log('User role:', userRole);
        // Log the token to the console
        console.log('Token:', token);
  
        // Re-direct based on the user's role
        if (userRole === 'nurse') {
          navigate('/nurseDashboard');
        } else if (userRole === 'patient') {
          navigate('/patientDashboard');
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
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
       {/* Link to registration page */}
       <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
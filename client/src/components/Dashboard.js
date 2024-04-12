import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // Decode the token
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      // Extract the user's role from the decoded token
      const role = decodedToken.profile;

      // Set the user role state
      setUserRole(role);
      console.log(role);
      console.log(token);
    } else {
      console.error('Token not found');
    }
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <header>
        <h1>{capitalizeFirstLetter(userRole)} Dashboard</h1>
      </header>
      <main>
        {/* Place your dashboard content here */}
        <p>Welcome to the {capitalizeFirstLetter(userRole)} dashboard!</p>
      </main>
    </div>
  );
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Dashboard;

// HomePage.js - Landing page component
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';

const HomePage = () => {
  return (
    <div className="homepage container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Online Examination System</h1>
      <p className="text-lg mb-6">Login or Register to begin your exam journey.</p>
      <div className="flex justify-center gap-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

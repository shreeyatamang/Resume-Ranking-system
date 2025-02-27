import React, { useState } from 'react';
import { registerUser, loginUser } from './api'; // Ensure you have the correct import path
import { rankResumesFrontend } from '../utils/rankingAlgorithm'; // Import the ranking algorithm

const MyComponent = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState([]);
  const [rankedResumes, setRankedResumes] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser(userData);
      setMessage('User registered successfully');
      console.log('User registered:', response);
    } catch (error) {
      setError('Error registering user');
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(userData);
      setMessage('User logged in successfully');
      console.log('User logged in:', response);
    } catch (error) {
      setError('Error logging in');
      console.error('Error logging in:', error);
    }
  };

  const handleRankResumes = () => {
    try {
      const ranked = rankResumesFrontend(jobDescription, resumes);
      setRankedResumes(ranked);
      setMessage('Resumes ranked successfully');
      console.log('Ranked resumes:', ranked);
    } catch (error) {
      setError('Error ranking resumes');
      console.error('Error ranking resumes:', error);
    }
  };

  return (
    <div>
      {/* Registration Form */}
      <input
        type="text"
        placeholder="Username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>

      {/* Rank Resumes */}
      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <textarea
        placeholder="Resumes"
        value={resumes.join('\n')}
        onChange={(e) => setResumes(e.target.value.split('\n'))}
      />
      <button onClick={handleRankResumes}>Rank Resumes</button>

      {/* Display Messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Display Ranked Resumes */}
      <ul>
        {rankedResumes.map((resume, index) => (
          <li key={index}>Rank {index + 1}: {resume}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
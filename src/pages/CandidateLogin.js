// src/pages/CandidateLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting after login
import './LoginForm.css';

function CandidateLogin({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize the useNavigate hook

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can add your logic to validate the email and password with the backend API.
    // For now, we'll assume the login is successful.

    // Redirect to candidate dashboard after login
    navigate('/candidate-dashboard');
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login as Candidate</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}

export default CandidateLogin;

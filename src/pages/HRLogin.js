// src/pages/HRLogin.js
import React from 'react';
import './LoginForm.css';

function HRLogin({ onClose }) {
  return (
    <div className="login-form-container">
      <h2 className="login-title">Login as HR</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}

export default HRLogin;

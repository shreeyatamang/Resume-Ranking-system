// src/pages/Register.js
import React, { useState } from 'react';
import './LoginForm.css';

function Register({ onClose }) {
  const [formType, setFormType] = useState('');

  const handleFormSelection = (type) => {
    setFormType(type);
  };

  return (
    <div className="register-container">
      {!formType ? (
        <>
          <h2 className="register-title">Register</h2>
          <div className="register-options">
            <button className="register-btn" onClick={() => handleFormSelection('candidate')}>
              Register as Candidate
            </button>
            <button className="register-btn" onClick={() => handleFormSelection('hr')}>
              Register as HR
            </button>
          </div>
        </>
      ) : (
        <div className="form-container">
          <h2 className="register-title">
            {formType === 'candidate' ? 'Candidate Registration' : 'HR Registration'}
          </h2>
          <form className="register-form">
            {formType === 'candidate' ? (
              <>
                <div className="form-group">
                  <label>First Name:</label>
                  <input type="text" placeholder="Enter your first name" required />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input type="text" placeholder="Enter your last name" required />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Organization Name:</label>
                  <input type="text" placeholder="Enter your organization's name" required />
                </div>
                <div className="form-group">
                  <label>Organization Email:</label>
                  <input type="email" placeholder="Enter your organization's email" required />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input type="password" placeholder="Confirm your password" required />
            </div>
            <button type="submit" className="submit-btn">Register</button>
          </form>
          <button className="close-btn" onClick={onClose}>Back</button>
        </div>
      )}
    </div>
  );
}

export default Register;

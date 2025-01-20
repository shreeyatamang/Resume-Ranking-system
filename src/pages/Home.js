import React, { useState } from 'react';
import './Home.css';
import HRLogin from './HRLogin'; // Import HRLogin component
import CandidateLogin from './CandidateLogin'; // Import CandidateLogin component
import Register from './Register'; // Import Register component

function Home() {
  const [showForm, setShowForm] = useState('');

  const handleFormOpen = (formType) => {
    setShowForm(formType);
  };

  const handleClose = () => {
    setShowForm('');
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="logo-container">
          <img src="/images/logo.png" alt="ResumeX Logo" className="logo" /> {/* Add your logo here */}
        </div>
        <div className="hero-content">
          <h1 className="app-title">Welcome to ResumeX</h1>
          <p className="hero-subtitle">
            Your AI-powered solution for crafting professional resumes effortlessly.
          </p>

          <div className="cta-section">
            <button onClick={() => handleFormOpen('hr')} className="login-btn">
              Login as HR
            </button>
            <button onClick={() => handleFormOpen('candidate')} className="login-btn">
              Login as Candidate
            </button>
            <p className="register-link">
              Not registered yet?{' '}
              <span onClick={() => handleFormOpen('register')} className="register-btn">
                Register Now
              </span>
            </p>
          </div>
        </div>

        {/* Right side image */}
        <div className="hero-image-container">
          <div className="live-scan">
            <img
              src="/images/my-profile-image.jpg" // Replace with your image path
              alt="Live Scan Illustration"
              className="circle-image"
            />
          </div>
          <p className="scan-text">AI scanning in progress...</p>
        </div>
      </header>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            {showForm === 'hr' && <HRLogin onClose={handleClose} />}
            {showForm === 'candidate' && <CandidateLogin onClose={handleClose} />}
            {showForm === 'register' && <Register onClose={handleClose} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

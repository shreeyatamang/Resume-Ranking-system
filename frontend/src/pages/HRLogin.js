import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginForm.css'; // Assuming the CSS file is in the same directory

const HRLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the username contains '@' (for email validation)
    if (username.includes('@') && password) {
      // After successful login, redirect to the HR Dashboard
      navigate('/hr-dashboard');
    } else {
      // Handle failed login (e.g., show error message)
      alert('Invalid username or password');
    }
    
    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
    // Handle close (e.g., redirect to home page)
    navigate('/');
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">HR Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <button type="button" className="close-btn" onClick={handleClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default HRLogin;
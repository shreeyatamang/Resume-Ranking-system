import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api'; // Import the loginUser function
import './LoginForm.css';

const HRLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser({ username, password });
      if (response.success) {
        navigate('/hr-dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error logging in. Please try again.');
    }
    
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
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
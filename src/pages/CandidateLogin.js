import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const CandidateLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username.includes('@') && password) {
      navigate('/candidate-dashboard');
    } else {
      alert('Invalid username or password');
    }
    
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Candidate Login</h2>
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

export default CandidateLogin;
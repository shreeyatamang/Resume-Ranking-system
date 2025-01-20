// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer"; // Import Footer component
import "./App.css"; // Import your CSS file

// Import pages/components
import CandidateDashboard from './pages/CandidateDashboard';  // Candidate dashboard
import CandidateLogin from './pages/CandidateLogin';  // Candidate login page
import HRLogin from './pages/HRLogin'; // HR login page
import HRDashboard from './pages/HRDashboard';     //HR dashboard page
import Home from "./pages/Home";  // Home page
import About from "./pages/About";  // About page
import Contact from "./pages/Contact";  // Contact page

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <header className="App-header">
          <div className="navbar">
            <div className="brand">
              <Link to="/" className="brand-name">Resumex</Link>
            </div>
            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              
            </nav>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="main-content">
          <Routes>
            {/* Define routes for pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/candidate-login" element={<CandidateLogin />} /> {/* Candidate login */}
            <Route path="/candidate-dashboard" element={<CandidateDashboard />} /> {/* Candidate dashboard */}
            <Route path="/Hr-login" element={<HRLogin />} /> {/* Hr login */}
            <Route path="/hr-dashboard" element={<HRDashboard />} /> {/* HR dashboard */}
          </Routes>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

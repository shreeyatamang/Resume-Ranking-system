import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer"; // Import Footer component
import "./App.css"; // Import your CSS file

// Import pages/components
import CandidateDashboard from './pages/CandidateDashboard';  // Candidate dashboard
import CandidateLogin from './pages/CandidateLogin';  // Candidate login page
import HRLogin from './pages/HRLogin'; // HR login page
import HRDashboard from './pages/HRDashboard';//HR dashboard page
import Home from "./pages/Home";  // Home page
import About from "./pages/About";  // About page
import Contact from "./pages/Contact";  // Contact page
import DataDisplay from "./components/DataDisplay"; // Import DataDisplay component
import ViewResults from "./components/ViewResults"; // Import ViewResults component
import RankResumes from "./components/RankResumes"; // Import RankResumes component

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
              <Link to="/data-display" className="nav-link">Data Display</Link>
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
            <Route path="/hr-login" element={<HRLogin />} /> {/* HR login */}
            <Route path="/hr-dashboard" element={<HRDashboard />} /> {/* HR dashboard */}
            <Route path="/data-display" element={<DataDisplay />} /> {/* Data display */}
            <Route path="/view-results/:jobId" element={<ViewResults />} /> {/* View results */}
            <Route path="/rank_resumes" element={<RankResumes />} /> {/* Rank resumes */}
          </Routes>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS for the footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>ResumeX</h2>
          <p>One-stop solution for job seekers and recruiters.</p>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li>
              <Link to="/about" className="footer-link">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">Contact</Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </li>
          </ul>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ResumeX. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

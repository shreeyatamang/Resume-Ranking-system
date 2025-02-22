import React from 'react';
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <header>
      <a href="/" className="brand-name">ResumeX</a>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="box-title">ResumeX</h1>
      </div>
      <section className="about-content">
        <p>
          ResumeX is a platform designed to revolutionize the hiring process for both job seekers and recruiters.
          With our AI-powered resume ranking system, finding the perfect opportunity or candidate has never been easier.
        </p>
        <p>
          Our advanced algorithms analyze resumes based on skills, qualifications, and experience to ensure seamless matching
          between candidates and recruiters. Say goodbye to tedious searches and hello to smarter hiring!
        </p>
      </section>
      <div className="mission-box">
        <h2 className="box-title">Our Mission</h2>
      </div>
      <section className="mission-content">
        <p>
          To bridge the gap between job seekers and recruiters by providing a fast, efficient, and transparent platform that
          highlights the best opportunities and talent. At ResumeX, we believe in making dreams a reality, one match at a time.
        </p>
      </section>
    </div>
  );
}

export default About;
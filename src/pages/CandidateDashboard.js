// src/pages/CandidateDashboard.js
import React, { useState } from 'react';
import './CandidateDashboard.css';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    description: 'Develop and maintain user-facing features for web applications.',
    // image: '/images/frontend-job.jpg',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Innovatech',
    description: 'Build and optimize server-side applications and APIs.',
    // image: '/images/backend-job.jpg',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'DataWiz',
    description: 'Analyze and interpret complex data to solve business challenges.',
    image: '/images/data-job.jpg',
  },
];

function CandidateDashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [file, setFile] = useState(null);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    if (file) {
      alert(`You have successfully applied for ${selectedJob.title} at ${selectedJob.company}!`);
      setFile(null);
      setSelectedJob(null);
    } else {
      alert('Please upload a PDF file before submitting.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>cd
      {!selectedJob ? (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              {/* <img src={job.image} alt={job.title} className="job-image" /> */}
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>{job.description}</p>
              <button className="apply-btn" onClick={() => handleApply(job)}>
                Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="apply-form">
          <h2>Apply for {selectedJob.title}</h2>
          <form onSubmit={handleFileSubmit}>
            <label>Upload Resume (PDF only):</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={() => setSelectedJob(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;

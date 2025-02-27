import React, { useState, useEffect } from 'react';
import './HRDashboard.css';
import { rankResumes } from '../utils/utils'; // Import the rankResumes function

const HRDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [rankedResumes, setRankedResumes] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(savedJobs);
  }, []);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    const fetchedResumes = [
      'Resume content 1',
      'Resume content 2',
      'Resume content 3',
    ];
    setResumes(fetchedResumes);
  };

  const handleRankResumes = () => {
    if (selectedJob && resumes.length > 0) {
      const ranked = rankResumes(selectedJob.description, resumes);
      setRankedResumes(ranked);
    } else {
      alert('Please select a job and ensure there are resumes to rank.');
    }
  };

  return (
    <div className="hr-dashboard-container">
      <h1>HR Dashboard</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card" onClick={() => handleSelectJob(job)}>
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
      {selectedJob && (
        <div>
          <h2>Selected Job: {selectedJob.title}</h2>
          <button onClick={handleRankResumes}>Rank Resumes</button>
          {rankedResumes.length > 0 && (
            <div>
              <h3>Ranked Resumes:</h3>
              <ul>
                {rankedResumes.map((resume, index) => (
                  <li key={index}>
                    Rank {index + 1}: {resume.resume} (Score: {resume.score})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
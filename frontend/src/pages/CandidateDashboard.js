import React, { useState, useEffect } from "react";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmitApplication = () => {
    if (pdfFile && userName) {
      // Save the resume to localStorage
      const savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
      const newResume = {
        user_name: userName,
        resume_content: pdfFile.name, // Assuming the file name as resume content for simplicity
        job_id: selectedJob.id,
      };
      savedResumes.push(newResume);
      localStorage.setItem("resumes", JSON.stringify(savedResumes));

      // Close modal after submission
      setShowModal(false);
      setPdfFile(null); // Reset file input
      setUserName(''); // Reset user name input
    } else {
      alert("Please enter your name and select a PDF file.");
    }
  };

  return (
    <div className="candidate-dashboard-container">
      <h1>Your Dream Job, Just a Click Away!</h1>
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <img src={job.image} alt={job.title} className="job-image" />
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p className="job-description">{job.description}</p>
              <button className="apply-btn" onClick={() => handleApplyClick(job)}>
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Apply for {selectedJob.title}</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
            <button onClick={handleSubmitApplication} className="submit-btn">
              Submit Application
            </button>
            <button onClick={() => setShowModal(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;
import React, { useState, useEffect } from "react";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

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
    if (pdfFile) {
      // You can handle file upload logic here (e.g., send to a server)
      console.log(`Applying for ${selectedJob.title} with file:`, pdfFile);

      // Close modal after submission
      setShowModal(false);
      setPdfFile(null); // Reset file input
    } else {
      alert("Please select a PDF file.");
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

import React, { useState } from 'react';

const CandidateDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const jobs = [
    { id: '1740269933066', title: 'Software Engineer' },
    { id: '1740231258707', title: 'Data Scientist' },
  ];

  const handleSubmitApplication = () => {
    if (pdfFile && userName) {
      // Store resume information in localStorage
      const savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
      const newResume = { user_name: userName, job_id: selectedJob.id };
      savedResumes.push(newResume);
      localStorage.setItem("resumes", JSON.stringify(savedResumes));

      // Store only names separately
      const candidateNames = JSON.parse(localStorage.getItem("candidate_names")) || {};
      if (!candidateNames[selectedJob.id]) {
        candidateNames[selectedJob.id] = [];
      }
      candidateNames[selectedJob.id].push(userName);
      localStorage.setItem("candidate_names", JSON.stringify(candidateNames));

      setShowModal(false);
      setPdfFile(null);
      setUserName('');
      alert("Application submitted successfully!");
    } else {
      alert("Please enter your name and select a PDF file.");
    }
  };

  return (
    <div>
      <h1>Candidate Dashboard</h1>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong> 
            <button onClick={() => { setSelectedJob(job); setShowModal(true); }}>
              Apply
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <h2>Apply for {selectedJob?.title}</h2>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
          <input 
            type="file" 
            accept=".pdf" 
            onChange={(e) => setPdfFile(e.target.files[0])} 
          />
          <button onClick={handleSubmitApplication}>Submit</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;

import React, { useState, useEffect } from "react";
import "./HRDashboard.css";


function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewJob({ ...newJob, image: e.target.files[0] });
  };

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.description || !newJob.image) {
      alert("Please fill in all fields and upload an image!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const updatedJobs = [
        ...jobs,
        { ...newJob, id: Date.now(), image: reader.result }, // Convert image to Base64
      ];
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setNewJob({ title: "", company: "", description: "", image: null });
    };
    reader.readAsDataURL(newJob.image); // Read image as Base64
  };

  const handleRemoveJob = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="hr-dashboard-container">
      <h1>HR Dashboard</h1>
      <div className="add-job-form">
        <h2>Add New Job</h2>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleInputChange}
          className="small-input"
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={newJob.company}
          onChange={handleInputChange}
          className="small-input"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={newJob.description}
          onChange={handleInputChange}
          className="large-input"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleAddJob}>Add Job</button>
      </div>
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <img src={job.image} alt={job.title} className="job-image" />
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p className="job-description">{job.description}</p>
              <button
                className="apply-btn"
                onClick={() => handleRemoveJob(job.id)}
              >
                Remove Job
              </button>
            </div>
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default HRDashboard;

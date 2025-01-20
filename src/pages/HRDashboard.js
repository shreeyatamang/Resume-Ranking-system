// HRDashboard.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HRDashboard.css';  // Import the custom CSS file

function HRDashboard() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobFile, setJobFile] = useState(null);
  const [resumes, setResumes] = useState([
    { id: 1, jobTitle: 'Software Engineer', applicantName: 'John Doe', resumeLink: '#1' },
    { id: 2, jobTitle: 'Data Scientist', applicantName: 'Jane Smith', resumeLink: '#2' },
  ]);

  const handleJobTitleChange = (e) => setJobTitle(e.target.value);
  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value);
  const handleJobFileChange = (e) => setJobFile(e.target.files[0]);

  const handleJobSubmit = (e) => {
    e.preventDefault();
    // Handle job submission (e.g., save job vacancy to the backend)
    console.log('Job Vacancy Uploaded:', { jobTitle, jobDescription, jobFile });
    alert('Job vacancy uploaded!');
  };

  const handleResumeDelete = (id) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1>HR Dashboard</h1>

      {/* Job Vacancy Upload Form */}
      <div className="card mt-4">
        <div className="card-header">Upload Job Vacancy</div>
        <div className="card-body">
          <form onSubmit={handleJobSubmit}>
            <div className="mb-3">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                value={jobTitle}
                onChange={handleJobTitleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobDescription" className="form-label">Job Description</label>
              <textarea
                className="form-control"
                id="jobDescription"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobFile" className="form-label">Job Posting File (Optional)</label>
              <input
                type="file"
                className="form-control"
                id="jobFile"
                onChange={handleJobFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload Job Vacancy
            </button>
          </form>
        </div>
      </div>

      {/* Resumes Table */}
      <div className="card mt-5">
        <div className="card-header">Uploaded Resumes</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Job Title</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Resume</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id}>
                  <th scope="row">{resume.id}</th>
                  <td>{resume.jobTitle}</td>
                  <td>{resume.applicantName}</td>
                  <td>
                    <a href={resume.resumeLink} className="btn btn-info btn-sm" target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleResumeDelete(resume.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;

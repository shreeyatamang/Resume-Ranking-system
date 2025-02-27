import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewResults = () => {
  const { jobId } = useParams();
  const [rankedResumes, setRankedResumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`/api/get_resumes_for_job/${jobId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch resumes');
        }
        const data = await response.json();
        const sortedResumes = data.map((application, index) => ({
          ...application,
          rank: index + 1,
        }));
        setRankedResumes(sortedResumes);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResumes();
  }, [jobId]);

  return (
    <div>
      <h1>Ranked Resumes for Job {jobId}</h1>
      {error && <p>Error: {error}</p>}
      {rankedResumes.length > 0 ? (
        <ul>
          {rankedResumes.map((application) => (
            <li key={application.rank}>
              <h2>Rank: {application.rank}</h2>
              <p>User: {application.user_name}</p>
              <p>{application.resume_content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resumes found for this job.</p>
      )}
    </div>
  );
};

export default ViewResults;
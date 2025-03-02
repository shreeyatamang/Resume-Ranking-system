

import React, { useState } from 'react';
import { rankResumes } from '../apiService';

const RankResumes = () => {
  const [jobDesc, setJobDesc] = useState('');
  const [resumes, setResumes] = useState([]);
  const [rankedResumes, setRankedResumes] = useState([]);

  const handleRankResumes = async () => {
    try {
      const response = await rankResumes(jobDesc, resumes);
      setRankedResumes(response.data.ranked_resumes);
    } catch (error) {
      console.error('Error ranking resumes:', error);
    }
  };

  return (
    <div>
      <h2>Rank Resumes</h2>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Enter job description"
      />
      <textarea
        value={resumes.join('\n')}
        onChange={(e) => setResumes(e.target.value.split('\n'))}
        placeholder="Enter resumes, one per line"
      />
      <button onClick={handleRankResumes}>Rank Resumes</button>
      <ul>
        {rankedResumes.map((resume, index) => (
          <li key={index}>
            <h4>Rank: {resume.rank}</h4>
            <p>{resume.resume}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankResumes;
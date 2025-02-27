import React, { useState } from 'react';
import { rankResumes } from '../apiService';

const RankResumes = () => {
  const [candidateId, setCandidateId] = useState('');
  const [rankedResumes, setRankedResumes] = useState([]);

  const handleRankResumes = async () => {
    try {
      const response = await rankResumes(candidateId);
      setRankedResumes(response.ranked_resumes);
      console.log('Ranked resumes:', response.ranked_resumes);
    } catch (error) {
      console.error('Error ranking resumes:', error);
    }
  };

  return (
    <div>
      <h2>Rank Resumes</h2>
      <input
        type="text"
        placeholder="Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <button onClick={handleRankResumes}>Rank Resumes</button>
      <div>
        <h3>Ranked Resumes</h3>
        <ul>
          {rankedResumes.map((resume, index) => (
            <li key={index}>{resume}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankResumes;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [hrData, setHrData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    // Fetch HR data
    axios.get('http://localhost:8000/accounts/api/hr/')
      .then(response => {
        setHrData(response.data);
      })
      .catch(error => {
        console.error('Error fetching HR data:', error);
      });

    // Fetch Candidate data
    axios.get('http://localhost:8000/accounts/api/candidates/')
      .then(response => {
        setCandidateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Candidate data:', error);
      });
  }, []);

  return (
    <div>
      <h1>HR List</h1>
      <ul>
        {hrData.map(hr => (
          <li key={hr.id}>{hr.name}</li> // Adjust based on your HR model fields
        ))}
      </ul>

      <h1>Candidate List</h1>
      <ul>
        {candidateData.map(candidate => (
          <li key={candidate.id}>{candidate.name}</li> // Adjust based on your Candidate model fields
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
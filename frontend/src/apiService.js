

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
});

export const rankResumes = (jobDesc, resumes) => {
  return api.post('rank/', {
    job_desc: jobDesc,
    resumes: resumes,
  });
};
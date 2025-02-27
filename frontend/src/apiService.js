import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your backend URL

export const rankResumes = async (candidateId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/rank_resumes/`, { candidate_id: candidateId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other API functions as needed

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_STUDYSPOT || 'http://localhost:3001/api/studyspot';

async function getSpots() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getSpotsByFeatures(features) {
  try {
    const response = await axios.get(`${API_URL}/features/?features=${features}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getSpotsByTime(day_of_week, time) {
  try {
    const response = await axios.get(`${API_URL}/time?day_of_week=${day_of_week}&time=${time}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getSpots,
  getSpotsByFeatures,
  getSpotsByTime,
}
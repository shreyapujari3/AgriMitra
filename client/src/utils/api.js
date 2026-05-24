import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for disease detection
export const detectDisease = async (imageFile, cropId, cropName) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('cropId', cropId);
    formData.append('cropName', cropName);

    const response = await apiClient.post('/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Detection failed' };
  }
};

// Get all crops
export const getCrops = async () => {
  try {
    const response = await apiClient.get('/crops');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch crops' };
  }
};

// Get diseases for a specific crop
export const getDiseasesForCrop = async (cropId) => {
  try {
    const response = await apiClient.get(`/diseases/${cropId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch diseases' };
  }
};

// Get treatment for a specific disease
export const getTreatment = async (diseaseId) => {
  try {
    const response = await apiClient.get(`/treatment/${diseaseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch treatment' };
  }
};

// Get all agri stores
export const getStores = async (district = null) => {
  try {
    const params = district ? { district } : {};
    const response = await apiClient.get('/stores', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch stores' };
  }
};

// Get all experts
export const getExperts = async (district = null) => {
  try {
    const params = district ? { district } : {};
    const response = await apiClient.get('/experts', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch experts' };
  }
};

// Get preventive tips for a crop
export const getTips = async (cropId) => {
  try {
    const response = await apiClient.get(`/tips/${cropId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch tips' };
  }
};

export default apiClient;

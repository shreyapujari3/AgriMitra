import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const PLANT_ID_API_URL = 'https://api.plant.id/v2/identify';

/**
 * Identify plant disease from image using Plant.id API
 * @param {string} imagePath - Path to the image file
 * @param {string} cropName - Name of the crop
 * @returns {Object} - Disease identification result
 */
export const identifyDisease = async (imagePath, cropName) => {
  try {
    // Read the image file
    const imageStream = fs.createReadStream(imagePath);
    
    const formData = new FormData();
    formData.append('images', imageStream);
    formData.append('organs', ['leaf', 'fruit']);
    formData.append('similar_images', true);
    formData.append('health_assessment', true); // Enable disease detection

    const response = await axios.post(PLANT_ID_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': PLANT_ID_API_KEY,
      },
    });

    // Parse the response
    const { predictions, health_assessment } = response.data;

    if (predictions && predictions.length > 0) {
      const topPrediction = predictions[0];
      
      return {
        success: true,
        disease: topPrediction.disease?.name || topPrediction.name || 'Unknown',
        confidence: topPrediction.probability || topPrediction.confidence || 0,
        healthAssessment: health_assessment || {},
        details: topPrediction,
      };
    }

    return {
      success: false,
      message: 'No disease prediction found',
      disease: null,
      confidence: 0,
    };
  } catch (error) {
    console.error('Plant.id API Error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.message || 'Disease identification failed',
      disease: null,
      confidence: 0,
    };
  }
};

/**
 * Fallback disease mapping - returns most common disease for a crop
 * Used when API confidence is low or API fails
 */
export const getFallbackDisease = (cropName) => {
  const fallbackMap = {
    'Coffee': 'Leaf Rust',
    'Pepper': 'Leaf Spot',
    'Sugarcane': 'Red Rot',
    'Areca Nut': 'Root Wilt',
  };

  return fallbackMap[cropName] || null;
};

export default {
  identifyDisease,
  getFallbackDisease,
};

import express from 'express';
import {
  getCrops,
  getDiseasesForCrop,
  getTreatment,
} from '../controllers/cropController.js';

const router = express.Router();

/**
 * GET /api/crops
 * Get all crops
 */
router.get('/crops', getCrops);

/**
 * GET /api/diseases/:cropId
 * Get diseases for a specific crop
 */
router.get('/diseases/:cropId', getDiseasesForCrop);

/**
 * GET /api/treatment/:diseaseId
 * Get treatment for a specific disease
 */
router.get('/treatment/:diseaseId', getTreatment);

export default router;

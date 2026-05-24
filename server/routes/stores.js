import express from 'express';
import {
  getStores,
  getExperts,
  getTips,
} from '../controllers/storeController.js';

const router = express.Router();

/**
 * GET /api/stores
 * Get all agri stores (optional: ?district=)
 */
router.get('/stores', getStores);

/**
 * GET /api/experts
 * Get all experts (optional: ?district=)
 */
router.get('/experts', getExperts);

/**
 * GET /api/tips/:cropId
 * Get preventive tips for a crop
 */
router.get('/tips/:cropId', getTips);

export default router;

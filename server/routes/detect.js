import express from 'express';
import { detectDisease } from '../controllers/detectController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * POST /api/detect
 * Upload image and detect disease
 */
router.post('/detect', upload.single('image'), detectDisease);

export default router;

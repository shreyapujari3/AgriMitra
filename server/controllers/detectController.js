import supabase from '../services/supabaseClient.js';
import { identifyDisease, getFallbackDisease } from '../services/plantIdService.js';
import fallbackDiseaseData from '../data/diseaseData.js';
import fs from 'fs';

/**
 * Detect disease from uploaded image
 * POST /api/detect
 */
export const detectDisease = async (req, res) => {
  try {
    const { cropId, cropName } = req.body;

    // Validate input
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    if (!cropId || !cropName) {
      return res.status(400).json({ error: 'cropId and cropName are required' });
    }

    const imagePath = req.file.path;

    // Call Plant.id API to identify disease
    const identificationResult = await identifyDisease(imagePath, cropName);

    let disease = null;
    let treatment = null;
    let confidence = identificationResult.confidence || 0;
    let demoMode = false;

    // If Plant.id returns good confidence, use it
    if (identificationResult.success && confidence >= 0.5) {
      disease = identificationResult.disease;
      
      // Try to find matching disease in database
      const { data: dbDiseases, error: dbError } = await supabase
        .from('diseases')
        .select('*, treatments(*)')
        .eq('crop_id', cropId)
        .ilike('name', `%${disease}%`)
        .single();

      if (!dbError && dbDiseases) {
        disease = dbDiseases.name;
        treatment = dbDiseases.treatments?.[0] || null;
      }
    } else {
      // Fallback to most common disease for the crop (DEMO MODE)
      demoMode = true;
      disease = getFallbackDisease(cropName);

      // Fetch disease and treatment from database
      if (disease) {
        const { data: dbDiseases, error: dbError } = await supabase
          .from('diseases')
          .select('*, treatments(*)')
          .eq('crop_id', cropId)
          .eq('name', disease)
          .single();

        if (!dbError && dbDiseases) {
          treatment = dbDiseases.treatments?.[0] || null;
        } else {
          // Use fallback data if database lookup fails
          const fallbackData = fallbackDiseaseData[cropName]?.[disease];
          if (fallbackData) {
            disease = fallbackData.name;
            treatment = fallbackData.treatment;
          }
        }
      }
    }

    // Store detection in logs
    await supabase.from('detection_logs').insert({
      crop_id: cropId,
      disease_detected: disease,
      image_url: imagePath,
      confidence: confidence,
    });

    // Prepare response
    const response = {
      disease,
      confidence: Math.round(confidence * 100),
      severity: 'Medium',
      treatment,
      demoMode,
      disclaimer: demoMode ? 'Demo mode: Result based on nearest match' : null,
    };

    res.json(response);

    // Clean up uploaded file
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  } catch (error) {
    console.error('Detection error:', error);
    res.status(500).json({ error: 'Disease detection failed', details: error.message });
  }
};

export default {
  detectDisease,
};

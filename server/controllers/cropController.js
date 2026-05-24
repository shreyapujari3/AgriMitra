import supabase from '../services/supabaseClient.js';

/**
 * Get all crops
 * GET /api/crops
 */
export const getCrops = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

/**
 * Get diseases for a specific crop
 * GET /api/diseases/:cropId
 */
export const getDiseasesForCrop = async (req, res) => {
  try {
    const { cropId } = req.params;

    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .eq('crop_id', cropId)
      .order('severity', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({ error: 'Failed to fetch diseases' });
  }
};

/**
 * Get treatment for a specific disease
 * GET /api/treatment/:diseaseId
 */
export const getTreatment = async (req, res) => {
  try {
    const { diseaseId } = req.params;

    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('disease_id', diseaseId)
      .single();

    if (error) throw error;

    res.json(data || {});
  } catch (error) {
    console.error('Error fetching treatment:', error);
    res.status(500).json({ error: 'Failed to fetch treatment' });
  }
};

export default {
  getCrops,
  getDiseasesForCrop,
  getTreatment,
};

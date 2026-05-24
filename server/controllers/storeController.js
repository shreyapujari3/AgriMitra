import supabase from '../services/supabaseClient.js';

/**
 * Get all agri stores or filter by district
 * GET /api/stores?district=Chikmagalur
 */
export const getStores = async (req, res) => {
  try {
    const { district } = req.query;

    let query = supabase.from('agri_stores').select('*');

    if (district) {
      query = query.eq('district', district);
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

/**
 * Get all experts or filter by district
 * GET /api/experts?district=Chikmagalur
 */
export const getExperts = async (req, res) => {
  try {
    const { district } = req.query;

    let query = supabase.from('experts').select('*');

    if (district) {
      query = query.eq('district', district);
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching experts:', error);
    res.status(500).json({ error: 'Failed to fetch experts' });
  }
};

/**
 * Get preventive tips for a specific crop
 * GET /api/tips/:cropId
 */
export const getTips = async (req, res) => {
  try {
    const { cropId } = req.params;

    const { data, error } = await supabase
      .from('preventive_tips')
      .select('*')
      .eq('crop_id', cropId)
      .order('season', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};

export default {
  getStores,
  getExperts,
  getTips,
};

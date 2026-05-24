import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import NearbyStores from '../components/NearbyStores.jsx';
import { getStores, getCrops } from '../utils/api.js';
import toast from 'react-hot-toast';
import './Stores.css';

const Stores = () => {
  const { translations: t } = useLanguage();
  const [stores, setStores] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStores();
    loadDistricts();
  }, []);

  useEffect(() => {
    loadStores(selectedDistrict);
  }, [selectedDistrict]);

  const loadStores = async (district = '') => {
    try {
      setLoading(true);
      const data = await getStores(district || null);
      setStores(data);
    } catch (error) {
      toast.error('Failed to load stores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadDistricts = async () => {
    try {
      const data = await getStores();
      const uniqueDistricts = [...new Set(data.map(store => store.district))].sort();
      setDistricts(uniqueDistricts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="stores-page container">
      <h1 className="page-title">{t.stores.title}</h1>

      <div className="stores-container">
        <div className="filter-section">
          <label htmlFor="district-filter" className="label">
            {t.stores.filterByDistrict}
          </label>
          <select
            id="district-filter"
            className="district-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">-- All Districts --</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <NearbyStores stores={stores} loading={loading} />
      </div>
    </div>
  );
};

export default Stores;

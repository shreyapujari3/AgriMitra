import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import CropSelector from '../components/CropSelector.jsx';
import PreventiveTips from '../components/PreventiveTips.jsx';
import { getCrops, getTips } from '../utils/api.js';
import toast from 'react-hot-toast';
import './Tips.css';

const Tips = () => {
  const { translations: t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropsLoading, setCropsLoading] = useState(true);

  useEffect(() => {
    loadCrops();
  }, []);

  useEffect(() => {
    if (selectedCropId) {
      loadTips(selectedCropId);
    }
  }, [selectedCropId]);

  const loadCrops = async () => {
    try {
      setCropsLoading(true);
      const data = await getCrops();
      setCrops(data);
    } catch (error) {
      toast.error('Failed to load crops');
      console.error(error);
    } finally {
      setCropsLoading(false);
    }
  };

  const loadTips = async (cropId) => {
    try {
      setLoading(true);
      const data = await getTips(cropId);
      setTips(data);
    } catch (error) {
      toast.error('Failed to load tips');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tips-page container">
      <h1 className="page-title">{t.tips.title}</h1>

      <div className="tips-container-wrapper">
        <CropSelector
          crops={crops}
          selectedCrop={selectedCropId}
          onSelectCrop={setSelectedCropId}
          disabled={cropsLoading}
        />

        {selectedCropId ? (
          <div className="tips-section">
            <PreventiveTips tips={tips} loading={loading} />
          </div>
        ) : (
          <p className="placeholder-text">{t.tips.selectCrop}</p>
        )}
      </div>
    </div>
  );
};

export default Tips;

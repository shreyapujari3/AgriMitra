import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import CropSelector from '../components/CropSelector.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import DetectionResult from '../components/DetectionResult.jsx';
import TreatmentCard from '../components/TreatmentCard.jsx';
import { getCrops, detectDisease } from '../utils/api.js';
import toast from 'react-hot-toast';
import './DetectDisease.css';

const DetectDisease = () => {
  const { translations: t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [selectedCropName, setSelectedCropName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropsLoading, setCropsLoading] = useState(true);

  // Load crops on mount
  useEffect(() => {
    loadCrops();
  }, []);

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

  const handleCropSelect = (cropId) => {
    setSelectedCropId(cropId);
    const crop = crops.find(c => c.id === cropId);
    if (crop) {
      setSelectedCropName(crop.name);
    }
  };

  const handleImageSelected = (file) => {
    setSelectedImage(file);
  };

  const handleDetect = async () => {
    if (!selectedCropId) {
      toast.error('Please select a crop');
      return;
    }

    if (!selectedImage) {
      toast.error('Please upload an image');
      return;
    }

    try {
      setLoading(true);
      const detectionResult = await detectDisease(
        selectedImage,
        selectedCropId,
        selectedCropName
      );
      setResult(detectionResult);
      toast.success('Disease detected successfully!');
    } catch (error) {
      toast.error(error.error || 'Detection failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedCropId(null);
    setSelectedCropName('');
    setSelectedImage(null);
  };

  return (
    <div id="detect" className="detect-disease-page container">
      <h1 className="page-title">{t.detection.title}</h1>

      <div className="detect-container">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>{t.detection.selectCrop}</h2>
          <CropSelector
            crops={crops}
            selectedCrop={selectedCropId}
            onSelectCrop={handleCropSelect}
            disabled={cropsLoading}
          />

          <h2 style={{ marginTop: '2rem' }}>{t.detection.uploadImage}</h2>
          <ImageUploader
            onImageSelected={handleImageSelected}
            disabled={loading}
          />

          <button
            className="btn-detect"
            onClick={handleDetect}
            disabled={!selectedCropId || !selectedImage || loading}
          >
            {loading ? t.detection.processing : t.detection.detectButton}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="results-section">
            <DetectionResult result={result} loading={false} />
            {result.treatment && <TreatmentCard treatment={result.treatment} />}
            <button
              className="btn-detect"
              onClick={handleReset}
              style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #1976D2, #0D47A1)' }}
            >
              🔄 Detect Another Disease
            </button>
          </div>
        )}

        {loading && (
          <div className="results-section">
            <DetectionResult result={null} loading={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectDisease;

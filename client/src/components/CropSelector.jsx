import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import './CropSelector.css';

const CropSelector = ({ crops, selectedCrop, onSelectCrop, disabled = false }) => {
const { language, translations: t } = useLanguage();

const getCropName = (crop) => {
  if (language === 'hi' && crop.local_name_hi) return crop.local_name_hi;
  if (language === 'kn' && crop.local_name_kn) return crop.local_name_kn;
  return crop.name;
};

  return (
    <div className="crop-selector">
      <label htmlFor="crop-select" className="label">
        {t.detection.selectCrop}
      </label>
      <select
        id="crop-select"
        className="crop-select"
        value={selectedCrop || ''}
        onChange={(e) => onSelectCrop(Number(e.target.value))}
        disabled={disabled}
      >
        <option value="">-- {t.detection.selectCrop} --</option>
        {crops && crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {getCropName(crop)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CropSelector;

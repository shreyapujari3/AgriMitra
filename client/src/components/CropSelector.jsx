import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import './CropSelector.css';

const CropSelector = ({ crops, selectedCrop, onSelectCrop, disabled = false }) => {
  const { translations: t } = useLanguage();

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
            {crop.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CropSelector;

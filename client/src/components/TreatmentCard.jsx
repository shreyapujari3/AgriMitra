import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiDroplet, FiTrendingDown, FiFeather, FiClock, FiSun } from 'react-icons/fi';
import './TreatmentCard.css';

const TreatmentCard = ({ treatment }) => {
  const { language, translations: t } = useLanguage();

  if (!treatment) {
    return null;
  }

  // Get text based on language
  const getFieldValue = (field) => {
    if (language === 'hi' && treatment[field + '_hi']) {
      return treatment[field + '_hi'];
    }
    if (language === 'kn' && treatment[field + '_kn']) {
      return treatment[field + '_kn'];
    }
    return treatment[field];
  };

  return (
    <div className="treatment-card">
      <h3>{t.treatment.title}</h3>
      
      <div className="treatment-content">
        <div className="treatment-item">
          <FiFeather className="treatment-icon pesticide" />
          <div>
            <label>{t.treatment.pesticide}</label>
            <p>{treatment.pesticide_name || 'N/A'}</p>
          </div>
        </div>

        <div className="treatment-item">
          <FiSun className="treatment-icon organic" />
          <div>
            <label>{t.treatment.organic}</label>
            <p>{treatment.organic_option || 'N/A'}</p>
          </div>
        </div>

        <div className="treatment-item">
          <FiTrendingDown className="treatment-icon dosage" />
          <div>
            <label>{t.treatment.dosage}</label>
            <p>{treatment.dosage || 'N/A'}</p>
          </div>
        </div>

        <div className="treatment-item">
          <FiDroplet className="treatment-icon method" />
          <div>
            <label>{t.treatment.method}</label>
            <p>{getFieldValue('method') || 'N/A'}</p>
          </div>
        </div>

        <div className="treatment-item">
          <FiClock className="treatment-icon frequency" />
          <div>
            <label>{t.treatment.frequency}</label>
            <p>{treatment.frequency || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="treatment-actions">
      <button className="btn-apply" onClick={() => {
        document.getElementById('contact') && document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        alert('Treatment plan noted! Contact an expert or visit a nearby store for supplies.');
      }}>
        {t.treatment.apply} ✓
      </button>
      <button className="btn-apply" style={{ background: 'linear-gradient(135deg, #1976D2, #0D47A1)', marginTop: '0.5rem' }} onClick={() => {
        window.print();
      }}>
        🖨️ Print Treatment Plan
      </button>
    </div>
    </div>
  );
};

export default TreatmentCard;

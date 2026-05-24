import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiSun, FiCloud, FiDroplet } from 'react-icons/fi';
import './PreventiveTips.css';

const PreventiveTips = ({ tips, loading = false }) => {
  const { language, translations: t } = useLanguage();

  if (loading) {
    return <div className="tips-loading">{t.common.loading}</div>;
  }

  if (!tips || tips.length === 0) {
    return <div className="tips-empty">{t.common.noData}</div>;
  }

  const getSeasonIcon = (season) => {
    switch (season) {
      case 'Pre-Monsoon':
      case 'Summer':
        return <FiSun className="season-icon" />;
      case 'Monsoon':
        return <FiDroplet className="season-icon" />;
      case 'Post-Monsoon':
        return <FiCloud className="season-icon" />;
      default:
        return <FiSun className="season-icon" />;
    }
  };

  const getSeasonLabel = (season) => {
    const seasonMap = {
      'Pre-Monsoon': t.tips.preMonsoon,
      'Monsoon': t.tips.monsoon,
      'Post-Monsoon': t.tips.postMonsoon,
      'Summer': t.tips.summer,
    };
    return seasonMap[season] || season;
  };

  const getTipValue = (tip) => {
    if (language === 'hi' && tip.tip_hi) {
      return tip.tip_hi;
    }
    if (language === 'kn' && tip.tip_kn) {
      return tip.tip_kn;
    }
    return tip.tip_en;
  };

  return (
    <div className="tips-container">
      {tips.map((tip) => (
        <div key={tip.id} className="tip-card">
          <div className="tip-header">
            {getSeasonIcon(tip.season)}
            <span className="season-label">{getSeasonLabel(tip.season)}</span>
          </div>
          <p className="tip-content">{getTipValue(tip)}</p>
        </div>
      ))}
    </div>
  );
};

export default PreventiveTips;

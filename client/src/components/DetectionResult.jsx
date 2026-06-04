import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './DetectionResult.css';

const DetectionResult = ({ result, loading = false }) => {
  const { translations: t, language } = useLanguage();

  const diseaseTranslations = {
    'Leaf Rust': { hi: 'पत्ती में जंग', kn: 'ಎಲೆ ತುಪ್ಪ' },
    'Berry Disease': { hi: 'बेरी रोग', kn: 'ಬೆರಿ ರೋಗ' },
    'Root Rot': { hi: 'जड़ सड़न', kn: 'ಬೇರಿನ ಕೆಣೆ' },
    'Leaf Spot': { hi: 'पत्ती धब्बा', kn: 'ಎಲೆ ಲೋಪ' },
    'Anthracnose': { hi: 'एन्थ्रेक्नोज', kn: 'ಅಂತ್ರಾಕ್ನೋಸ್' },
    'Phytophthora Blight': { hi: 'फाइटोफ्थोरा झुलसा', kn: 'ಫೈಟೋಫ್ಥೋರಾ ಸುಟ್ಟುಹೋಗುವಿಕೆ' },
    'Red Rot': { hi: 'लाल सड़न', kn: 'ಕೆಂಪು ಕೆಣೆ' },
    'Wilt Disease': { hi: 'मुरझान रोग', kn: 'ಶೀರ್ಣ ರೋಗ' },
    'Smut Disease': { hi: 'कालिख रोग', kn: 'ಕಾಲುಷ್ಠ ರೋಗ' },
    'Root Wilt': { hi: 'जड़ मुरझान', kn: 'ಬೇರಿನ ಶೀರ್ಣತೆ' },
    'Yellow Leaf Disease': { hi: 'पीली पत्ती रोग', kn: 'ಹೀಗೆ ಎಲೆ ರೋಗ' },
  };

  const getDiseaseName = (name) => {
    if (language === 'hi' && diseaseTranslations[name]?.hi) return diseaseTranslations[name].hi;
    if (language === 'kn' && diseaseTranslations[name]?.kn) return diseaseTranslations[name].kn;
    return name;
  };

  if (loading) {
    return (
      <div className="detection-result loading">
        <div className="spinner"></div>
        <p>{t.detection.analyzing}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      default:
        return 'medium';
    }
  };

  const getSeverityLabel = (severity) => {
    const severityMap = {
      'High': t.severity.high,
      'Medium': t.severity.medium,
      'Low': t.severity.low,
    };
    return severityMap[severity] || severity;
  };

  return (
    <div className="detection-result">
      <div className={`result-header ${getSeverityColor(result.severity)}`}>
        <FiCheckCircle className="result-icon" />
        <h2>{t.results.diseaseDetected}</h2>
      </div>

      <div className="result-content">
        <div className="result-item">
          <label>{t.results.diseaseDetected}:</label>
          <p className="disease-name">{getDiseaseName(result.disease)}</p>
        </div>

        <div className="result-item">
          <label>{t.results.confidence}:</label>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
          <p className="confidence-text">{result.confidence}%</p>
        </div>

        <div className="result-item">
          <label>{t.results.severity}:</label>
          <span className={`severity-badge ${getSeverityColor(result.severity)}`}>
            {getSeverityLabel(result.severity)}
          </span>
        </div>

        {result.demoMode && (
          <div className="demo-mode-notice">
            <FiAlertCircle />
            <p>{t.results.demoMode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionResult;

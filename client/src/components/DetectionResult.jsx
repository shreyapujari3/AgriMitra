import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './DetectionResult.css';

const DetectionResult = ({ result, loading = false }) => {
  const { translations: t } = useLanguage();

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
          <p className="disease-name">{result.disease}</p>
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

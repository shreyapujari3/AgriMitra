import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiPhone, FiUser } from 'react-icons/fi';
import './ExpertContact.css';

const ExpertContact = ({ experts, loading = false }) => {
  const { language, translations: t } = useLanguage();

  if (loading) {
    return <div className="experts-loading">{t.common.loading}</div>;
  }

  const getMessageValue = (expert) => {
    if (language === 'hi' && expert.message_hi) {
      return expert.message_hi;
    }
    if (language === 'kn' && expert.message_kn) {
      return expert.message_kn;
    }
    return expert.message;
  };

  return (
    <div className="experts-container">
      {/* Helpline Info */}
      <div className="helpline-card">
        <h3>{t.experts.helpline}</h3>
        <div className="helpline-content">
          <FiPhone className="helpline-icon" />
          <a href={`tel:${t.experts.helplineNumber}`} className="helpline-number">
            {t.experts.helplineNumber}
          </a>
        </div>
      </div>

      {/* Expert Cards */}
      <div className="experts-grid">
        {experts && experts.map((expert) => (
          <div key={expert.id} className="expert-card">
            <div className="expert-header">
              <FiUser className="expert-icon" />
              <h3>{expert.name}</h3>
            </div>
            <p className="expert-designation">{expert.designation}</p>
            <p className="expert-district">{expert.district}</p>
            
            {getMessageValue(expert) && (
              <p className="expert-message">"{getMessageValue(expert)}"</p>
            )}
            
            <a href={`tel:${expert.phone}`} className="btn-call">
              {t.experts.callNow}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertContact;

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import ExpertContact from '../components/ExpertContact.jsx';
import { getExperts } from '../utils/api.js';
import toast from 'react-hot-toast';
import './ExpertHelp.css';

const ExpertHelp = () => {
  const { translations: t } = useLanguage();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async () => {
    try {
      setLoading(true);
      const data = await getExperts();
      setExperts(data);
    } catch (error) {
      toast.error('Failed to load experts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expert-help-page container">
      <h1 className="page-title">{t.experts.title}</h1>
      <ExpertContact experts={experts} loading={loading} />
    </div>
  );
};

export default ExpertHelp;

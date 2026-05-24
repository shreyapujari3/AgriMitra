import React, { createContext, useState, useContext } from 'react';
import { en } from '../translations/en.js';
import { hi } from '../translations/hi.js';
import { kn } from '../translations/kn.js';

// Create the context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Get translations based on current language
  const getTranslations = () => {
    switch (language) {
      case 'hi':
        return hi;
      case 'kn':
        return kn;
      case 'en':
      default:
        return en;
    }
  };

  const translations = getTranslations();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('agrimitra_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;

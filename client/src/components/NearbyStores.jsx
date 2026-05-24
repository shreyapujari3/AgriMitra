import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import './NearbyStores.css';

const NearbyStores = ({ stores, loading = false }) => {
  const { translations: t } = useLanguage();

  if (loading) {
    return <div className="stores-loading">{t.common.loading}</div>;
  }

  if (!stores || stores.length === 0) {
    return <div className="stores-empty">{t.stores.noResults}</div>;
  }

  return (
    <div className="stores-grid">
      {stores.map((store) => (
        <div key={store.id} className="store-card">
          <h3>{store.name}</h3>
          <div className="store-detail">
            <FiMapPin className="detail-icon" />
            <p>{store.location} - {store.district}</p>
          </div>
          <div className="store-detail">
            <FiPhone className="detail-icon" />
            <a href={`tel:${store.contact}`} className="phone-link">
              {store.contact}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NearbyStores;

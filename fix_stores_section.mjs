import { readFileSync, writeFileSync } from 'fs';

// Create a new NearbyStoresSection component
const storesSection = `import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NearbyStores from './NearbyStores';
import { getStores } from '../utils/api';
import './NearbyStoresSection.css';

export default function NearbyStoresSection() {
  const { language } = useLanguage();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await getStores();
      setStores(data);
      const uniqueDistricts = [...new Set(data.map(s => s.district))].sort();
      setDistricts(uniqueDistricts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = selectedDistrict
    ? stores.filter(s => s.district === selectedDistrict)
    : stores;

  return (
    <section id="stores" className="stores-section">
      <div className="stores-section__blob" />
      <div className="container">
        <span className="about__tag" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
          {language === 'hi' ? 'कृषि दुकानें' : language === 'kn' ? 'ಕೃಷಿ ಅಂಗಡಿಗಳು' : 'Agri Stores'}
        </span>
        <h2 className="section-title">
          {language === 'hi' ? 'नजदीकी कृषि दुकानें' : language === 'kn' ? 'ಹತ್ತಿರದ ಕೃಷಿ ಅಂಗಡಿಗಳು' : 'Nearby Agri Stores'}
        </h2>
        <p className="section-subtitle">
          {language === 'hi' ? 'अपने जिले में कीटनाशक और उपचार सामग्री खरीदें' : language === 'kn' ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಕ್ರಿಮಿನಾಶಕ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಸಾಮಗ್ರಿ ಖರೀದಿಸಿ' : 'Find and buy pesticides and treatment supplies in your district'}
        </p>

        <div className="stores-section__filter">
          <select
            className="stores-section__select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">
              {language === 'hi' ? '-- सभी जिले --' : language === 'kn' ? '-- ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು --' : '-- All Districts --'}
            </option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <NearbyStores stores={filteredStores} loading={loading} />
      </div>
    </section>
  );
}`;

const storesCSS = `
.stores-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #071f07 0%, #0a2e0a 100%);
  position: relative;
  overflow: hidden;
}

.stores-section__blob {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(61,156,42,0.08), transparent);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  filter: blur(120px);
  pointer-events: none;
}

.stores-section__filter {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.stores-section__select {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50px;
  padding: 10px 24px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  min-width: 250px;
}

.stores-section__select:focus {
  border-color: rgba(61,156,42,0.6);
  background: rgba(61,156,42,0.08);
}

.stores-section__select option {
  background: #0a2e0a;
  color: #fff;
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.store-card {
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.store-card:hover {
  transform: translateY(-6px);
  border-color: rgba(61,156,42,0.4);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.store-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.store-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.store-detail p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
}

.detail-icon {
  color: #82d463;
  flex-shrink: 0;
}

.phone-link {
  color: #82d463;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.phone-link:hover { color: #fff; }

.stores-loading {
  text-align: center;
  color: rgba(255,255,255,0.5);
  padding: 2rem;
}

.stores-empty {
  text-align: center;
  color: rgba(255,255,255,0.5);
  padding: 2rem;
}

@media (max-width: 768px) {
  .stores-section { padding: 4rem 0; }
  .stores-grid { grid-template-columns: 1fr; }
}
`;

writeFileSync('client/src/components/NearbyStoresSection.jsx', storesSection);
writeFileSync('client/src/components/NearbyStoresSection.css', storesCSS);
console.log('Done!');

import { useState, useEffect } from 'react';
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
}
import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/pages/DetectDisease.jsx', 'utf8');

// Add imports
content = content.replace(
  "import { getCrops, detectDisease } from '../utils/api.js';",
  "import { getCrops, detectDisease, getStores } from '../utils/api.js';"
);

content = content.replace(
  "import toast from 'react-hot-toast';",
  "import toast from 'react-hot-toast';\nimport NearbyStores from '../components/NearbyStores.jsx';"
);

// Add stores state
content = content.replace(
  "  const [cropsLoading, setCropsLoading] = useState(true);",
  "  const [cropsLoading, setCropsLoading] = useState(true);\n  const [stores, setStores] = useState([]);\n  const [storesLoading, setStoresLoading] = useState(false);"
);

// Load stores after detection
content = content.replace(
  "      setResult(detectionResult);\n      toast.success('Disease detected successfully!');",
  "      setResult(detectionResult);\n      toast.success('Disease detected successfully!');\n      // Load nearby stores after detection\n      try {\n        setStoresLoading(true);\n        const storeData = await getStores();\n        setStores(storeData);\n      } catch (e) {\n        console.error(e);\n      } finally {\n        setStoresLoading(false);\n      }"
);

// Add stores section after treatment card
content = content.replace(
  `            <button
              className="btn-detect"
              onClick={handleReset}
              style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #1976D2, #0D47A1)' }}
            >
              🔄 Detect Another Disease
            </button>`,
  `            <button
              className="btn-detect"
              onClick={handleReset}
              style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #1976D2, #0D47A1)' }}
            >
              🔄 Detect Another Disease
            </button>
            <div className="nearby-stores-section">
              <h2 style={{ marginTop: '2rem', color: '#2E7D32', fontSize: '1.3rem' }}>
                🏪 {language === 'hi' ? 'नजदीकी कृषि दुकानें' : language === 'kn' ? 'ಹತ್ತಿರದ ಕೃಷಿ ಅಂಗಡಿಗಳು' : 'Nearby Agri Stores'}
              </h2>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {language === 'hi' ? 'इन दुकानों से कीटनाशक और उपचार सामग्री खरीदें' : language === 'kn' ? 'ಈ ಅಂಗಡಿಗಳಿಂದ ಕ್ರಿಮಿನಾಶಕ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಸಾಮಗ್ರಿ ಖರೀದಿಸಿ' : 'Buy pesticides and treatment supplies from these stores'}
              </p>
              <NearbyStores stores={stores} loading={storesLoading} />
            </div>`
);

// Add language to useLanguage
content = content.replace(
  "  const { translations: t } = useLanguage();",
  "  const { translations: t, language } = useLanguage();"
);

writeFileSync('client/src/pages/DetectDisease.jsx', content);
console.log('Done!');

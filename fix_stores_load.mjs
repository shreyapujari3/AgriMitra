import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/pages/DetectDisease.jsx', 'utf8');

// Load stores on mount along with crops
content = content.replace(
  `  useEffect(() => {
    loadCrops();
  }, []);`,
  `  useEffect(() => {
    loadCrops();
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setStoresLoading(true);
      const storeData = await getStores();
      setStores(storeData);
    } catch (e) {
      console.error('Failed to load stores:', e);
    } finally {
      setStoresLoading(false);
    }
  };`
);

writeFileSync('client/src/pages/DetectDisease.jsx', content);
console.log('Done!');

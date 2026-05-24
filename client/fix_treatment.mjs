import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/TreatmentCard.jsx', 'utf8');
content = content.replace(
  "import { FiDroplet, FiTrendingDown, FiFeather, FiClock, FiLeaf } from 'react-icons/fi';",
  "import { FiDroplet, FiTrendingDown, FiFeather, FiClock, FiSun } from 'react-icons/fi';"
);
content = content.replace('FiLeaf', 'FiSun');
writeFileSync('src/components/TreatmentCard.jsx', content);
console.log('Done!');

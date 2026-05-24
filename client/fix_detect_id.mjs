import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/pages/DetectDisease.jsx', 'utf8');
content = content.replace(
  'className="detect-disease-page container"',
  'id="detect" className="detect-disease-page container"'
);
writeFileSync('src/pages/DetectDisease.jsx', content);
console.log('Done!');

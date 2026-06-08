import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/App.jsx', 'utf8');

content = content.replace(
  "import Contact from './components/Contact';",
  "import Contact from './components/Contact';\nimport NearbyStoresSection from './components/NearbyStoresSection';"
);

content = content.replace(
  "        <SeasonalAdvisory />\n        <Contact />",
  "        <SeasonalAdvisory />\n        <NearbyStoresSection />\n        <Contact />"
);

writeFileSync('client/src/App.jsx', content);
console.log('Done!');

import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/DetectionResult.jsx', 'utf8');

content = content.replace(
  "const { translations: t } = useLanguage();",
  "const { translations: t, language } = useLanguage();\n\n  const diseaseTranslations = {\n    'Leaf Rust': { hi: 'पत्ती में जंग', kn: 'ಎಲೆ ತುಪ್ಪ' },\n    'Berry Disease': { hi: 'बेरी रोग', kn: 'ಬೆರಿ ರೋಗ' },\n    'Root Rot': { hi: 'जड़ सड़न', kn: 'ಬೇರಿನ ಕೆಣೆ' },\n    'Leaf Spot': { hi: 'पत्ती धब्बा', kn: 'ಎಲೆ ಲೋಪ' },\n    'Anthracnose': { hi: 'एन्थ्रेक्नोज', kn: 'ಅಂತ್ರಾಕ್ನೋಸ್' },\n    'Phytophthora Blight': { hi: 'फाइटोफ्थोरा झुलसा', kn: 'ಫೈಟೋಫ್ಥೋರಾ ಸುಟ್ಟುಹೋಗುವಿಕೆ' },\n    'Red Rot': { hi: 'लाल सड़न', kn: 'ಕೆಂಪು ಕೆಣೆ' },\n    'Wilt Disease': { hi: 'मुरझान रोग', kn: 'ಶೀರ್ಣ ರೋಗ' },\n    'Smut Disease': { hi: 'कालिख रोग', kn: 'ಕಾಲುಷ್ಠ ರೋಗ' },\n    'Root Wilt': { hi: 'जड़ मुरझान', kn: 'ಬೇರಿನ ಶೀರ್ಣತೆ' },\n    'Yellow Leaf Disease': { hi: 'पीली पत्ती रोग', kn: 'ಹೀಗೆ ಎಲೆ ರೋಗ' },\n  };\n\n  const getDiseaseName = (name) => {\n    if (language === 'hi' && diseaseTranslations[name]?.hi) return diseaseTranslations[name].hi;\n    if (language === 'kn' && diseaseTranslations[name]?.kn) return diseaseTranslations[name].kn;\n    return name;\n  };"
);

content = content.replace(
  '<p className="disease-name">{result.disease}</p>',
  '<p className="disease-name">{getDiseaseName(result.disease)}</p>'
);

writeFileSync('client/src/components/DetectionResult.jsx', content);
console.log('Done!');

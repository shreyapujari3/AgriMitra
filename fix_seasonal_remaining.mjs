import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/SeasonalAdvisory.jsx', 'utf8');

// Translate season tab names
content = content.replace(
  `{seasonIcons[season]} {season}`,
  `{seasonIcons[season]} {language === 'hi' ? {'Pre-Monsoon':'मानसून पूर्व','Monsoon':'मानसून','Post-Monsoon':'मानसून पश्चात','Summer':'गर्मी'}[season] : language === 'kn' ? {'Pre-Monsoon':'ಮಾನ್ಸೂನ್ ಪೂರ್ವ','Monsoon':'ಮಾನ್ಸೂನ್','Post-Monsoon':'ಮಾನ್ಸೂನ್ ನಂತರ','Summer':'ಬೇಸಿಗೆ'}[season] : season}`
);

// Translate Detect Now button
content = content.replace(
  `<a href="#detect" className="advisory__card-btn">Detect Now →</a>`,
  `<a href="#detect" className="advisory__card-btn">{language === 'hi' ? 'अभी पता लगाएं →' : language === 'kn' ? 'ಈಗ ಪತ್ತೆ ಮಾಡಿ →' : 'Detect Now →'}</a>`
);

// Translate calendar crop names
content = content.replace(
  `const cropCalendar = [
  {crop:'☕ Coffee',color:'#8B4513',schedule:[0,0,1,1,1,2,2,2,1,1,0,0]},
  {crop:'🌶️ Pepper',color:'#e74c3c',schedule:[0,0,1,1,2,2,2,2,1,1,0,0]},
  {crop:'🎋 Sugarcane',color:'#f5c518',schedule:[1,1,1,2,2,1,1,1,1,0,0,1]},
  {crop:'🥥 Areca Nut',color:'#8e44ad',schedule:[0,0,1,1,1,2,2,2,1,1,1,0]},
];`,
  `const getCropCalendar = (language) => [
  {crop:'☕ ' + (language==='hi'?'कॉफी':language==='kn'?'ಕಾಫಿ':'Coffee'),color:'#8B4513',schedule:[0,0,1,1,1,2,2,2,1,1,0,0]},
  {crop:'🌶️ ' + (language==='hi'?'मिर्च':language==='kn'?'ಮೆಣ್ಸು':'Pepper'),color:'#e74c3c',schedule:[0,0,1,1,2,2,2,2,1,1,0,0]},
  {crop:'🎋 ' + (language==='hi'?'गन्ना':language==='kn'?'ಕಬ್ಬು':'Sugarcane'),color:'#f5c518',schedule:[1,1,1,2,2,1,1,1,1,0,0,1]},
  {crop:'🥥 ' + (language==='hi'?'सुपारी':language==='kn'?'ಬೆಟ್ಟಲೆ':'Areca Nut'),color:'#8e44ad',schedule:[0,0,1,1,1,2,2,2,1,1,1,0]},
];`
);

// Update cropCalendar usage
content = content.replace(
  `const advisoryData = getAdvisoryData(language);`,
  `const advisoryData = getAdvisoryData(language);\n  const cropCalendar = getCropCalendar(language);`
);

// Translate risk labels
content = content.replace(
  `const riskLabels = ['Low','Medium','High'];`,
  `const getRiskLabels = (language) => language === 'hi' ? ['कम','मध्यम','उच्च'] : language === 'kn' ? ['ಕಡಿಮೆ','ಮಧ್ಯಮ','ಹೆಚ್ಚು'] : ['Low','Medium','High'];`
);

// Update riskLabels usage
content = content.replace(
  `const advisoryData = getAdvisoryData(language);\n  const cropCalendar = getCropCalendar(language);`,
  `const advisoryData = getAdvisoryData(language);\n  const cropCalendar = getCropCalendar(language);\n  const riskLabels = getRiskLabels(language);`
);

// Translate Low Risk Medium Risk High Risk legend
content = content.replace(
  `{label} Risk`,
  `{label} {language === 'hi' ? 'जोखिम' : language === 'kn' ? 'ಅಪಾಯ' : 'Risk'}`
);

// Translate season name
content = content.replace(
  `{activeSeason} Season`,
  `{language === 'hi' ? {'Pre-Monsoon':'मानसून पूर्व','Monsoon':'मानसून','Post-Monsoon':'मानसून पश्चात','Summer':'गर्मी'}[activeSeason] : language === 'kn' ? {'Pre-Monsoon':'ಮಾನ್ಸೂನ್ ಪೂರ್ವ','Monsoon':'ಮಾನ್ಸೂನ್','Post-Monsoon':'ಮಾನ್ಸೂನ್ ನಂತರ','Summer':'ಬೇಸಿಗೆ'}[activeSeason] : activeSeason + ' Season'}`
);

writeFileSync('client/src/components/SeasonalAdvisory.jsx', content);
console.log('Done!');

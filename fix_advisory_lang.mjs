import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/SeasonalAdvisory.jsx', 'utf8');

const oldAdvisory = `const advisoryData = {
  'Pre-Monsoon':[
    {crop:'☕ Coffee',disease:'Leaf Rust',risk:'High',tip:'Apply Bordeaux mixture before rains begin. Prune for air circulation.',color:'#e74c3c'},
    {crop:'🌶️ Pepper',disease:'Phytophthora Blight',risk:'High',tip:'Use disease-resistant varieties. Ensure proper drainage.',color:'#e74c3c'},
    {crop:'🎋 Sugarcane',disease:'Red Rot',risk:'Medium',tip:'Treat seeds with hot water before planting.',color:'#f39c12'},
    {crop:'🥥 Areca Nut',disease:'Root Wilt',risk:'Medium',tip:'Monitor early signs. Apply organic manure to strengthen roots.',color:'#f39c12'},
  ],
  'Monsoon':[
    {crop:'☕ Coffee',disease:'Berry Disease',risk:'High',tip:'Spray Mancozeb every 10 days. Remove infected berries immediately.',color:'#e74c3c'},
    {crop:'🌶️ Pepper',disease:'Leaf Spot',risk:'High',tip:'Avoid overhead irrigation. Apply copper oxychloride spray weekly.',color:'#e74c3c'},
    {crop:'🎋 Sugarcane',disease:'Wilt Disease',risk:'Medium',tip:'Ensure proper drainage. Apply Pseudomonas fluorescens to soil.',color:'#f39c12'},
    {crop:'🥥 Areca Nut',disease:'Leaf Spot',risk:'Low',tip:'Apply organic mulch. Spray neem oil fortnightly.',color:'#27ae60'},
  ],
  'Post-Monsoon':[
    {crop:'☕ Coffee',disease:'Root Rot',risk:'Medium',tip:'Apply Trichoderma harzianum to soil. Remove shade trees partially.',color:'#f39c12'},
    {crop:'🌶️ Pepper',disease:'Anthracnose',risk:'High',tip:'Remove infected plant parts immediately. Apply Carbendazim spray.',color:'#e74c3c'},
    {crop:'🎋 Sugarcane',disease:'Smut Disease',risk:'Low',tip:'Maintain crop rotation. Monitor for black whip symptoms.',color:'#27ae60'},
    {crop:'🥥 Areca Nut',disease:'Yellow Leaf Disease',risk:'Medium',tip:'Remove diseased plants. Control vector insects with neem oil.',color:'#f39c12'},
  ],
  'Summer':[
    {crop:'☕ Coffee',disease:'Leaf Rust',risk:'Low',tip:'Good time for pruning and field preparation.',color:'#27ae60'},
    {crop:'🌶️ Pepper',disease:'Phytophthora Blight',risk:'Low',tip:'Install drip irrigation. Prepare soil with organic matter.',color:'#27ae60'},
    {crop:'🎋 Sugarcane',disease:'Red Rot',risk:'Medium',tip:'Ensure proper irrigation during growth stages.',color:'#f39c12'},
    {crop:'🥥 Areca Nut',disease:'Root Wilt',risk:'Low',tip:'Plant with shade trees. Apply organic mulch to retain soil moisture.',color:'#27ae60'},
  ],
};`;

const newAdvisory = `const getAdvisoryData = (language) => ({
  'Pre-Monsoon':[
    {crop:'☕ ' + (language==='hi'?'कॉफी':language==='kn'?'ಕಾಫಿ':'Coffee'), disease:language==='hi'?'पत्ती में जंग':language==='kn'?'ಎಲೆ ತುಪ್ಪ':'Leaf Rust', risk:language==='hi'?'उच्च':language==='kn'?'ಹೆಚ್ಚು':'High', tip:language==='hi'?'बारिश से पहले बॉर्डो मिश्रण लगाएं। हवा के संचार के लिए छंटाई करें।':language==='kn'?'ಮಳೆ ಮೊದಲು ಬೋರ್ಡಿಕ್ಸ್ ಮಿಶ್ರಣ ಹಾಕಿ. ಗಾಳಿ ಚಲಾವಣೆಗಾಗಿ ಕತ್ತರಿಸಿ.':'Apply Bordeaux mixture before rains begin. Prune for air circulation.',color:'#e74c3c'},
    {crop:'🌶️ ' + (language==='hi'?'मिर्च':language==='kn'?'ಮೆಣ್ಸು':'Pepper'), disease:language==='hi'?'फाइटोफ्थोरा झुलसा':language==='kn'?'ಫೈಟೋಫ್ಥೋರಾ ಸುಟ್ಟುಹೋಗುವಿಕೆ':'Phytophthora Blight', risk:language==='hi'?'उच्च':language==='kn'?'ಹೆಚ್ಚು':'High', tip:language==='hi'?'रोग प्रतिरोधी किस्मों का उपयोग करें। उचित जल निकासी सुनिश्चित करें।':language==='kn'?'ರೋಗ-ನಿರೋಧಕ ತಳಿ ಬಳಸಿ. ಸರಿಯಾದ ಡ್ರೇನೇಜ್ ಖಚಿತ ಮಾಡಿ.':'Use disease-resistant varieties. Ensure proper drainage.',color:'#e74c3c'},
    {crop:'🎋 ' + (language==='hi'?'गन्ना':language==='kn'?'ಕಬ್ಬು':'Sugarcane'), disease:language==='hi'?'लाल सड़न':language==='kn'?'ಕೆಂಪು ಕೆಣೆ':'Red Rot', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'रोपण से पहले बीजों को गर्म पानी से उपचारित करें।':language==='kn'?'ನೆಡುವ ಮೊದಲು ಬೀಜಗಳನ್ನು ಬಿಸಿ ನೀರಿನಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಮಾಡಿ.':'Treat seeds with hot water before planting.',color:'#f39c12'},
    {crop:'🥥 ' + (language==='hi'?'सुपारी':language==='kn'?'ಬೆಟ್ಟಲೆ':'Areca Nut'), disease:language==='hi'?'जड़ मुरझान':language==='kn'?'ಬೇರಿನ ಶೀರ್ಣತೆ':'Root Wilt', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'शुरुआती संकेत देखें। जड़ों को मजबूत करने के लिए जैविक खाद डालें।':language==='kn'?'ಆರಂಭಿಕ ಚಿಹ್ನೆ ಗಮನಿಸಿ. ಬೇರು ಬಲಪಡಿಸಲು ಸಾವಯವ ಗೊಬ್ಬರ ಹಾಕಿ.':'Monitor early signs. Apply organic manure to strengthen roots.',color:'#f39c12'},
  ],
  'Monsoon':[
    {crop:'☕ ' + (language==='hi'?'कॉफी':language==='kn'?'ಕಾಫಿ':'Coffee'), disease:language==='hi'?'बेरी रोग':language==='kn'?'ಬೆರಿ ರೋಗ':'Berry Disease', risk:language==='hi'?'उच्च':language==='kn'?'ಹೆಚ್ಚು':'High', tip:language==='hi'?'हर 10 दिन में मैन्कोजेब छिड़काव करें। संक्रमित जामुन तुरंत हटाएं।':language==='kn'?'ಪ್ರತಿ 10 ದಿನಕ್ಕೆ ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ. ಸೋಂಕಿತ ಬೆರಿ ತಕ್ಷಣ ತೆಗೆಯಿರಿ.':'Spray Mancozeb every 10 days. Remove infected berries immediately.',color:'#e74c3c'},
    {crop:'🌶️ ' + (language==='hi'?'मिर्च':language==='kn'?'ಮೆಣ್ಸು':'Pepper'), disease:language==='hi'?'पत्ती धब्बा':language==='kn'?'ಎಲೆ ಲೋಪ':'Leaf Spot', risk:language==='hi'?'उच्च':language==='kn'?'ಹೆಚ್ಚು':'High', tip:language==='hi'?'ऊपरी सिंचाई से बचें। साप्ताहिक कॉपर ऑक्सीक्लोराइड स्प्रे करें।':language==='kn'?'ಮೇಲಿನಿಂದ ನೀರಾವರಿ ತಪ್ಪಿಸಿ. ವಾರಕ್ಕೆ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ.':'Avoid overhead irrigation. Apply copper oxychloride spray weekly.',color:'#e74c3c'},
    {crop:'🎋 ' + (language==='hi'?'गन्ना':language==='kn'?'ಕಬ್ಬು':'Sugarcane'), disease:language==='hi'?'मुरझान रोग':language==='kn'?'ಶೀರ್ಣ ರೋಗ':'Wilt Disease', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'उचित जल निकासी सुनिश्चित करें। मिट्टी में स्यूडोमोनास फ्लोरेसेंस डालें।':language==='kn'?'ಸರಿಯಾದ ಡ್ರೇನೇಜ್ ಖಚಿತ ಮಾಡಿ. ಮಣ್ಣಿಗೆ ಸ್ಯೂಡೋಮೋನಾಸ್ ಫ್ಲೋರೆಸೆನ್ಸ್ ಹಾಕಿ.':'Ensure proper drainage. Apply Pseudomonas fluorescens to soil.',color:'#f39c12'},
    {crop:'🥥 ' + (language==='hi'?'सुपारी':language==='kn'?'ಬೆಟ್ಟಲೆ':'Areca Nut'), disease:language==='hi'?'पत्ती धब्बा':language==='kn'?'ಎಲೆ ಲೋಪ':'Leaf Spot', risk:language==='hi'?'कम':language==='kn'?'ಕಡಿಮೆ':'Low', tip:language==='hi'?'जैविक मल्च लगाएं। पखवाड़े में नीम तेल का छिड़काव करें।':language==='kn'?'ಸಾವಯವ ಮಲ್ಚ್ ಹಾಕಿ. ಪಕ್ಷದಲ್ಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.':'Apply organic mulch. Spray neem oil fortnightly.',color:'#27ae60'},
  ],
  'Post-Monsoon':[
    {crop:'☕ ' + (language==='hi'?'कॉफी':language==='kn'?'ಕಾಫಿ':'Coffee'), disease:language==='hi'?'जड़ सड़न':language==='kn'?'ಬೇರಿನ ಕೆಣೆ':'Root Rot', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'मिट्टी में ट्राइकोडर्मा हार्जियानम डालें। छाया के पेड़ आंशिक रूप से हटाएं।':language==='kn'?'ಮಣ್ಣಿಗೆ ಟ್ರೈಕೋಡರ್ಮಾ ಹಾರ್ಜಿಯಾನಮ್ ಹಾಕಿ.':'Apply Trichoderma harzianum to soil. Remove shade trees partially.',color:'#f39c12'},
    {crop:'🌶️ ' + (language==='hi'?'मिर्च':language==='kn'?'ಮೆಣ್ಸು':'Pepper'), disease:language==='hi'?'एन्थ्रेक्नोज':language==='kn'?'ಅಂತ್ರಾಕ್ನೋಸ್':'Anthracnose', risk:language==='hi'?'उच्च':language==='kn'?'ಹೆಚ್ಚು':'High', tip:language==='hi'?'संक्रमित पौधे के हिस्से तुरंत हटाएं। कार्बेन्डाजिम स्प्रे लगाएं।':language==='kn'?'ಸೋಂಕಿತ ಭಾಗ ತಕ್ಷಣ ತೆಗೆಯಿರಿ. ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಸ್ಪ್ರೇ ಹಾಕಿ.':'Remove infected plant parts immediately. Apply Carbendazim spray.',color:'#e74c3c'},
    {crop:'🎋 ' + (language==='hi'?'गन्ना':language==='kn'?'ಕಬ್ಬು':'Sugarcane'), disease:language==='hi'?'कालिख रोग':language==='kn'?'ಕಾಲುಷ್ಠ ರೋಗ':'Smut Disease', risk:language==='hi'?'कम':language==='kn'?'ಕಡಿಮೆ':'Low', tip:language==='hi'?'फसल चक्र बनाए रखें। काले कोड़े के लक्षण देखें।':language==='kn'?'ಬೆಳೆ ಸರದಿ ನಿರ್ವಹಿಸಿ. ಕಪ್ಪು ಚಾಟಿ ಲಕ್ಷಣ ಗಮನಿಸಿ.':'Maintain crop rotation. Monitor for black whip symptoms.',color:'#27ae60'},
    {crop:'🥥 ' + (language==='hi'?'सुपारी':language==='kn'?'ಬೆಟ್ಟಲೆ':'Areca Nut'), disease:language==='hi'?'पीली पत्ती रोग':language==='kn'?'ಹೀಗೆ ಎಲೆ ರೋಗ':'Yellow Leaf Disease', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'रोगग्रस्त पौधे हटाएं। नीम तेल से कीट नियंत्रण करें।':language==='kn'?'ರೋಗಾಕ್ರಾಂತ ಸಸ್ಯ ತೆಗೆಯಿರಿ. ಬೇವಿನ ಎಣ್ಣೆಯಿಂದ ಕೀಟ ನಿಯಂತ್ರಿಸಿ.':'Remove diseased plants. Control vector insects with neem oil.',color:'#f39c12'},
  ],
  'Summer':[
    {crop:'☕ ' + (language==='hi'?'कॉफी':language==='kn'?'ಕಾಫಿ':'Coffee'), disease:language==='hi'?'पत्ती में जंग':language==='kn'?'ಎಲೆ ತುಪ್ಪ':'Leaf Rust', risk:language==='hi'?'कम':language==='kn'?'ಕಡಿಮೆ':'Low', tip:language==='hi'?'छंटाई और खेत तैयारी का अच्छा समय।':language==='kn'?'ಸಮರುವಿಕೆ ಮತ್ತು ಹೊಲ ತಯಾರಿಗೆ ಒಳ್ಳೆಯ ಸಮಯ.':'Good time for pruning and field preparation.',color:'#27ae60'},
    {crop:'🌶️ ' + (language==='hi'?'मिर्च':language==='kn'?'ಮೆಣ್ಸು':'Pepper'), disease:language==='hi'?'फाइटोफ्थोरा झुलसा':language==='kn'?'ಫೈಟೋಫ್ಥೋರಾ ಸುಟ್ಟುಹೋಗುವಿಕೆ':'Phytophthora Blight', risk:language==='hi'?'कम':language==='kn'?'ಕಡಿಮೆ':'Low', tip:language==='hi'?'ड्रिप सिंचाई लगाएं। जैविक पदार्थ से मिट्टी तैयार करें।':language==='kn'?'ಡ್ರಿಪ್ ನೀರಾವರಿ ಅಳವಡಿಸಿ. ಸಾವಯವ ವಸ್ತುವಿನಿಂದ ಮಣ್ಣು ತಯಾರಿಸಿ.':'Install drip irrigation. Prepare soil with organic matter.',color:'#27ae60'},
    {crop:'🎋 ' + (language==='hi'?'गन्ना':language==='kn'?'ಕಬ್ಬು':'Sugarcane'), disease:language==='hi'?'लाल सड़न':language==='kn'?'ಕೆಂಪು ಕೆಣೆ':'Red Rot', risk:language==='hi'?'मध्यम':language==='kn'?'ಮಧ್ಯಮ':'Medium', tip:language==='hi'?'वृद्धि अवस्था में उचित सिंचाई सुनिश्चित करें।':language==='kn'?'ಬೆಳವಣಿಗೆ ಹಂತದಲ್ಲಿ ಸರಿಯಾದ ನೀರಾವರಿ ಖಚಿತ ಮಾಡಿ.':'Ensure proper irrigation during growth stages.',color:'#f39c12'},
    {crop:'🥥 ' + (language==='hi'?'सुपारी':language==='kn'?'ಬೆಟ್ಟಲೆ':'Areca Nut'), disease:language==='hi'?'जड़ मुरझान':language==='kn'?'ಬೇರಿನ ಶೀರ್ಣತೆ':'Root Wilt', risk:language==='hi'?'कम':language==='kn'?'ಕಡಿಮೆ':'Low', tip:language==='hi'?'छाया के पेड़ों के साथ लगाएं। मिट्टी की नमी बनाए रखने के लिए जैविक मल्च लगाएं।':language==='kn'?'ಛಾಯೆ ಮರಗಳೊಂದಿಗೆ ನೆಡಿ. ಮಣ್ಣಿನ ತೇವ ಉಳಿಸಲು ಸಾವಯವ ಮಲ್ಚ್ ಹಾಕಿ.':'Plant with shade trees. Apply organic mulch to retain soil moisture.',color:'#27ae60'},
  ],
});`;

content = content.replace(oldAdvisory, newAdvisory);

// Update usage of advisoryData to getAdvisoryData(language)
content = content.replace(
  'const [activeSeason, setActiveSeason] = useState(currentSeason);',
  'const [activeSeason, setActiveSeason] = useState(currentSeason);\n  const advisoryData = getAdvisoryData(language);'
);

writeFileSync('client/src/components/SeasonalAdvisory.jsx', content);
console.log('Done!');

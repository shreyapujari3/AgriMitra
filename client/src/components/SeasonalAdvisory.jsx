import { useState, useEffect } from 'react';
import './SeasonalAdvisory.css';
import { useLanguage } from '../context/LanguageContext';

const currentMonth = new Date().getMonth();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const seasonByMonth = {0:'Summer',1:'Summer',2:'Pre-Monsoon',3:'Pre-Monsoon',4:'Pre-Monsoon',5:'Monsoon',6:'Monsoon',7:'Monsoon',8:'Post-Monsoon',9:'Post-Monsoon',10:'Post-Monsoon',11:'Summer'};
const seasonColors = {'Pre-Monsoon':{bg:'#f5c518',text:'#1a1a1a'},'Monsoon':{bg:'#1976D2',text:'#fff'},'Post-Monsoon':{bg:'#e67e22',text:'#fff'},'Summer':{bg:'#e74c3c',text:'#fff'}};
const seasonIcons = {'Pre-Monsoon':'🌤️','Monsoon':'🌧️','Post-Monsoon':'🍂','Summer':'☀️'};
const getAdvisoryData = (language) => ({
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
});
const cropCalendar = [
  {crop:'☕ Coffee',color:'#8B4513',schedule:[0,0,1,1,1,2,2,2,1,1,0,0]},
  {crop:'🌶️ Pepper',color:'#e74c3c',schedule:[0,0,1,1,2,2,2,2,1,1,0,0]},
  {crop:'🎋 Sugarcane',color:'#f5c518',schedule:[1,1,1,2,2,1,1,1,1,0,0,1]},
  {crop:'🥥 Areca Nut',color:'#8e44ad',schedule:[0,0,1,1,1,2,2,2,1,1,1,0]},
];
const riskColors = ['#27ae60','#f39c12','#e74c3c'];
const riskLabels = ['Low','Medium','High'];

export default function SeasonalAdvisory() {
  const { language } = useLanguage();
  const currentSeason = seasonByMonth[currentMonth];
  const [activeSeason, setActiveSeason] = useState(currentSeason);
  const advisoryData = getAdvisoryData(language);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = document.getElementById('dashboard');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const seasonColor = seasonColors[activeSeason];

  return (
    <section id="dashboard" className="advisory">
      <div className="advisory__blob" />
      <div className="container">
        <div className={`advisory__header ${visible ? 'advisory__header--visible' : ''}`}>
          <span className="about__tag">Smart Farming</span>
          <h2 className="section-title">{language === 'hi' ? 'मौसमी सलाह और फसल कैलेंडर' : language === 'kn' ? 'ಮೌಸಮಿ ಸಲಹೆ ಮತ್ತು ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್' : 'Seasonal Advisory & Crop Calendar'}</h2>
          <p className="section-subtitle">{language === 'hi' ? 'वर्तमान मौसम के आधार पर रीयल-टाइम रोग जोखिम मूल्यांकन' : language === 'kn' ? 'ಪ್ರಸ್ತುತ ಋತುವಿನ ಆಧಾರದ ಮೇಲೆ ರಿಯಲ್-ಟೈಮ್ ರೋಗ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ' : 'Real-time disease risk assessment based on current season and crop-specific calendars.'}</p>
        </div>

        <div
          className={`advisory__banner ${visible ? 'advisory__banner--visible' : ''}`}
          style={{background:`linear-gradient(135deg, ${seasonColor.bg}22, ${seasonColor.bg}11)`,borderColor:`${seasonColor.bg}44`}}
        >
          <div className="advisory__banner-left">
            <span className="advisory__season-icon">{seasonIcons[activeSeason]}</span>
            <div>
              <div className="advisory__season-label">{language === 'hi' ? 'वर्तमान मौसम' : language === 'kn' ? 'ಪ್ರಸ್ತುತ ಋತು' : 'Current Season'}</div>
              <div className="advisory__season-name" style={{color:seasonColor.bg}}>{activeSeason} Season</div>
              <div className="advisory__season-month">{months[currentMonth]} — {language === 'hi' ? 'आपकी फसलों के लिए सक्रिय सलाह' : language === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸಕ್ರಿಯ ಸಲಹೆ' : 'Active advisory for your crops'}</div>
            </div>
          </div>
          <div className="advisory__season-tabs">
            {Object.keys(seasonColors).map((season) => (
              <button
                key={season}
                className={`advisory__tab ${activeSeason === season ? 'advisory__tab--active' : ''}`}
                style={activeSeason === season ? {background:seasonColors[season].bg,color:seasonColors[season].text} : {}}
                onClick={() => setActiveSeason(season)}
              >
                {seasonIcons[season]} {season}
              </button>
            ))}
          </div>
        </div>

        <div className="advisory__cards">
          {advisoryData[activeSeason].map((item, i) => (
            <div key={i} className="advisory__card glass" style={{'--card-delay':`${i*0.1}s`,'--card-color':item.color}}>
              <div className="advisory__card-top">
                <span className="advisory__card-crop">{item.crop}</span>
                <span className="advisory__card-risk" style={{background:item.color+'22',color:item.color,border:`1px solid ${item.color}44`}}>
                  {item.risk} Risk
                </span>
              </div>
              <h4 className="advisory__card-disease">⚠️ {item.disease}</h4>
              <p className="advisory__card-tip">💡 {item.tip}</p>
              <a href="#detect" className="advisory__card-btn">Detect Now →</a>
            </div>
          ))}
        </div>

        <div className={`advisory__calendar glass ${visible ? 'advisory__calendar--visible' : ''}`}>
          <div className="advisory__calendar-header">
            <h3>📅 {language === 'hi' ? 'वार्षिक रोग जोखिम कैलेंडर' : language === 'kn' ? 'ವಾರ್ಷಿಕ ರೋಗ ಅಪಾಯ ಕ್ಯಾಲೆಂಡರ್' : 'Annual Disease Risk Calendar'}</h3>
            <div className="advisory__calendar-legend">
              {riskLabels.map((label, i) => (
                <span key={label} className="advisory__legend-item">
                  <span className="advisory__legend-dot" style={{background:riskColors[i]}} />
                  {label} Risk
                </span>
              ))}
            </div>
          </div>
          <div className="advisory__cal-grid">
            <div className="advisory__cal-label" />
            {months.map((m, i) => (
              <div key={m} className={`advisory__cal-month ${i === currentMonth ? 'advisory__cal-month--current' : ''}`}>
                {m}
                {i === currentMonth && <span className="advisory__cal-now">NOW</span>}
              </div>
            ))}
          </div>
          {cropCalendar.map((crop) => (
            <div key={crop.crop} className="advisory__cal-grid">
              <div className="advisory__cal-label" style={{color:crop.color}}>{crop.crop}</div>
              {crop.schedule.map((risk, i) => (
                <div key={i}
                  className={`advisory__cal-cell ${i === currentMonth ? 'advisory__cal-cell--current' : ''}`}
                  style={{background:riskColors[risk]+(i === currentMonth ? 'ff' : '88'),boxShadow:i === currentMonth ? `0 0 10px ${riskColors[risk]}88` : 'none'}}
                  title={`${crop.crop} — ${riskLabels[risk]} risk in ${months[i]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
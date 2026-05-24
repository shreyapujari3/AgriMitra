import { writeFileSync } from 'fs';

const content = `import { useState, useEffect } from 'react';
import './SeasonalAdvisory.css';

const currentMonth = new Date().getMonth();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const seasonByMonth = {0:'Summer',1:'Summer',2:'Pre-Monsoon',3:'Pre-Monsoon',4:'Pre-Monsoon',5:'Monsoon',6:'Monsoon',7:'Monsoon',8:'Post-Monsoon',9:'Post-Monsoon',10:'Post-Monsoon',11:'Summer'};
const seasonColors = {'Pre-Monsoon':{bg:'#f5c518',text:'#1a1a1a'},'Monsoon':{bg:'#1976D2',text:'#fff'},'Post-Monsoon':{bg:'#e67e22',text:'#fff'},'Summer':{bg:'#e74c3c',text:'#fff'}};
const seasonIcons = {'Pre-Monsoon':'🌤️','Monsoon':'🌧️','Post-Monsoon':'🍂','Summer':'☀️'};
const advisoryData = {
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
};
const cropCalendar = [
  {crop:'☕ Coffee',color:'#8B4513',schedule:[0,0,1,1,1,2,2,2,1,1,0,0]},
  {crop:'🌶️ Pepper',color:'#e74c3c',schedule:[0,0,1,1,2,2,2,2,1,1,0,0]},
  {crop:'🎋 Sugarcane',color:'#f5c518',schedule:[1,1,1,2,2,1,1,1,1,0,0,1]},
  {crop:'🥥 Areca Nut',color:'#8e44ad',schedule:[0,0,1,1,1,2,2,2,1,1,1,0]},
];
const riskColors = ['#27ae60','#f39c12','#e74c3c'];
const riskLabels = ['Low','Medium','High'];

export default function SeasonalAdvisory() {
  const currentSeason = seasonByMonth[currentMonth];
  const [activeSeason, setActiveSeason] = useState(currentSeason);
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
        <div className={\`advisory__header \${visible ? 'advisory__header--visible' : ''}\`}>
          <span className="about__tag">Smart Farming</span>
          <h2 className="section-title">Seasonal Advisory & Crop Calendar</h2>
          <p className="section-subtitle">Real-time disease risk assessment based on current season and crop-specific calendars.</p>
        </div>

        <div
          className={\`advisory__banner \${visible ? 'advisory__banner--visible' : ''}\`}
          style={{background:\`linear-gradient(135deg, \${seasonColor.bg}22, \${seasonColor.bg}11)\`,borderColor:\`\${seasonColor.bg}44\`}}
        >
          <div className="advisory__banner-left">
            <span className="advisory__season-icon">{seasonIcons[activeSeason]}</span>
            <div>
              <div className="advisory__season-label">Current Season</div>
              <div className="advisory__season-name" style={{color:seasonColor.bg}}>{activeSeason} Season</div>
              <div className="advisory__season-month">{months[currentMonth]} — Active advisory for your crops</div>
            </div>
          </div>
          <div className="advisory__season-tabs">
            {Object.keys(seasonColors).map((season) => (
              <button
                key={season}
                className={\`advisory__tab \${activeSeason === season ? 'advisory__tab--active' : ''}\`}
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
            <div key={i} className="advisory__card glass" style={{'--card-delay':\`\${i*0.1}s\`,'--card-color':item.color}}>
              <div className="advisory__card-top">
                <span className="advisory__card-crop">{item.crop}</span>
                <span className="advisory__card-risk" style={{background:item.color+'22',color:item.color,border:\`1px solid \${item.color}44\`}}>
                  {item.risk} Risk
                </span>
              </div>
              <h4 className="advisory__card-disease">⚠️ {item.disease}</h4>
              <p className="advisory__card-tip">💡 {item.tip}</p>
              <a href="#detect" className="advisory__card-btn">Detect Now →</a>
            </div>
          ))}
        </div>

        <div className={\`advisory__calendar glass \${visible ? 'advisory__calendar--visible' : ''}\`}>
          <div className="advisory__calendar-header">
            <h3>📅 Annual Disease Risk Calendar</h3>
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
              <div key={m} className={\`advisory__cal-month \${i === currentMonth ? 'advisory__cal-month--current' : ''}\`}>
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
                  className={\`advisory__cal-cell \${i === currentMonth ? 'advisory__cal-cell--current' : ''}\`}
                  style={{background:riskColors[risk]+(i === currentMonth ? 'ff' : '88'),boxShadow:i === currentMonth ? \`0 0 10px \${riskColors[risk]}88\` : 'none'}}
                  title={\`\${crop.crop} — \${riskLabels[risk]} risk in \${months[i]}\`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

writeFileSync('src/components/SeasonalAdvisory.jsx', content);
console.log('Done!');

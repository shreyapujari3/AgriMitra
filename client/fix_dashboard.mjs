import { writeFileSync } from 'fs';

const dashboard = `import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './DashboardSection.css';

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const numTarget = parseInt(String(target).replace('%', ''));
        const step = numTarget / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, numTarget);
          setCount(Math.floor(current));
          if (current >= numTarget) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{String(target).includes('%') ? '%' : ''}</span>;
}

const chartData = [
  { label: 'Coffee', value: 35, color: '#8B4513' },
  { label: 'Pepper', value: 28, color: '#e74c3c' },
  { label: 'Sugarcane', value: 22, color: '#f5c518' },
  { label: 'Areca Nut', value: 15, color: '#8e44ad' },
];

export default function DashboardSection() {
  const { translations: t } = useLanguage();

  const stats = [
    { label: t.dashboard.title, value: 1284, icon: '🔬', change: '+12%', color: '#3d9c2a' },
    { label: t.home.features.detection, value: 847, icon: '✅', change: '+8%', color: '#27ae60' },
    { label: t.results.diseaseDetected, value: 437, icon: '⚠️', change: '-5%', color: '#e74c3c' },
    { label: t.results.confidence, value: '95%', icon: '🎯', change: '+2%', color: '#f5c518' },
  ];

  const recentDetections = [
    { crop: t.crops.coffee, disease: t.results.diseaseDetected, confidence: 94, time: '2 min ago', icon: '☕' },
    { crop: t.crops.pepper, disease: t.results.diseaseDetected, confidence: 88, time: '15 min ago', icon: '🌶️' },
    { crop: t.crops.sugarcane, disease: t.results.diseaseDetected, confidence: 91, time: '1 hr ago', icon: '🎋' },
    { crop: t.crops.arecanut, disease: t.results.diseaseDetected, confidence: 85, time: '3 hr ago', icon: '🥥' },
  ];

  return (
    <section id="dashboard" className="dash">
      <div className="dash__blob" />
      <div className="container">
        <h2 className="section-title">{t.dashboard.title}</h2>
        <p className="section-subtitle">{t.dashboard.selectCrop}</p>

        <div className="dash__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="dash__stat glass" style={{ '--stat-color': stat.color }}>
              <div className="dash__stat-icon">{stat.icon}</div>
              <div className="dash__stat-content">
                <div className="dash__stat-value"><AnimatedCounter target={stat.value} /></div>
                <div className="dash__stat-label">{stat.label}</div>
                <div className={'dash__stat-change ' + (stat.change.startsWith('+') ? 'dash__stat-change--up' : 'dash__stat-change--down')}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dash__bottom">
          <div className="dash__chart glass">
            <h3 className="dash__panel-title">{t.dashboard.diseases}</h3>
            <div className="dash__donut">
              <svg viewBox="0 0 120 120" className="dash__donut-svg">
                {chartData.reduce((acc, item) => {
                  const total = chartData.reduce((s, d) => s + d.value, 0);
                  const pct = item.value / total;
                  const angle = acc.angle;
                  const endAngle = angle + pct * 360;
                  const r = 50, cx = 60, cy = 60;
                  const toRad = (deg) => (deg * Math.PI) / 180;
                  const x1 = cx + r * Math.cos(toRad(angle - 90));
                  const y1 = cy + r * Math.sin(toRad(angle - 90));
                  const x2 = cx + r * Math.cos(toRad(endAngle - 90));
                  const y2 = cy + r * Math.sin(toRad(endAngle - 90));
                  const large = pct > 0.5 ? 1 : 0;
                  acc.elements.push(
                    <path key={item.label}
                      d={'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2 + ' Z'}
                      fill={item.color} opacity="0.85" className="dash__donut-slice" />
                  );
                  acc.angle = endAngle;
                  return acc;
                }, { angle: 0, elements: [] }).elements}
                <circle cx="60" cy="60" r="30" fill="rgba(10,46,10,0.9)" />
                <text x="60" y="68" textAnchor="middle" fill="#82d463" fontSize="10" fontWeight="700">1,284</text>
              </svg>
            </div>
            <div className="dash__legend">
              {chartData.map((d) => (
                <div key={d.label} className="dash__legend-item">
                  <span className="dash__legend-dot" style={{ background: d.color }} />
                  <span>{d.label}</span>
                  <span className="dash__legend-val">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash__recent glass">
            <h3 className="dash__panel-title">
              Recent Detections
              <span className="dash__live-badge">● LIVE</span>
            </h3>
            <div className="dash__detections">
              {recentDetections.map((d, i) => (
                <div key={i} className="dash__detection">
                  <div className="dash__detection-icon">{d.icon}</div>
                  <div className="dash__detection-info">
                    <div className="dash__detection-name">{d.crop} — {d.disease}</div>
                    <div className="dash__detection-time">{d.time}</div>
                  </div>
                  <div className="dash__detection-conf">
                    <div className="dash__conf-bar">
                      <div className="dash__conf-fill" style={{ width: d.confidence + '%' }} />
                    </div>
                    <span>{d.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`;

writeFileSync('src/components/DashboardSection.jsx', dashboard);
console.log('Done!');

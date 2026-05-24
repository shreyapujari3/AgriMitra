import { writeFileSync } from 'fs';

const about = `import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

export default function About() {
  const { translations: t } = useLanguage();
  const cardsRef = useRef([]);

  const features = [
    { icon: '🤖', titleKey: 'detection', descKey: 'detection', color: '#3d9c2a' },
    { icon: '⚡', titleKey: 'treatment', descKey: 'treatment', color: '#f5c518' },
    { icon: '🛡️', titleKey: 'prevention', descKey: 'prevention', color: '#5bbf3e' },
    { icon: '👨‍🌾', titleKey: 'support', descKey: 'support', color: '#82d463' },
  ];

  const descs = {
    detection: 'Advanced deep learning model trained on thousands of crop disease images for accurate identification.',
    treatment: 'Get instant treatment recommendations with both organic and chemical options for your crops.',
    prevention: 'Seasonal preventive tips and early warning system to protect crops before disease spreads.',
    support: 'Connect with agricultural experts and find nearby agri-stores for treatments and supplies.',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('about__card--visible'); }),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="about__blob about__blob--1" />
      <div className="about__blob about__blob--2" />
      <div className="container">
        <div className="about__header">
          <span className="about__tag">{t.common.language === 'भाषा' ? 'क्यों आग्रीमित्र?' : 'Why AgriMitra?'}</span>
          <h2 className="section-title">
            {t.home.features.detection} & {t.home.features.support}
          </h2>
          <p className="section-subtitle">
            {t.home.subtitle}
          </p>
        </div>
        <div className="about__grid">
          {features.map((feature, i) => (
            <div
              key={feature.titleKey}
              className="about__card glass"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ '--card-color': feature.color, '--delay': i * 0.1 + 's' }}
            >
              <div className="about__card-icon">{feature.icon}</div>
              <h3 className="about__card-title">{t.home.features[feature.titleKey]}</h3>
              <p className="about__card-desc">{descs[feature.descKey]}</p>
              <div className="about__card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

const howitworks = `import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './HowItWorks.css';

export default function HowItWorks() {
  const { translations: t } = useLanguage();
  const stepsRef = useRef([]);

  const steps = [
    { number: '01', icon: '📸', titleKey: 'uploadImage', descKey: 'dragDrop', color: '#3d9c2a' },
    { number: '02', icon: '🧠', titleKey: 'analyzing', descKey: 'analyzing', color: '#f5c518' },
    { number: '03', icon: '💊', titleKey: 'detectButton', descKey: 'processing', color: '#5bbf3e' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('step--visible'); }),
      { threshold: 0.15 }
    );
    stepsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="hiw">
      <div className="hiw__blob" />
      <div className="container">
        <h2 className="section-title">{t.detection.title}</h2>
        <p className="section-subtitle">{t.home.subtitle}</p>
        <div className="hiw__steps">
          {steps.map((step, i) => (
            <div key={step.number} className="hiw__step-wrapper">
              <div
                className="hiw__step glass"
                ref={(el) => (stepsRef.current[i] = el)}
                style={{ '--step-color': step.color, '--delay': i * 0.2 + 's' }}
              >
                <div className="hiw__step-number">{step.number}</div>
                <div className="hiw__step-icon">{step.icon}</div>
                <h3 className="hiw__step-title">{t.detection[step.titleKey]}</h3>
                <p className="hiw__step-desc">{t.detection[step.descKey]}</p>
                <div className="hiw__step-border" />
              </div>
              {i < steps.length - 1 && (
                <div className="hiw__arrow">
                  <div className="hiw__arrow-line" />
                  <div className="hiw__arrow-head">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hiw__cta">
          <a href="#detect" className="btn-glow">🚀 {t.home.cta}</a>
        </div>
      </div>
    </section>
  );
}`;

const dashboard = `import { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './DashboardSection.css';

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const { useEffect } = require('react');
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
                <div className={\`dash__stat-change \${stat.change.startsWith('+') ? 'dash__stat-change--up' : 'dash__stat-change--down'}\`}>
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
                    <path key={item.label} d={\`M \${cx} \${cy} L \${x1} \${y1} A \${r} \${r} 0 \${large} 1 \${x2} \${y2} Z\`}
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
              {t.common.loading.replace('...', '')} Detections
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

const contact = `import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

export default function Contact() {
  const { translations: t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const team = [
    { name: 'Dr. Ramesh Kumar', role: t.experts.designation || 'Coffee Specialist', district: 'Chikmagalur', emoji: '👨‍🔬', color: '#3d9c2a' },
    { name: 'Ms. Priya Singh', role: 'Spice Crop Expert', district: 'Hassan', emoji: '👩‍🌾', color: '#f5c518' },
    { name: 'Shri Suresh Reddy', role: 'Sugarcane Advisor', district: 'Belgaum', emoji: '👨‍🌾', color: '#5bbf3e' },
    { name: 'Dr. Anita Patel', role: 'Plant Pathologist', district: 'Kodagu', emoji: '👩‍🔬', color: '#82d463' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__blob" />
      <div className="container">
        <h2 className="section-title">{t.experts.title}</h2>
        <p className="section-subtitle">{t.experts.message}</p>
        <div className="contact__team">
          {team.map((member) => (
            <div key={member.name} className="contact__member glass" style={{ '--member-color': member.color }}>
              <div className="contact__member-avatar" style={{ background: member.color + '22', border: '2px solid ' + member.color + '44' }}>
                <span>{member.emoji}</span>
              </div>
              <h3 className="contact__member-name">{member.name}</h3>
              <p className="contact__member-role">{member.role}</p>
              <p className="contact__member-district">📍 {member.district}</p>
              <div className="contact__member-socials">
                <button className="contact__social-btn" title={t.experts.callNow}>📞</button>
                <button className="contact__social-btn" title="Email">📧</button>
                <button className="contact__social-btn" title="WhatsApp">💬</button>
              </div>
            </div>
          ))}
        </div>
        <div className="contact__form-wrapper">
          <div className="contact__form glass">
            <div className="contact__form-header">
              <h3>{t.common.save} Message</h3>
            </div>
            {sent && <div className="contact__success">✅ {t.common.success}</div>}
            <form onSubmit={handleSubmit} className="contact__form-body">
              <div className="contact__field-row">
                <div className="contact__field">
                  <label>{t.experts.name}</label>
                  <input type="text" placeholder="Ramesh Farmer" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="contact__field">
                  <label>Email</label>
                  <input type="email" placeholder="farmer@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="contact__field">
                <label>Message</label>
                <textarea rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                🌱 {t.home.cta}
              </button>
            </form>
          </div>
        </div>
        <div className="contact__footer">
          <div className="contact__footer-brand">
            <span className="contact__footer-logo">🌿 AgriMitra</span>
            <p>{t.home.subtitle}</p>
          </div>
          <div className="contact__footer-copy">© 2025 AgriMitra</div>
        </div>
      </div>
    </section>
  );
}`;

writeFileSync('src/components/About.jsx', about);
writeFileSync('src/components/HowItWorks.jsx', howitworks);
writeFileSync('src/components/DashboardSection.jsx', dashboard);
writeFileSync('src/components/Contact.jsx', contact);
console.log('All done!');

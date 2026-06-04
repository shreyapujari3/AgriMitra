import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import './Home.css';

function FloatingParticle({ style }) {
  return <div className="hero__particle" style={style} />;
}

export default function Home() {
  const { language } = useLanguage();
  const particlesRef = useRef([]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${4 + Math.random() * 8}px`,
      height: `${4 + Math.random() * 8}px`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${4 + Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.4,
    },
  }));

  const floatingIcons = ['🌱', '🍃', '🌿', '🌾', '🍀', '🌻', '🥬', '🫛'];

  const content = {
    en: {
      badge: 'AI-Powered Crop Disease Detection',
      sub: 'Smart Farming,',
      accent: 'Healthier Crops',
      desc: 'Upload a photo of your crop and get instant AI-powered disease detection, treatment recommendations, and expert guidance — in your language.',
      detect: 'Detect Disease',
      howItWorks: 'How It Works',
      scroll: 'Scroll to explore',
      stats: [
        { value: '95%', label: 'Detection Accuracy' },
        { value: '12+', label: 'Diseases Covered' },
        { value: '3s', label: 'Analysis Time' },
        { value: '4', label: 'Crop Types' },
      ],
    },
    hi: {
      badge: 'AI-संचालित फसल रोग पहचान',
      sub: 'स्मार्ट खेती,',
      accent: 'स्वस्थ फसलें',
      desc: 'अपनी फसल की फोटो अपलोड करें और तुरंत AI-संचालित रोग पहचान, उपचार सिफारिशें और विशेषज्ञ मार्गदर्शन पाएं — अपनी भाषा में।',
      detect: 'रोग पहचानें',
      howItWorks: 'यह कैसे काम करता है',
      scroll: 'नीचे स्क्रॉल करें',
      stats: [
        { value: '95%', label: 'पहचान सटीकता' },
        { value: '12+', label: 'रोग शामिल' },
        { value: '3s', label: 'विश्लेषण समय' },
        { value: '4', label: 'फसल प्रकार' },
      ],
    },
    kn: {
      badge: 'AI-ಚಾಲಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
      sub: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ,',
      accent: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು',
      desc: 'ನಿಮ್ಮ ಬೆಳೆಯ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣ AI-ಚಾಲಿತ ರೋಗ ಪತ್ತೆ, ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳು ಮತ್ತು ತಜ್ಞ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.',
      detect: 'ರೋಗ ಪತ್ತೆ ಮಾಡಿ',
      howItWorks: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      scroll: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
      stats: [
        { value: '95%', label: 'ಪತ್ತೆ ನಿಖರತೆ' },
        { value: '12+', label: 'ರೋಗಗಳು ಒಳಗೊಂಡಿವೆ' },
        { value: '3s', label: 'ವಿಶ್ಲೇಷಣೆ ಸಮಯ' },
        { value: '4', label: 'ಬೆಳೆ ವಿಧಗಳು' },
      ],
    },
  };

  const c = content[language] || content.en;

  return (
    <section id="home" className="hero">
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__blob hero__blob--3" />

      {particles.map((p) => (
        <FloatingParticle key={p.id} style={p.style} />
      ))}

      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          className="hero__floating-icon"
          style={{
            left: `${5 + (i * 12)}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}
        >
          {icon}
        </div>
      ))}

      <div className="hero__grid" />

      <div className="hero__content">
        <div className="hero__badge animate-fadeInUp">
          <span className="hero__badge-dot" />
          {c.badge}
        </div>
        <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <span className="hero__title-main">AgriMitra</span>
          <br />
          <span className="hero__title-sub">{c.sub}</span>
          <br />
          <span className="hero__title-accent">{c.accent}</span>
        </h1>
        <p className="hero__description animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {c.desc}
        </p>
        <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <a href="#detect" className="btn-glow">
            <span>🔬</span> {c.detect}
          </a>
          <a href="#how-it-works" className="btn-outline">
            <span>▶</span> {c.howItWorks}
          </a>
        </div>
        <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          {c.stats.map((stat) => (
            <div key={stat.label} className="hero__stat glass">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>{c.scroll}</span>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
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
}
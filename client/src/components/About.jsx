import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

export default function About() {
  const { language, translations: t } = useLanguage();
  const cardsRef = useRef([]);

  const features = [
    { icon: '🤖', titleKey: 'detection', descKey: 'detection', color: '#3d9c2a' },
    { icon: '⚡', titleKey: 'treatment', descKey: 'treatment', color: '#f5c518' },
    { icon: '🛡️', titleKey: 'prevention', descKey: 'prevention', color: '#5bbf3e' },
    { icon: '👨‍🌾', titleKey: 'support', descKey: 'support', color: '#82d463' },
  ];

  const allDescs = {
  en: {
    detection: 'Advanced deep learning model trained on thousands of crop disease images for accurate identification.',
    treatment: 'Get instant treatment recommendations with both organic and chemical options for your crops.',
    prevention: 'Seasonal preventive tips and early warning system to protect crops before disease spreads.',
    support: 'Connect with agricultural experts and find nearby agri-stores for treatments and supplies.',
  },
  hi: {
    detection: 'हजारों फसल रोग छवियों पर प्रशिक्षित उन्नत डीप लर्निंग मॉडल सटीक पहचान के लिए।',
    treatment: 'अपनी फसलों के लिए जैविक और रासायनिक दोनों विकल्पों के साथ तत्काल उपचार सिफारिशें पाएं।',
    prevention: 'मौसमी निवारक सुझाव और प्रारंभिक चेतावनी प्रणाली रोग फैलने से पहले फसलों की रक्षा करती है।',
    support: 'कृषि विशेषज्ञों से जुड़ें और उपचार और आपूर्ति के लिए नजदीकी एग्री-स्टोर खोजें।',
  },
  kn: {
    detection: 'ನಿಖರ ಗುರುತಿಸುವಿಕೆಗಾಗಿ ಸಾವಿರಾರು ಬೆಳೆ ರೋಗ ಚಿತ್ರಗಳ ಮೇಲೆ ತರಬೇತಿ ಪಡೆದ ಮುಂದುವರಿದ ಡೀಪ್ ಲರ್ನಿಂಗ್ ಮಾದರಿ.',
    treatment: 'ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಎರಡೂ ಆಯ್ಕೆಗಳೊಂದಿಗೆ ತಕ್ಷಣ ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.',
    prevention: 'ರೋಗ ಹರಡುವ ಮೊದಲು ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ಮೌಸಮಿ ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು ಮತ್ತು ಆರಂಭಿಕ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ.',
    support: 'ಕೃಷಿ ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಮತ್ತು ಸರಬರಾಜುಗಳಿಗಾಗಿ ಹತ್ತಿರದ ಅಗ್ರಿ-ಸ್ಟೋರ್‌ಗಳನ್ನು ಹುಡುಕಿ.',
  },
};
const descs = allDescs[language] || allDescs.en;

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
}
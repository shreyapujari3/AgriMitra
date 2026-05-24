import { writeFileSync } from 'fs';

const content = `import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './DiseaseInfo.css';

const severityColor = { High: '#e74c3c', Medium: '#f39c12', Low: '#27ae60' };

export default function DiseaseInfo() {
  const { translations: t, language } = useLanguage();
  const [flipped, setFlipped] = useState({});

  const diseases = [
    {
      name: language === 'hi' ? 'कॉफी लीफ रस्ट' : language === 'kn' ? 'ಕಾಫಿ ಎಲೆ ತುಪ್ಪ' : 'Coffee Leaf Rust',
      icon: '☕',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&q=80',
      severity: t.severity.high,
      cause: language === 'hi' ? 'हेमिलिया वास्टाट्रिक्स कवक' : language === 'kn' ? 'ಹೆಮಿಲಿಯಾ ವಾಸ್ತಾಟ್ರಿಕ್ಸ್ ಶಿಲೀಂಧ್ರ' : 'Hemileia vastatrix fungus',
      symptoms: language === 'hi'
        ? ['पत्तियों पर नारंगी/पीला पाउडर', 'समय से पहले पत्ती गिरना', 'उपज में कमी']
        : language === 'kn'
        ? ['ಎಲೆಗಳ ಮೇಲೆ ಕಿತ್ತಳೆ/ಹಳದಿ ಪುಡಿ', 'ಅಕಾಲಿಕ ಎಲೆ ಉದುರುವಿಕೆ', 'ಇಳುವರಿ ಕಡಿಮೆ']
        : ['Orange/yellow powder on leaves', 'Premature leaf drop', 'Reduced yield'],
      prevention: language === 'hi'
        ? ['मानसून से पहले बॉर्डो मिश्रण लगाएं', 'हवा के संचार के लिए छंटाई करें', 'संक्रमित पत्तियां तुरंत हटाएं']
        : language === 'kn'
        ? ['ಮಾನ್ಸೂನ್ ಮೊದಲು ಬೋರ್ಡಿಕ್ಸ್ ಮಿಶ್ರಣ ಹಾಕಿ', 'ಗಾಳಿ ಚಲಾವಣೆಗಾಗಿ ಕತ್ತರಿಸಿ', 'ಸೋಂಕಿತ ಎಲೆ ತಕ್ಷಣ ತೆಗೆಯಿರಿ']
        : ['Apply Bordeaux mixture before monsoon', 'Prune for air circulation', 'Remove infected leaves immediately'],
      color: '#e67e22',
    },
    {
      name: language === 'hi' ? 'मिर्च एन्थ्रेक्नोज' : language === 'kn' ? 'ಮೆಣ್ಸು ಅಂತ್ರಾಕ್ನೋಸ್' : 'Pepper Anthracnose',
      icon: '🌶️',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
      severity: t.severity.high,
      cause: language === 'hi' ? 'कोलेटोट्रिकम प्रजातियां' : language === 'kn' ? 'ಕೊಲೆಟೋಟ್ರಿಕಮ್ ಪ್ರಜಾತಿಗಳು' : 'Colletotrichum species',
      symptoms: language === 'hi'
        ? ['फलों पर गहरे धंसे धब्बे', 'काले किनारों वाले धब्बे', 'फल सड़न']
        : language === 'kn'
        ? ['ಹಣ್ಣುಗಳ ಮೇಲೆ ಗಾಢ ಮುಳುಗಿದ ಕಲೆಗಳು', 'ಗಾಢ ಅಂಚಿನ ಕಲೆಗಳು', 'ಹಣ್ಣು ಕೊಳೆಯುವಿಕೆ']
        : ['Dark sunken spots on fruits', 'Tan lesions with dark borders', 'Fruit rot'],
      prevention: language === 'hi'
        ? ['रोग मुक्त बीजों का उपयोग करें', 'ऊपरी सिंचाई से बचें', 'कार्बेन्डाजिम कवकनाशी लगाएं']
        : language === 'kn'
        ? ['ರೋಗ-ಮುಕ್ತ ಬೀಜ ಬಳಸಿ', 'ಮೇಲಿನಿಂದ ನೀರಾವರಿ ತಪ್ಪಿಸಿ', 'ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಹಾಕಿ']
        : ['Use disease-free seeds', 'Avoid overhead irrigation', 'Apply Carbendazim fungicide'],
      color: '#e74c3c',
    },
    {
      name: language === 'hi' ? 'गन्ना लाल सड़न' : language === 'kn' ? 'ಕಬ್ಬು ಕೆಂಪು ಕೆಣೆ' : 'Sugarcane Red Rot',
      icon: '🎋',
      image: 'https://images.unsplash.com/photo-1582556182162-f85e2b43e7fc?w=400&q=80',
      severity: t.severity.high,
      cause: language === 'hi' ? 'ग्लोमेरेला टुकुमेनेंसिस' : language === 'kn' ? 'ಗ್ಲೋಮೆರೆಲ್ಲಾ ಟುಕುಮೆನೆನ್ಸಿಸ್' : 'Glomerella tucumanensis',
      symptoms: language === 'hi'
        ? ['तने का लाल रंग', 'तने के अंदर सफेद धब्बे', 'खट्टी गंध']
        : language === 'kn'
        ? ['ಕಾಂಡದ ಕೆಂಪು ಬಣ್ಣ', 'ಕಾಂಡದ ಒಳಗೆ ಬಿಳಿ ತೇಪೆಗಳು', 'ಹುಳಿ ವಾಸನೆ']
        : ['Red discoloration of stalk', 'White patches inside stem', 'Sour smell'],
      prevention: language === 'hi'
        ? ['गर्म पानी से बीज उपचार', 'प्रतिरोधी किस्मों का उपयोग', 'जलभराव से बचें']
        : language === 'kn'
        ? ['ಬಿಸಿ ನೀರಿನ ಬೀಜ ಚಿಕಿತ್ಸೆ', 'ನಿರೋಧಕ ತಳಿ ಬಳಸಿ', 'ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿ']
        : ['Hot water seed treatment', 'Use resistant varieties', 'Avoid waterlogging'],
      color: '#c0392b',
    },
    {
      name: language === 'hi' ? 'सुपारी जड़ मुरझान' : language === 'kn' ? 'ಬೆಟ್ಟಲೆ ಬೇರಿನ ಶೀರ್ಣತೆ' : 'Areca Root Wilt',
      icon: '🥥',
      image: 'https://images.unsplash.com/photo-1585518419759-0b1a10ea51d4?w=400&q=80',
      severity: t.severity.high,
      cause: language === 'hi' ? 'फाइटोप्लाज्मा एसपी' : language === 'kn' ? 'ಫೈಟೋಪ್ಲಾಜ್ಮಾ ಎಸ್ಪಿ' : 'Phytoplasma sp.',
      symptoms: language === 'hi'
        ? ['निचली पत्तियों का पीलापन', 'पत्तियों का मुरझाना', 'जड़ों का सड़ना']
        : language === 'kn'
        ? ['ಕೆಳ ಎಲೆಗಳ ಹಳದಿಯಾಗುವಿಕೆ', 'ತಳಿಗಳ ಬಾಡುವಿಕೆ', 'ಬೇರು ಕೊಳೆಯುವಿಕೆ']
        : ['Yellowing of lower leaves', 'Wilting of fronds', 'Root decay'],
      prevention: language === 'hi'
        ? ['मासिक मिट्टी उपचार', 'जैविक खाद का उपयोग', 'शुरुआती संकेत देखें']
        : language === 'kn'
        ? ['ತಿಂಗಳ ಮಣ್ಣು ಚಿಕಿತ್ಸೆ', 'ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಸಿ', 'ಆರಂಭಿಕ ಚಿಹ್ನೆ ಗಮನಿಸಿ']
        : ['Monthly soil application', 'Use organic manure', 'Monitor early signs'],
      color: '#8e44ad',
    },
  ];

  const toggleFlip = (i) => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="diseases" className="dinfo">
      <div className="dinfo__blob" />
      <div className="container">
        <span className="about__tag" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
          {language === 'hi' ? 'रोग पुस्तकालय' : language === 'kn' ? 'ರೋಗ ಗ್ರಂಥಾಲಯ' : 'Disease Library'}
        </span>
        <h2 className="section-title">
          {language === 'hi' ? 'कीट और रोग जानकारी' : language === 'kn' ? 'ಕೀಟ ಮತ್ತು ರೋಗ ಮಾಹಿತಿ' : 'Pest & Disease Information'}
        </h2>
        <p className="section-subtitle">
          {language === 'hi' ? 'जानकारी देखने के लिए किसी भी कार्ड पर टैप करें' : language === 'kn' ? 'ಮಾಹಿತಿ ನೋಡಲು ಯಾವುದೇ ಕಾರ್ಡ್ ಟ್ಯಾಪ್ ಮಾಡಿ' : 'Tap any card to flip it and reveal symptoms and prevention tips.'}
        </p>

        <div className="dinfo__grid">
          {diseases.map((disease, i) => (
            <div
              key={i}
              className={\`dinfo__card-wrapper \${flipped[i] ? 'dinfo__card-wrapper--flipped' : ''}\`}
              onClick={() => toggleFlip(i)}
            >
              <div className="dinfo__card dinfo__card--front glass">
                <div className="dinfo__card-img">
                  <img src={disease.image} alt={disease.name} />
                  <div className="dinfo__card-overlay" style={{ background: \`linear-gradient(to top, \${disease.color}cc, transparent)\` }} />
                  <span className="dinfo__severity" style={{ background: severityColor[disease.severity] || '#e74c3c' }}>
                    {disease.severity} {language === 'hi' ? 'जोखिम' : language === 'kn' ? 'ಅಪಾಯ' : 'Risk'}
                  </span>
                </div>
                <div className="dinfo__card-body">
                  <div className="dinfo__card-icon">{disease.icon}</div>
                  <h3 className="dinfo__card-name">{disease.name}</h3>
                  <p className="dinfo__card-cause">
                    {language === 'hi' ? 'कारण' : language === 'kn' ? 'ಕಾರಣ' : 'Cause'}: {disease.cause}
                  </p>
                  <div className="dinfo__flip-hint">
                    <span>{language === 'hi' ? 'लक्षण देखें →' : language === 'kn' ? 'ರೋಗಲಕ್ಷಣ ನೋಡಿ →' : 'Tap to see symptoms →'}</span>
                  </div>
                </div>
              </div>

              <div className="dinfo__card dinfo__card--back glass" style={{ '--card-color': disease.color }}>
                <h3 className="dinfo__back-title">{disease.icon} {disease.name}</h3>
                <div className="dinfo__back-section">
                  <h4>🔴 {language === 'hi' ? 'लक्षण' : language === 'kn' ? 'ರೋಗಲಕ್ಷಣಗಳು' : 'Symptoms'}</h4>
                  <ul>{disease.symptoms.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
                <div className="dinfo__back-section">
                  <h4>✅ {language === 'hi' ? 'रोकथाम' : language === 'kn' ? 'ತಡೆಗಟ್ಟುವಿಕೆ' : 'Prevention'}</h4>
                  <ul>{disease.prevention.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <div className="dinfo__flip-hint">
                  <span>{language === 'hi' ? '← वापस जाएं' : language === 'kn' ? '← ಹಿಂದೆ ಹೋಗಿ' : '← Tap to go back'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

writeFileSync('client/src/components/DiseaseInfo.jsx', content);
console.log('Done!');

import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/Contact.jsx', 'utf8');

// Fix Send Message heading
content = content.replace(
  `<h3>{t.common.save} Message</h3>`,
  `<h3>{language === 'hi' ? 'संदेश भेजें' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Us a Message'}</h3>`
);

// Fix EMAIL label
content = content.replace(
  `<label>Email</label>`,
  `<label>{language === 'hi' ? 'ईमेल' : language === 'kn' ? 'ಇಮೇಲ್' : 'Email'}</label>`
);

// Fix MESSAGE label
content = content.replace(
  `<label>Message</label>`,
  `<label>{language === 'hi' ? 'संदेश' : language === 'kn' ? 'ಸಂದೇಶ' : 'Message'}</label>`
);

// Add language to useLanguage destructuring
content = content.replace(
  `const { translations: t } = useLanguage();`,
  `const { translations: t, language } = useLanguage();`
);

// Fix subtitle
content = content.replace(
  `<p className="section-subtitle">{t.experts.message}</p>`,
  `<p className="section-subtitle">{language === 'hi' ? 'व्यक्तिगत फसल मार्गदर्शन के लिए हमारे कृषि विशेषज्ञों से जुड़ें' : language === 'kn' ? 'ವೈಯಕ್ತಿಕ ಬೆಳೆ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Connect with our agricultural specialists for personalized crop guidance.'}</p>`
);

// Fix footer subtitle
content = content.replace(
  `<p>{t.home.subtitle}</p>`,
  `<p>{language === 'hi' ? 'भारतीय किसानों के लिए AI-संचालित फसल रोग पहचान' : language === 'kn' ? 'ಭಾರತೀಯ ರೈತರಿಗಾಗಿ AI-ಚಾಲಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ' : 'AI-powered crop disease detection for Indian farmers'}</p>`
);

// Fix send button
content = content.replace(
  `🌱 {t.home.cta}`,
  `🌱 {language === 'hi' ? 'संदेश भेजें' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Message'}`
);

// Fix success message
content = content.replace(
  `✅ {t.common.success}`,
  `✅ {language === 'hi' ? 'संदेश भेजा गया!' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!' : 'Message sent!'}`
);

writeFileSync('client/src/components/Contact.jsx', content);
console.log('Done!');

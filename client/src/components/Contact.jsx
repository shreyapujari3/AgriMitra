import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

export default function Contact() {
  const { translations: t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const team = [
    { name: 'Dr. Ramesh Kumar', role: 'Coffee & Pest Specialist', district: 'Chikmagalur', emoji: '👨‍🔬', color: '#3d9c2a', phone: '9876543210' },
    { name: 'Ms. Priya Singh', role: 'Spice Crop Expert', district: 'Hassan', emoji: '👩‍🌾', color: '#f5c518', phone: '9988765432' },
    { name: 'Shri Suresh Reddy', role: 'Sugarcane Advisor', district: 'Belgaum', emoji: '👨‍🌾', color: '#5bbf3e', phone: '9765432198' },
    { name: 'Dr. Anita Patel', role: 'Plant Pathologist', district: 'Kodagu', emoji: '👩‍🔬', color: '#82d463', phone: '9845123456' },
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
        <p className="section-subtitle">{language === 'hi' ? 'व्यक्तिगत फसल मार्गदर्शन के लिए हमारे कृषि विशेषज्ञों से जुड़ें' : language === 'kn' ? 'ವೈಯಕ್ತಿಕ ಬೆಳೆ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Connect with our agricultural specialists for personalized crop guidance.'}</p>
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
                <a className="contact__social-btn" href={`tel:+91${member.phone}`} title="Call Now">📞</a>
                <a className="contact__social-btn" href={`mailto:${member.name.toLowerCase().replace(' ','.')}@agrimitra.in`} title="Email">📧</a>
                <a className="contact__social-btn" href={`https://wa.me/91${member.phone}`} target="_blank" rel="noreferrer" title="WhatsApp">💬</a>
              </div>
              <div className="contact__member-phone">📱 +91 {member.phone}</div>
            </div>
          ))}
        </div>
        <div className="contact__form-wrapper">
          <div className="contact__form glass">
            <div className="contact__form-header">
              <h3>{language === 'hi' ? 'संदेश भेजें' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Us a Message'}</h3>
            </div>
            {sent && <div className="contact__success">✅ {language === 'hi' ? 'संदेश भेजा गया!' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!' : 'Message sent!'}</div>}
            <form onSubmit={handleSubmit} className="contact__form-body">
              <div className="contact__field-row">
                <div className="contact__field">
                  <label>{t.experts.name}</label>
                  <input type="text" placeholder="Ramesh Farmer" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="contact__field">
                  <label>{language === 'hi' ? 'ईमेल' : language === 'kn' ? 'ಇಮೇಲ್' : 'Email'}</label>
                  <input type="email" placeholder="farmer@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="contact__field">
                <label>{language === 'hi' ? 'संदेश' : language === 'kn' ? 'ಸಂದೇಶ' : 'Message'}</label>
                <textarea rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                🌱 {language === 'hi' ? 'संदेश भेजें' : language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        <div className="contact__footer">
          <div className="contact__footer-brand">
            <span className="contact__footer-logo">🌿 AgriMitra</span>
            <p>{language === 'hi' ? 'भारतीय किसानों के लिए AI-संचालित फसल रोग पहचान' : language === 'kn' ? 'ಭಾರತೀಯ ರೈತರಿಗಾಗಿ AI-ಚಾಲಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ' : 'AI-powered crop disease detection for Indian farmers'}</p>
          </div>
          <div className="contact__footer-copy">© 2025 AgriMitra</div>
        </div>
      </div>
    </section>
  );
}
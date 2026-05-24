import { writeFileSync } from 'fs';

const content = `import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, changeLanguage, translations: t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLabel = (en, hi, kn) => language === 'hi' ? hi : language === 'kn' ? kn : en;

  const navLinks = [
    { label: getLabel('Home', 'होम', 'ಮನೆ'), href: '#home' },
    { label: getLabel('About', 'हमारे बारे में', 'ನಮ್ಮ ಬಗ್ಗೆ'), href: '#about' },
    { label: getLabel('How It Works', 'कैसे काम करता है', 'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ'), href: '#how-it-works' },
    { label: t.nav.detectDisease, href: '#detect' },
    { label: getLabel('Diseases', 'रोग', 'ರೋಗಗಳು'), href: '#diseases' },
    { label: getLabel('Advisory', 'सलाह', 'ಸಲಹೆ'), href: '#dashboard' },
    { label: getLabel('Contact', 'संपर्क', 'ಸಂಪರ್ಕ'), href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'kn', label: 'ಕ' },
  ];

  return (
    <nav className={\`navbar \${scrolled ? 'navbar--scrolled' : ''}\`}>
      <div className="navbar__container">
        <a href="#home" className="navbar__logo">
          <span className="navbar__logo-icon">🌿</span>
          <span className="navbar__logo-text">AgriMitra</span>
        </a>

        <ul className={\`navbar__links \${menuOpen ? 'navbar__links--open' : ''}\`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#detect" className="navbar__cta" onClick={() => setMenuOpen(false)}>
              {t.nav.detectDisease}
            </a>
          </li>
        </ul>

        <div className="navbar__right">
          <div className="navbar__lang">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={\`navbar__lang-btn \${language === lang.code ? 'navbar__lang-btn--active' : ''}\`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {user && (
            <div className="navbar__user">
              <span className="navbar__user-name">👤 {user.name}</span>
              <button className="navbar__logout" onClick={onLogout}>
                {language === 'hi' ? 'लॉगआउट' : language === 'kn' ? 'ಲಾಗ್ಔಟ್' : 'Logout'}
              </button>
            </div>
          )}

          <button
            className={\`navbar__hamburger \${menuOpen ? 'navbar__hamburger--open' : ''}\`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}`;

writeFileSync('client/src/components/Navbar.jsx', content);
console.log('Done!');

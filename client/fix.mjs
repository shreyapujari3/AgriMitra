import { writeFileSync } from 'fs';

const navbar = `import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, changeLanguage, translations: t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: t.nav.detectDisease, href: '#detect' },
    { label: 'Diseases', href: '#diseases' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Contact', href: '#contact' },
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

writeFileSync('src/components/Navbar.jsx', navbar);
console.log('Navbar done!');

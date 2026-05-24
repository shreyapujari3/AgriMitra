import { writeFileSync } from 'fs';

const css = `
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.2rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar--scrolled {
  background: rgba(10, 46, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0.8rem 2rem;
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  z-index: 1001;
}

.navbar__logo-icon {
  font-size: 1.8rem;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.navbar__logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff, #82d463);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
}

.navbar__link {
  color: rgba(255,255,255,0.8) !important;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.navbar__link:hover {
  color: #fff !important;
  background: rgba(255,255,255,0.1);
}

.navbar__cta {
  background: linear-gradient(135deg, #3d9c2a, #5bbf3e);
  color: white !important;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(61,156,42,0.4);
  margin-left: 0.5rem;
}

.navbar__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(61,156,42,0.6);
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1001;
}

.navbar__lang {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50px;
  padding: 3px;
}

.navbar__lang-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar__lang-btn:hover { color: white; background: rgba(255,255,255,0.1); }

.navbar__lang-btn--active {
  background: linear-gradient(135deg, #3d9c2a, #5bbf3e);
  color: white !important;
  box-shadow: 0 2px 8px rgba(61,156,42,0.4);
}

.navbar__user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__user-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  white-space: nowrap;
}

.navbar__logout {
  background: rgba(231,76,60,0.2);
  border: 1px solid rgba(231,76,60,0.4);
  color: #e74c3c;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar__logout:hover {
  background: rgba(231,76,60,0.4);
  color: #fff;
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  z-index: 1001;
}

.navbar__hamburger span {
  width: 24px; height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  display: block;
}

.navbar__hamburger--open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.navbar__hamburger--open span:nth-child(2) { opacity: 0; }
.navbar__hamburger--open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

@media (max-width: 900px) {
  .navbar__hamburger { display: flex; }
  .navbar__user { display: none; }

  .navbar__links {
    position: fixed;
    top: 0; right: -100%;
    height: 100vh;
    width: 280px;
    flex-direction: column;
    align-items: flex-start;
    background: #051a05;
    padding: 5rem 1.5rem 2rem;
    gap: 0.25rem;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-left: 1px solid rgba(255,255,255,0.1);
    box-shadow: -10px 0 40px rgba(0,0,0,0.5);
  }

  .navbar__links--open { right: 0; }

  .navbar__links li { width: 100%; }

  .navbar__link {
    color: #ffffff !important;
    font-size: 1rem !important;
    padding: 12px 16px !important;
    border-radius: 10px !important;
    display: block !important;
    width: 100%;
  }

  .navbar__link:hover {
    background: rgba(61,156,42,0.2) !important;
    color: #82d463 !important;
  }

  .navbar__cta {
    color: #ffffff !important;
    margin-left: 0 !important;
    margin-top: 0.5rem !important;
    width: 100% !important;
    text-align: center !important;
    padding: 12px 16px !important;
    display: block !important;
  }
}
`;

writeFileSync('client/src/components/Navbar.css', css);
console.log('Done!');

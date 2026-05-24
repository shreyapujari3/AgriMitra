import './index.css';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import DetectDisease from './pages/DetectDisease';
import DiseaseInfo from './components/DiseaseInfo';
import SeasonalAdvisory from './components/SeasonalAdvisory';
import Contact from './components/Contact';
import Login from './pages/Login';

export default function App() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('agrimitra_user');
    if (saved) setUser(JSON.parse(saved));
    setChecked(true);
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => { localStorage.removeItem('agrimitra_user'); setUser(null); };

  if (!checked) return null;
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <LanguageProvider>
      <Toaster position="top-right" />
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Home />
        <About />
        <HowItWorks />
        <DetectDisease />
        <DiseaseInfo />
        <SeasonalAdvisory />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
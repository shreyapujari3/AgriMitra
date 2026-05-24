import { writeFileSync } from 'fs';

const loginCSS = `
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a2e0a 0%, #0f3d0a 40%, #1a5c14 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.login__blob1 {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(61,156,42,0.25), transparent);
  top: -150px; left: -150px;
  filter: blur(80px);
  pointer-events: none;
}

.login__blob2 {
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,197,24,0.15), transparent);
  bottom: -100px; right: -100px;
  filter: blur(80px);
  pointer-events: none;
}

.login__card {
  width: 100%;
  max-width: 460px;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.7s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.login__logo {
  text-align: center;
  margin-bottom: 2rem;
}

.login__logo-icon { font-size: 3rem; display: block; margin-bottom: 0.5rem; }

.login__logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, #82d463);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login__logo-sub {
  display: block;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
}

.login__tabs {
  display: flex;
  background: rgba(255,255,255,0.05);
  border-radius: 50px;
  padding: 4px;
  margin-bottom: 2rem;
}

.login__tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login__tab--active {
  background: linear-gradient(135deg, #3d9c2a, #5bbf3e);
  color: white;
  box-shadow: 0 4px 15px rgba(61,156,42,0.4);
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.login__field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.login__field input,
.login__field select {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none;
}

.login__field input::placeholder { color: rgba(255,255,255,0.25); }

.login__field input:focus,
.login__field select:focus {
  border-color: rgba(61,156,42,0.6);
  background: rgba(61,156,42,0.08);
  box-shadow: 0 0 0 3px rgba(61,156,42,0.15);
}

.login__field select option { background: #0a2e0a; color: #fff; }

.login__btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3d9c2a, #5bbf3e);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(61,156,42,0.4);
  margin-top: 0.5rem;
}

.login__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(61,156,42,0.6);
}

.login__divider {
  text-align: center;
  color: rgba(255,255,255,0.3);
  font-size: 0.82rem;
  margin: 0.5rem 0;
  position: relative;
}

.login__divider::before,
.login__divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: rgba(255,255,255,0.1);
}

.login__divider::before { left: 0; }
.login__divider::after { right: 0; }

.login__guest {
  width: 100%;
  padding: 12px;
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login__guest:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.login__success {
  background: rgba(39,174,96,0.15);
  border: 1px solid rgba(39,174,96,0.4);
  border-radius: 10px;
  padding: 12px 16px;
  color: #82d463;
  font-size: 0.9rem;
  text-align: center;
  animation: fadeInUp 0.4s ease;
}

.login__error {
  background: rgba(231,76,60,0.15);
  border: 1px solid rgba(231,76,60,0.4);
  border-radius: 10px;
  padding: 12px 16px;
  color: #e74c3c;
  font-size: 0.85rem;
  text-align: center;
}
`;

const loginJSX = `import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '', language: 'en' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem('agrimitra_user');
    if (!saved) { setError('No account found. Please sign up first.'); return; }
    const user = JSON.parse(saved);
    if (user.email !== form.email || user.password !== form.password) {
      setError('Incorrect email or password.');
      return;
    }
    setSuccess('Welcome back, ' + user.name + '! Redirecting...');
    setTimeout(() => onLogin(user), 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.location) {
      setError('Please fill in all fields.');
      return;
    }
    const user = { name: form.name, email: form.email, password: form.password, location: form.location, language: form.language };
    localStorage.setItem('agrimitra_user', JSON.stringify(user));
    setSuccess('Account created! Welcome, ' + form.name + '!');
    setTimeout(() => onLogin(user), 1500);
  };

  const handleGuest = () => {
    const guest = { name: 'Guest Farmer', email: '', location: 'Karnataka', language: 'en' };
    onLogin(guest);
  };

  return (
    <div className="login-page">
      <div className="login__blob1" />
      <div className="login__blob2" />
      <div className="login__card">
        <div className="login__logo">
          <span className="login__logo-icon">🌿</span>
          <span className="login__logo-text">AgriMitra</span>
          <span className="login__logo-sub">AI-Powered Crop Disease Detection</span>
        </div>

        <div className="login__tabs">
          <button className={\`login__tab \${tab === 'login' ? 'login__tab--active' : ''}\`} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>
            Login
          </button>
          <button className={\`login__tab \${tab === 'signup' ? 'login__tab--active' : ''}\`} onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}>
            Sign Up
          </button>
        </div>

        {error && <div className="login__error">{error}</div>}
        {success && <div className="login__success">✅ {success}</div>}

        {tab === 'login' ? (
          <form className="login__form" onSubmit={handleLogin}>
            <div className="login__field">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="farmer@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="login__field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="login__btn">🌱 Login to AgriMitra</button>
            <div className="login__divider">or</div>
            <button type="button" className="login__guest" onClick={handleGuest}>Continue as Guest 👤</button>
          </form>
        ) : (
          <form className="login__form" onSubmit={handleSignup}>
            <div className="login__field">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Ramesh Kumar" value={form.name} onChange={handleChange} required />
            </div>
            <div className="login__field">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="farmer@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="login__field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="login__field">
              <label>Your Location</label>
              <input type="text" name="location" placeholder="e.g. Chikmagalur, Karnataka" value={form.location} onChange={handleChange} required />
            </div>
            <div className="login__field">
              <label>Preferred Language</label>
              <select name="language" value={form.language} onChange={handleChange}>
                <option value="en">English</option>
                <option value="hi">Hindi - हिंदी</option>
                <option value="kn">Kannada - ಕನ್ನಡ</option>
              </select>
            </div>
            <button type="submit" className="login__btn">🚀 Create Account</button>
            <div className="login__divider">or</div>
            <button type="button" className="login__guest" onClick={handleGuest}>Continue as Guest 👤</button>
          </form>
        )}
      </div>
    </div>
  );
}`;

writeFileSync('src/pages/Login.jsx', loginJSX);
writeFileSync('src/pages/Login.css', loginCSS);
console.log('Done!');

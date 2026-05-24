import { useState } from 'react';
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
          <button className={`login__tab ${tab === 'login' ? 'login__tab--active' : ''}`} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>
            Login
          </button>
          <button className={`login__tab ${tab === 'signup' ? 'login__tab--active' : ''}`} onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}>
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
}
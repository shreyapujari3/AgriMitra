import { useEffect, useRef } from 'react';
import './Home.css';

function FloatingParticle({ style }) {
  return <div className="hero__particle" style={style} />;
}

export default function Home() {
  const particlesRef = useRef([]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${4 + Math.random() * 8}px`,
      height: `${4 + Math.random() * 8}px`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${4 + Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.4,
    },
  }));

  const floatingIcons = ['🌱', '🍃', '🌿', '🌾', '🍀', '🌻', '🥬', '🫛'];

  return (
    <section id="home" className="hero">
      {/* Animated blobs */}
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__blob hero__blob--3" />

      {/* Particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} style={p.style} />
      ))}

      {/* Floating icons */}
      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          className="hero__floating-icon"
          style={{
            left: `${5 + (i * 12)}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}
        >
          {icon}
        </div>
      ))}

      {/* Grid overlay */}
      <div className="hero__grid" />

      <div className="hero__content">
        <div className="hero__badge animate-fadeInUp">
          <span className="hero__badge-dot" />
          AI-Powered Crop Disease Detection
        </div>

        <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <span className="hero__title-main">AgriMitra</span>
          <br />
          <span className="hero__title-sub">Smart Farming,</span>
          <br />
          <span className="hero__title-accent">Healthier Crops</span>
        </h1>

        <p className="hero__description animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          Upload a photo of your crop and get instant AI-powered disease detection,
          treatment recommendations, and expert guidance — in your language.
        </p>

        <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <a href="#detect" className="btn-glow">
            <span>🔬</span> Detect Disease
          </a>
          <a href="#how-it-works" className="btn-outline">
            <span>▶</span> How It Works
          </a>
        </div>

        <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          {[
            { value: '95%', label: 'Detection Accuracy' },
            { value: '12+', label: 'Diseases Covered' },
            { value: '3s', label: 'Analysis Time' },
            { value: '4', label: 'Crop Types' },
          ].map((stat) => (
            <div key={stat.label} className="hero__stat glass">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

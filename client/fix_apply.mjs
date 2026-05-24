import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/TreatmentCard.jsx', 'utf8');
content = content.replace(
  '<button className="btn-apply">{t.treatment.apply}</button>',
  `<div className="treatment-actions">
      <button className="btn-apply" onClick={() => {
        document.getElementById('contact') && document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        alert('Treatment plan noted! Contact an expert or visit a nearby store for supplies.');
      }}>
        {t.treatment.apply} ✓
      </button>
      <button className="btn-apply" style={{ background: 'linear-gradient(135deg, #1976D2, #0D47A1)', marginTop: '0.5rem' }} onClick={() => {
        window.print();
      }}>
        🖨️ Print Treatment Plan
      </button>
    </div>`
);
writeFileSync('src/components/TreatmentCard.jsx', content);
console.log('Done!');

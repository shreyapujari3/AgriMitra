import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/Contact.jsx', 'utf8');

const oldTeam = `  const team = [
    { name: 'Dr. Ramesh Kumar', role: t.experts.designation || 'Coffee Specialist', district: 'Chikmagalur', emoji: '👨‍🔬', color: '#3d9c2a' },
    { name: 'Ms. Priya Singh', role: 'Spice Crop Expert', district: 'Hassan', emoji: '👩‍🌾', color: '#f5c518' },
    { name: 'Shri Suresh Reddy', role: 'Sugarcane Advisor', district: 'Belgaum', emoji: '👨‍🌾', color: '#5bbf3e' },
    { name: 'Dr. Anita Patel', role: 'Plant Pathologist', district: 'Kodagu', emoji: '👩‍🔬', color: '#82d463' },
  ];`;

const newTeam = `  const team = [
    { name: 'Dr. Ramesh Kumar', role: 'Coffee & Pest Specialist', district: 'Chikmagalur', emoji: '👨‍🔬', color: '#3d9c2a', phone: '9876543210' },
    { name: 'Ms. Priya Singh', role: 'Spice Crop Expert', district: 'Hassan', emoji: '👩‍🌾', color: '#f5c518', phone: '9988765432' },
    { name: 'Shri Suresh Reddy', role: 'Sugarcane Advisor', district: 'Belgaum', emoji: '👨‍🌾', color: '#5bbf3e', phone: '9765432198' },
    { name: 'Dr. Anita Patel', role: 'Plant Pathologist', district: 'Kodagu', emoji: '👩‍🔬', color: '#82d463', phone: '9845123456' },
  ];`;

content = content.replace(oldTeam, newTeam);

const oldSocials = `              <div className="contact__member-socials">
                <button className="contact__social-btn" title={t.experts.callNow}>📞</button>
                <button className="contact__social-btn" title="Email">📧</button>
                <button className="contact__social-btn" title="WhatsApp">💬</button>
              </div>`;

const newSocials = `              <div className="contact__member-socials">
                <a className="contact__social-btn" href={\`tel:+91\${member.phone}\`} title="Call Now">📞</a>
                <a className="contact__social-btn" href={\`mailto:\${member.name.toLowerCase().replace(' ','.')}@agrimitra.in\`} title="Email">📧</a>
                <a className="contact__social-btn" href={\`https://wa.me/91\${member.phone}\`} target="_blank" rel="noreferrer" title="WhatsApp">💬</a>
              </div>
              <div className="contact__member-phone">📱 +91 {member.phone}</div>`;

content = content.replace(oldSocials, newSocials);
writeFileSync('src/components/Contact.jsx', content);
console.log('Done!');

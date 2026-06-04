import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/Contact.jsx', 'utf8');

content = content.replace(
  `  const team = [
    { name: 'Dr. Ramesh Kumar', role: 'Coffee & Pest Specialist', district: 'Chikmagalur', emoji: '👨‍🔬', color: '#3d9c2a', phone: '9876543210' },
    { name: 'Ms. Priya Singh', role: 'Spice Crop Expert', district: 'Hassan', emoji: '👩‍🌾', color: '#f5c518', phone: '9988765432' },
    { name: 'Shri Suresh Reddy', role: 'Sugarcane Advisor', district: 'Belgaum', emoji: '👨‍🌾', color: '#5bbf3e', phone: '9765432198' },
    { name: 'Dr. Anita Patel', role: 'Plant Pathologist', district: 'Kodagu', emoji: '👩‍🔬', color: '#82d463', phone: '9845123456' },
  ];`,
  `  const team = [
    {
      name: 'Dr. Ramesh Kumar',
      role: language === 'hi' ? 'कॉफी और कीट विशेषज्ञ' : language === 'kn' ? 'ಕಾಫಿ ಮತ್ತು ಕೀಟ ತಜ್ಞ' : 'Coffee & Pest Specialist',
      district: language === 'hi' ? 'चिकमगलूर' : language === 'kn' ? 'ಚಿಕ್ಕಮಗಳೂರು' : 'Chikmagalur',
      emoji: '👨‍🔬', color: '#3d9c2a', phone: '9876543210'
    },
    {
      name: 'Ms. Priya Singh',
      role: language === 'hi' ? 'मसाला फसल विशेषज्ञ' : language === 'kn' ? 'ಮಸಾಲೆ ಬೆಳೆ ತಜ್ಞ' : 'Spice Crop Expert',
      district: language === 'hi' ? 'हसन' : language === 'kn' ? 'ಹಾಸನ' : 'Hassan',
      emoji: '👩‍🌾', color: '#f5c518', phone: '9988765432'
    },
    {
      name: 'Shri Suresh Reddy',
      role: language === 'hi' ? 'गन्ना सलाहकार' : language === 'kn' ? 'ಕಬ್ಬು ಸಲಹೆಗಾರ' : 'Sugarcane Advisor',
      district: language === 'hi' ? 'बेलगाम' : language === 'kn' ? 'ಬೆಳಗಾವಿ' : 'Belgaum',
      emoji: '👨‍🌾', color: '#5bbf3e', phone: '9765432198'
    },
    {
      name: 'Dr. Anita Patel',
      role: language === 'hi' ? 'पौधा रोगविज्ञानी' : language === 'kn' ? 'ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞ' : 'Plant Pathologist',
      district: language === 'hi' ? 'कोडगु' : language === 'kn' ? 'ಕೊಡಗು' : 'Kodagu',
      emoji: '👩‍🔬', color: '#82d463', phone: '9845123456'
    },
  ];`
);

writeFileSync('client/src/components/Contact.jsx', content);
console.log('Done!');

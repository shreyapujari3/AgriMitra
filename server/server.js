import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   AgriMitra Server Started                 ║
║   Environment: ${process.env.NODE_ENV || 'development'}${' '.repeat(21)}║
║   Port: ${PORT}${' '.repeat(33)}║
║   http://localhost:${PORT}${' '.repeat(24)}║
╚════════════════════════════════════════════╝
  `);
});

// Keep alive ping to prevent server from sleeping
setInterval(() => {
  fetch('https://agrimitra-v1ci.onrender.com/health')
    .then(() => console.log('Keep alive ping sent'))
    .catch(() => console.log('Keep alive ping failed'));
}, 840000); // ping every 14 minutes

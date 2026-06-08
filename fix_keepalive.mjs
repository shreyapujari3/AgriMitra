import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('server/server.js', 'utf8');
content = content + `
// Keep alive ping to prevent server from sleeping
setInterval(() => {
  fetch('https://agrimitra-v1ci.onrender.com/health')
    .then(() => console.log('Keep alive ping sent'))
    .catch(() => console.log('Keep alive ping failed'));
}, 840000); // ping every 14 minutes
`;
writeFileSync('server/server.js', content);
console.log('Done!');

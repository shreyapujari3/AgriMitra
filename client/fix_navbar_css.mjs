import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/Navbar.css', 'utf8');
content = content.replace(
  'background: rgba(10, 46, 10, 0.97);',
  'background: rgba(5, 25, 5, 0.99);'
);
content = content.replace(
  'border-left: 1px solid rgba(255, 255, 255, 0.1);',
  `border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 0 40px rgba(0,0,0,0.5);`
);
writeFileSync('src/components/Navbar.css', content);
console.log('Done!');

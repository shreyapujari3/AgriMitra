import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('server/app.js', 'utf8');
content = content.replace(
  `app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));`,
  `const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL,
  'https://agrimitra-two.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));`
);
writeFileSync('server/app.js', content);
console.log('Done!');

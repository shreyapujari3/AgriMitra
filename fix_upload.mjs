import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('server/middleware/upload.js', 'utf8');

content = content.replace(
  `import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },`,
  `import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// Create uploads folder if it doesn't exist
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },`
);

writeFileSync('server/middleware/upload.js', content);
console.log('Done!');

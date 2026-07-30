import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('client/src/components/DetectionResult.jsx', 'utf8');

// Remove confidence section
content = content.replace(
  `        <div className="result-item">
          <label>{t.results.confidence}:</label>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: \`\${result.confidence}%\` }}
            ></div>
          </div>
          <p className="confidence-text">{result.confidence}%</p>
        </div>`,
  ''
);

writeFileSync('client/src/components/DetectionResult.jsx', content);
console.log('Done!');

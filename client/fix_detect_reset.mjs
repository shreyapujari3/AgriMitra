import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/pages/DetectDisease.jsx', 'utf8');

// Add reset function after handleDetect
content = content.replace(
  `  return (`,
  `  const handleReset = () => {
    setResult(null);
    setSelectedCropId(null);
    setSelectedCropName('');
    setSelectedImage(null);
  };

  return (`
);

// Add reset button after results section
content = content.replace(
  `        {/* Results Section */}
        {result && (
          <div className="results-section">
            <DetectionResult result={result} loading={false} />
            {result.treatment && <TreatmentCard treatment={result.treatment} />}
          </div>
        )}`,
  `        {/* Results Section */}
        {result && (
          <div className="results-section">
            <DetectionResult result={result} loading={false} />
            {result.treatment && <TreatmentCard treatment={result.treatment} />}
            <button
              className="btn-detect"
              onClick={handleReset}
              style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #1976D2, #0D47A1)' }}
            >
              🔄 Detect Another Disease
            </button>
          </div>
        )}`
);

writeFileSync('src/pages/DetectDisease.jsx', content);
console.log('Done!');

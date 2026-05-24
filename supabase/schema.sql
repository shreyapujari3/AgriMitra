-- AgriMitra Database Schema

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  local_name_hi VARCHAR(100),
  local_name_kn VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  name_hi VARCHAR(150),
  name_kn VARCHAR(150),
  cause TEXT,
  cause_hi TEXT,
  cause_kn TEXT,
  severity VARCHAR(20), -- Low, Medium, High
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id SERIAL PRIMARY KEY,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  pesticide_name VARCHAR(150),
  organic_option VARCHAR(150),
  dosage VARCHAR(200),
  method VARCHAR(200),
  frequency VARCHAR(100),
  method_hi VARCHAR(200),
  method_kn VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create detection_logs table
CREATE TABLE IF NOT EXISTS detection_logs (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER NOT NULL REFERENCES crops(id),
  disease_detected VARCHAR(150),
  image_url VARCHAR(500),
  confidence FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agri_stores table
CREATE TABLE IF NOT EXISTS agri_stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  contact VARCHAR(20),
  location VARCHAR(200),
  district VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create experts table
CREATE TABLE IF NOT EXISTS experts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(100),
  phone VARCHAR(20),
  district VARCHAR(100),
  message TEXT,
  message_hi TEXT,
  message_kn TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create preventive_tips table
CREATE TABLE IF NOT EXISTS preventive_tips (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  tip_en TEXT,
  tip_hi TEXT,
  tip_kn TEXT,
  season VARCHAR(50), -- Pre-Monsoon, Monsoon, Post-Monsoon, Summer
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- SEED DATA
-- ========================

-- Insert Crops
INSERT INTO crops (name, local_name_hi, local_name_kn, image_url) VALUES
('Coffee', 'कॉफी', 'ಕಾಫಿ', 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400'),
('Pepper', 'मिर्च', 'ಕರಿಮೆಣ್ಸು', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd5e58f?w=400'),
('Sugarcane', 'गन्ना', 'ಕಬ್ಬು', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd5e58f?w=400'),
('Areca Nut', 'सुपारी', 'ಬೆಟ್ಟಲೆ', 'https://images.unsplash.com/photo-1585518419759-0b1a10ea51d4?w=400')
ON CONFLICT (name) DO NOTHING;

-- Insert Diseases for Coffee
INSERT INTO diseases (crop_id, name, name_hi, name_kn, cause, cause_hi, cause_kn, severity) VALUES
((SELECT id FROM crops WHERE name = 'Coffee'), 'Leaf Rust', 'पत्ती में जंग', 'ಎಲೆ ತುಪ್ಪ', 'Fungal infection caused by Hemileia vastatrix', 'हेमिलिया वास्टाट्रिक्स द्वारा कवक संक्रमण', 'ಹೆಮಿಲಿಯಾ ವಾಸ್ತಾಟ್ರಿಕ್ಸ್ ಕಾರಣವಾದ ಶಿಲೀಂಧ್ರ ಸೋಂಕು', 'High'),
((SELECT id FROM crops WHERE name = 'Coffee'), 'Berry Disease', 'बेरी रोग', 'ಬೆರಿ ರೋಗ', 'Caused by Colletotrichum kahawae', 'कोलेटोट्रिकम काहवाई द्वारा कारित', 'ಕೊಲೆಟೋಟ್ರಿಕಮ್ ಕಾಹವಾಎ ಕಾರಣವಾದ', 'High'),
((SELECT id FROM crops WHERE name = 'Coffee'), 'Root Rot', 'जड़ सड़न', 'ಬೇರಿನ ಕೆಣೆ', 'Phytophthora cinnamomi infection', 'फाइटोफ्थोरा सिंनामोमि संक्रमण', 'ಫೈಟೋಫ್ಥೋರಾ ಸಿನ್ನಾಮೊಮಿ ಸೋಂಕು', 'Medium');

-- Insert Diseases for Pepper
INSERT INTO diseases (crop_id, name, name_hi, name_kn, cause, cause_hi, cause_kn, severity) VALUES
((SELECT id FROM crops WHERE name = 'Pepper'), 'Leaf Spot', 'पत्ती धब्बा', 'ಎಲೆ ಲೋಪ', 'Xanthomonas campestris pv. vesicatoria', 'जैंथोमोनास कैंपेस्ट्रिस पीवी वेसिकेटोरिया', 'ಜ್যಾಂಥೋಮೋನಾಸ್ ಕ್ಯಾಂಪೆಸ್ಟ್ರಿಸ್ ಪೀವಿ ವೆಸಿಕೇಟೋರಿಯಾ', 'Medium'),
((SELECT id FROM crops WHERE name = 'Pepper'), 'Anthracnose', 'एन्थ्रेक्नोज', 'ಅಂತ್ರಾಕ್ನೋಸ್', 'Caused by Colletotrichum species', 'कोलेटोट्रिकम प्रजातियों द्वारा कारित', 'ಕೊಲೆಟೋಟ್ರಿಕಮ್ ಪ್ರಜಾತಿಗಳು ಕಾರಣವಾದ', 'High'),
((SELECT id FROM crops WHERE name = 'Pepper'), 'Phytophthora Blight', 'फाइटोफ्थोरा झुलसा', 'ಫೈಟೋಫ್ಥೋರಾ ಸುಟ್ಟುಹೋಗುವಿಕೆ', 'Phytophthora capsici infection', 'फाइटोफ्थोरा कैप्सिसी संक्रमण', 'ಫೈಟೋಫ್ಥೋರಾ ಕ್ಯಾಪ್ಸಿಸಿ ಸೋಂಕು', 'High');

-- Insert Diseases for Sugarcane
INSERT INTO diseases (crop_id, name, name_hi, name_kn, cause, cause_hi, cause_kn, severity) VALUES
((SELECT id FROM crops WHERE name = 'Sugarcane'), 'Red Rot', 'लाल सड़न', 'ಕೆಂಪು ಕೆಣೆ', 'Glomerella tucumanensis', 'ग्लोमेरेला टुकुमेनेंसिस', 'ಗ್ಲೋಮೆರೆಲ್ಲಾ ಟುಕುಮೆನೆನ್ಸಿಸ್', 'High'),
((SELECT id FROM crops WHERE name = 'Sugarcane'), 'Wilt Disease', 'मुरझान रोग', 'ಶೀರ್ಣ ರೋಗ', 'Caused by Xanthomonas species', 'जैंथोमोनास प्रजातियों द्वारा कारित', 'ಜ್যಾಂಥೋಮೋನಾಸ್ ಪ್ರಜಾತಿಗಳು ಕಾರಣವಾದ', 'Medium'),
((SELECT id FROM crops WHERE name = 'Sugarcane'), 'Smut Disease', 'कालिख रोग', 'ಕಾಲುಷ್ಠ ರೋಗ', 'Ustilago scitaminea', 'उस्टिलागो स्किटामिनिया', 'ಉಸ್ಟಿಲಾಗೋ ಸ್ಕಿಟಾಮಿನಿಯಾ', 'Medium');

-- Insert Diseases for Areca Nut
INSERT INTO diseases (crop_id, name, name_hi, name_kn, cause, cause_hi, cause_kn, severity) VALUES
((SELECT id FROM crops WHERE name = 'Areca Nut'), 'Leaf Spot', 'पत्ती धब्बा', 'ಎಲೆ ಲೋಪ', 'Pestalotiora areae', 'पेस्टालोटिओरा एरिया', 'ಪೆಸ್ತಾಲೋಟಿಓರಾ ಅರಿಯಾ', 'Low'),
((SELECT id FROM crops WHERE name = 'Areca Nut'), 'Root Wilt', 'जड़ मुरझान', 'ಬೇರಿನ ಶೀರ್ಣತೆ', 'Phytoplasma sp.', 'फाइटोप्लाज्मा एसपी', 'ಫೈಟೋಪ್ಲಾಜ್ಮಾ ಎಸ್ಪಿ', 'High'),
((SELECT id FROM crops WHERE name = 'Areca Nut'), 'Yellow Leaf Disease', 'पीली पत्ती रोग', 'ಹೀಗೆ ಎಲೆ ರೋಗ', 'Viral infection', 'वायरल संक्रमण', 'ವೈರಸ್ ಸೋಂಕು', 'Medium');

-- Insert Treatments for Coffee Leaf Rust
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Leaf Rust' AND crop_id = (SELECT id FROM crops WHERE name = 'Coffee')),
 'Copper Fungicide (Bordeaux Mixture)',
 'Neem Oil (3%)',
 '2ml per litre of water',
 'Spray on leaves',
 'Every 7 days for 3 weeks',
 'पत्तियों पर छिड़काव करें',
 'ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Coffee Berry Disease
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Berry Disease' AND crop_id = (SELECT id FROM crops WHERE name = 'Coffee')),
 'Mancozeb 75% WP',
 'Sulfur Dust',
 '2.5g per litre',
 'Spray on affected berries',
 'Every 10 days',
 'प्रभावित जामुन पर छिड़काव करें',
 'ಪ್ರಭಾವಿತ ಬೆರಿಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Coffee Root Rot
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Root Rot' AND crop_id = (SELECT id FROM crops WHERE name = 'Coffee')),
 'Metalaxyl 8% + Mancozeb 64%',
 'Trichoderma harzianum',
 '2.5ml per litre',
 'Soil drench near root zone',
 'Every 15 days for 2 months',
 'जड़ के पास मिट्टी में डालें',
 'ಬೇರಿನ ಬಳಿ ಮಣ್ಣಿನಲ್ಲಿ ಹಾಕಿ');

-- Insert Treatments for Pepper Leaf Spot
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Leaf Spot' AND crop_id = (SELECT id FROM crops WHERE name = 'Pepper')),
 'Copper Oxychloride 50% WP',
 'Bacillus subtilis',
 '3g per litre',
 'Spray on entire plant',
 'Every 7 days',
 'पूरे पौधे पर छिड़काव',
 'ಸಂಪೂರ್ಣ ಸಸ್ಯದ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Pepper Anthracnose
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Anthracnose' AND crop_id = (SELECT id FROM crops WHERE name = 'Pepper')),
 'Carbendazim 50% WP',
 'Trichoderma viride',
 '1g per litre',
 'Spray on leaves and fruits',
 'Every 10 days',
 'पत्तियों और फलों पर छिड़काव',
 'ಎಲೆ ಮತ್ತು ಹಣ್ಣುಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Pepper Phytophthora Blight
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Phytophthora Blight' AND crop_id = (SELECT id FROM crops WHERE name = 'Pepper')),
 'Metalaxyl + Mancozeb',
 'Potassium Phosphite',
 '2.5ml per litre',
 'Spray entire plant and soil',
 'Every 7 days for 2 weeks',
 'पौधे और मिट्टी पर छिड़काव',
 'ಸಸ್ಯ ಮತ್ತು ಮಣ್ಣಿನ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Sugarcane Red Rot
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Red Rot' AND crop_id = (SELECT id FROM crops WHERE name = 'Sugarcane')),
 'Hot Water Treatment + Fungicide',
 'Bacillus subtilis',
 '50°C for 30 minutes (seeds)',
 'Seed treatment',
 'Before planting',
 'रोपण से पहले बीज उपचार',
 'ನೆಟ್ಟುವ ಮೊದಲು ಬೀಜ ಚಿಕಿತ್ಸೆ');

-- Insert Treatments for Sugarcane Wilt Disease
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Wilt Disease' AND crop_id = (SELECT id FROM crops WHERE name = 'Sugarcane')),
 'Streptomycin 90% + Tetracycline 10%',
 'Pseudomonas fluorescens',
 '1g per litre',
 'Soil application',
 'At planting and 60 days after',
 'रोपण के समय और 60 दिन बाद',
 'ನೆಟ್ಟುವ ಸಮಯ ಮತ್ತು 60 ದಿನ ನಂತರ');

-- Insert Treatments for Sugarcane Smut Disease
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Smut Disease' AND crop_id = (SELECT id FROM crops WHERE name = 'Sugarcane')),
 'Hot Water Treatment',
 'Resistant Varieties',
 '50-52°C for 20-30 minutes',
 'Seed treatment',
 'Before planting',
 'रोपण से पहले',
 'ನೆಟ್ಟುವ ಮೊದಲು');

-- Insert Treatments for Areca Nut Leaf Spot
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Leaf Spot' AND crop_id = (SELECT id FROM crops WHERE name = 'Areca Nut')),
 'Copper Fungicide',
 'Neem Oil',
 '2.5g per litre',
 'Spray on leaves',
 'Every 15 days',
 'पत्तियों पर छिड़काव',
 'ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ');

-- Insert Treatments for Areca Nut Root Wilt
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Root Wilt' AND crop_id = (SELECT id FROM crops WHERE name = 'Areca Nut')),
 'Tetracycline 10% + Streptomycin 10%',
 'Organic Manure (Neem)',
 '100g per plant',
 'Soil application',
 'Once a month',
 'महीने में एक बार',
 'ತಿಂಗಳಿಗೆ ಒಮ್ಮೆ');

-- Insert Treatments for Areca Nut Yellow Leaf Disease
INSERT INTO treatments (disease_id, pesticide_name, organic_option, dosage, method, frequency, method_hi, method_kn)
VALUES
((SELECT id FROM diseases WHERE name = 'Yellow Leaf Disease' AND crop_id = (SELECT id FROM crops WHERE name = 'Areca Nut')),
 'Vector Control using Insecticide',
 'Neem Oil Spray',
 '3% concentration',
 'Spray on entire plant',
 'Every 10 days for 3 weeks',
 'प्रत्येक 10 दिन में',
 'ಪ್ರತಿ 10 ದಿನಿಗೆ');

-- Insert Agri Stores
INSERT INTO agri_stores (name, contact, location, district) VALUES
('Krishak Kranti Stores', '9876543210', 'Chikmagalur Town', 'Chikmagalur'),
('Green Valley Agro Shop', '9898765432', 'Hassan Road', 'Hassan'),
('Karnataka Krishak Sangh', '9988776655', 'Mangaluru', 'Dakshina Kannada'),
('Organic Farmers Co-operative', '9765432198', 'Coorg', 'Kodagu'),
('Plantation Supplies Hub', '9845123456', 'Shimoga', 'Shimoga'),
('Sustainable Farming Centre', '9876123456', 'Belgaum', 'Belagavi'),
('Coffee Farmers Association', '9754321098', 'Sakleshpur', 'Hassan'),
('Spice Traders Cooperative', '9812345678', 'Belagavi Road', 'Belagavi');

-- Insert Experts
INSERT INTO experts (name, designation, phone, district, message, message_hi, message_kn) VALUES
('Dr. Ramesh Kumar', 'Senior Agronomist, Coffee Specialist', '9876543210', 'Chikmagalur', 'Expert in coffee pest management and disease control', 'कॉफी कीट प्रबंधन और रोग नियंत्रण में विशेषज्ञ', 'ಕಾಫಿ ಕೀಟ ನಿರ್ವಹಣೆ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣದಲ್ಲಿ ವಿಶೇಷಜ್ಞ'),
('Ms. Priya Singh', 'Spice Crop Specialist', '9988765432', 'Hassan', 'Specializes in pepper and spice diseases', 'मिर्च और मसाला रोगों में विशेषज्ञ', 'ಮಿರಿಚಿ ಮತ್ತು ಬಿಡಿ ರೋಗಗಳಲ್ಲಿ ವಿಶೇಷಜ್ಞ'),
('Shri Suresh Reddy', 'Sugarcane Disease Control Expert', '9765432198', 'Belgaum', 'Over 15 years of experience in sugarcane cultivation', 'गन्ना की खेती में 15 साल का अनुभव', 'ಸಕ್ಕರೆ ಬೆಳೆ 15 ವರ್ಷಗಳ ಅನುಭವ'),
('Dr. Anita Patel', 'Plant Pathologist, Areca Specialist', '9845123456', 'Kodagu', 'Plant disease identification and management', 'पौधे के रोग की पहचान और प्रबंधन', 'ಸಸ್ಯ ರೋಗ ಗುರುತುಬೆಳ್ಳಕ ಮತ್ತು ನಿರ್ವಹಣೆ'),
('Shri K. Madhavan', 'Cooperative Farming Advisor', '9812345678', 'Mangaluru', 'Promotes sustainable and organic farming practices', 'टिकाऊ और जैविक खेती विधियों को बढ़ावा देते हैं', 'ಟೆಕೆಯುವ ಮತ್ತು ಜೈವ ಕೃಷಿ ಪ್ರಥೆಗಳನ್ನು ಮೊರೆ ನೀಡುತ್ತಾರೆ');

-- Insert Preventive Tips for Coffee
INSERT INTO preventive_tips (crop_id, tip_en, tip_hi, tip_kn, season) VALUES
((SELECT id FROM crops WHERE name = 'Coffee'),
 'Prune coffee plants regularly to ensure good air circulation and reduce fungal infections',
 'कॉफी के पौधों को नियमित रूप से काटें और ट्रिम करें ताकि अच्छा हवा का संचार हो',
 'ಕಾಫಿ ಸಸ್ಯಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಕತ್ತರಿಸುವುದು ಮತ್ತು ಟ್ರಿಮ್ ಮಾಡುವುದು',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Coffee'),
 'Apply Bordeaux mixture before monsoon season starts to prevent leaf rust',
 'मानसून शुरू होने से पहले बॉर्डो मिश्रण लगाएं',
 'ಮಾನ್ಸೂನ್ ಆರಂಭವಾಗುವ ಮುಂದೆ ಬೋರ್ಡಿಕ್ಸ್ ಮಿಶ್ರಣ ಅನ್ವಯ ಮಾಡಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Coffee'),
 'Ensure proper drainage and avoid waterlogging during heavy rains',
 'भारी बारिश के दौरान उचित जल निकासी सुनिश्चित करें',
 'ಭಾರವಾದ ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಸರಿಯಾದ ಡ್ರೇನೇಜ್ ಖಚಿತ ಪಡಿಸಿ',
 'Monsoon'),
((SELECT id FROM crops WHERE name = 'Coffee'),
 'Remove shade trees partially to reduce humidity and fungal growth',
 'आर्द्रता और कवक वृद्धि को कम करने के लिए छाया के पेड़ों को आंशिक रूप से हटाएं',
 'ತೇವತೆ ಮತ್ತು ಸಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆ ಕಡಿಮೆ ಮಾಡಲು ಛಾಯೆ ಮರಗಳನ್ನು ಭಾಗಶಃ ತೆಗೆದುಹಾಕಿ',
 'Post-Monsoon');

-- Insert Preventive Tips for Pepper
INSERT INTO preventive_tips (crop_id, tip_en, tip_hi, tip_kn, season) VALUES
((SELECT id FROM crops WHERE name = 'Pepper'),
 'Use disease-resistant pepper varieties to minimize disease outbreak risk',
 'रोग प्रतिरोधी मिर्च की किस्मों का उपयोग करें',
 'ರೋಗ-ನಿರೋಧಕ ಮೆಣ್ಸುಗಳ ಪ್ರಜಾತಿಗಳನ್ನು ಬಳಸಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Pepper'),
 'Maintain proper crop spacing to ensure adequate light and air circulation',
 'उचित प्रकाश और हवा के संचार के लिए फसलों के बीच उचित दूरी बनाएं',
 'ಫಸಲ್ ಸರಿಯಾದ ಮಧ್ಯಂತರ ನಿರ್ವಹಿಸಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Pepper'),
 'Avoid overhead watering; use drip irrigation to prevent leaf wetness',
 'ओवरहेड छिड़काव से बचें; पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई का उपयोग करें',
 'ಇಮೆಟರ್ಸ್ ಛಿಂದಿತ ಸಾಕಷ್ಟಣ ಖಿನ್ನತೆಯಿಂದ ಪರಿಚರ್ಯೆ ಮಾಡಿ',
 'Monsoon'),
((SELECT id FROM crops WHERE name = 'Pepper'),
 'Remove infected plant parts immediately to prevent disease spread',
 'संक्रमित पौधे के हिस्सों को तुरंत हटा दें',
 'ಸೋಂಕಿತ ಸಸ್ಯ ಭಾಗಗಳನ್ನು ತಕ್ಷಣವೇ ತೆಗೆದುಹಾಕಿ',
 'Monsoon');

-- Insert Preventive Tips for Sugarcane
INSERT INTO preventive_tips (crop_id, tip_en, tip_hi, tip_kn, season) VALUES
((SELECT id FROM crops WHERE name = 'Sugarcane'),
 'Always use healthy, certified seed cane to avoid disease transmission',
 'स्वस्थ, प्रमाणित बीज गन्ना हमेशा का उपयोग करें',
 'ಆರೋಗ್ಯಕರ, ಪ್ರಮಾಣಪತ್ರ ಬೀಜ ಗನ್ನೆ ಯಾವಾಗಲೂ ಬಳಸಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Sugarcane'),
 'Treat seeds with fungicide before planting',
 'रोपण से पहले बीजों को कवकनाशी से उपचारित करें',
 'ನೆಟ್ಟುವ ಮೊದಲು ಬೀಜಗಳನ್ನು ಶಿಲೀಂಧ್ರನಾಶಕದೊಂದಿಗೆ ಚಿಕಿತ್ಸೆ ಮಾಡಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Sugarcane'),
 'Maintain crop rotation to break disease cycle and improve soil health',
 'बीमारी के चक्र को तोड़ने और मिट्टी के स्वास्थ्य में सुधार के लिए फसल चक्र बनाए रखें',
 'Post-Monsoon'),
((SELECT id FROM crops WHERE name = 'Sugarcane'),
 'Ensure proper irrigation during early crop growth stages',
 'प्रारंभिक फसल विकास के दौरान उचित सिंचाई सुनिश्चित करें',
 'Summer');

-- Insert Preventive Tips for Areca Nut
INSERT INTO preventive_tips (crop_id, tip_en, tip_hi, tip_kn, season) VALUES
((SELECT id FROM crops WHERE name = 'Areca Nut'),
 'Plant areca nut with shade trees to prevent waterlogging and excessive heat',
 'जलभराव और अत्यधिक गर्मी से बचाने के लिए छाया वाले पेड़ों के साथ सुपारी लगाएं',
 'ನೀರಿನ ಸಂಚಯ ಮತ್ತು ಅತಿರಿಕ್ತ ಶಾಖದಿಂದ ರಕ್ಷಿಸಲು ಛಾಯೆ ವೃಕ್ಷಗಳೊಂದಿಗೆ ಸುಪಾರಿ ನೆಟ್ಟಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Areca Nut'),
 'Monitor for early signs of root wilt disease and use treated seeds',
 'मूल विल्ट रोग के शुरुआती संकेतों की निगरानी करें',
 'ಮೂಲ ವಿಲ್ಟ್ ರೋಗದ ಆರಂಭಿಕ ಚಿಹ್ನೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
 'Pre-Monsoon'),
((SELECT id FROM crops WHERE name = 'Areca Nut'),
 'Apply organic mulch to retain soil moisture and prevent fungal diseases',
 'मिट्टी की नमी बनाए रखने और कवक रोगों को रोकने के लिए जैविक मल्च लगाएं',
 'ಮಣ್ಣಿನ ಆರ್ದ್ರತೆ ಧರಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ತಡೆಯಲು ಜೈವಿಕ ಬೆಲೆಸಿ ಅನ್ವಯ ಮಾಡಿ',
 'Monsoon'),
((SELECT id FROM crops WHERE name = 'Areca Nut'),
 'Remove diseased plants immediately and sanitize garden tools',
 'रोगग्रस्त पौधों को तुरंत हटा दें',
 'ರೋಗಾಕ್ರಾಂತ ಸಸ್ಯಗಳನ್ನು ತಕ್ಷಣವೇ ತೆಗೆದುಹಾಕಿ',
 'Post-Monsoon');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_crops_name ON crops(name);
CREATE INDEX IF NOT EXISTS idx_diseases_crop_id ON diseases(crop_id);
CREATE INDEX IF NOT EXISTS idx_treatments_disease_id ON treatments(disease_id);
CREATE INDEX IF NOT EXISTS idx_detection_logs_crop_id ON detection_logs(crop_id);
CREATE INDEX IF NOT EXISTS idx_agri_stores_district ON agri_stores(district);
CREATE INDEX IF NOT EXISTS idx_experts_district ON experts(district);
CREATE INDEX IF NOT EXISTS idx_preventive_tips_crop_id ON preventive_tips(crop_id);

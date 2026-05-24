// Fallback disease data for offline/demo mode
// Used when Plant.id API returns low confidence or fails

export const fallbackDiseaseData = {
  'Coffee': {
    'Leaf Rust': {
      id: 1,
      name: 'Leaf Rust',
      name_hi: 'पत्ती में जंग',
      name_kn: 'ಎಲೆ ತುಪ್ಪ',
      cause: 'Fungal infection caused by Hemileia vastatrix',
      cause_hi: 'हेमिलिया वास्टाट्रिक्स द्वारा कवक संक्रमण',
      cause_kn: 'ಹೆಮಿಲಿಯಾ ವಾಸ್ತಾಟ್ರಿಕ್ಸ್ ಕಾರಣವಾದ ಶಿಲೀಂಧ್ರ ಸೋಂಕು',
      severity: 'High',
      treatment: {
        pesticide_name: 'Copper Fungicide (Bordeaux Mixture)',
        organic_option: 'Neem Oil (3%)',
        dosage: '2ml per litre of water',
        method: 'Spray on leaves',
        frequency: 'Every 7 days for 3 weeks',
        method_hi: 'पत्तियों पर छिड़काव करें',
        method_kn: 'ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ',
      },
    },
  },
  'Pepper': {
    'Leaf Spot': {
      id: 2,
      name: 'Leaf Spot',
      name_hi: 'पत्ती धब्बा',
      name_kn: 'ಎಲೆ ಲೋಪ',
      cause: 'Xanthomonas campestris pv. vesicatoria',
      cause_hi: 'जैंथोमोनास कैंपेस्ट्रिस पीवी वेसिकेटोरिया',
      cause_kn: 'ಜ್ಯಾಂಥೋಮೋನಾಸ್ ಕ್ಯಾಂಪೆಸ್ಟ್ರಿಸ್ ಪೀವಿ ವೆಸಿಕೇಟೋರಿಯಾ',
      severity: 'Medium',
      treatment: {
        pesticide_name: 'Copper Oxychloride 50% WP',
        organic_option: 'Bacillus subtilis',
        dosage: '3g per litre',
        method: 'Spray on entire plant',
        frequency: 'Every 7 days',
        method_hi: 'पूरे पौधे पर छिड़काव',
        method_kn: 'ಸಂಪೂರ್ಣ ಸಸ್ಯದ ಮೇಲೆ ಸಿಂಪಡಿಸಿ',
      },
    },
  },
  'Sugarcane': {
    'Red Rot': {
      id: 3,
      name: 'Red Rot',
      name_hi: 'लाल सड़न',
      name_kn: 'ಕೆಂಪು ಕೆಣೆ',
      cause: 'Glomerella tucumanensis',
      cause_hi: 'ग्लोमेरेला टुकुमेनेंसिस',
      cause_kn: 'ಗ್ಲೋಮೆರೆಲ್ಲಾ ಟುಕುಮೆನೆನ್ಸಿಸ್',
      severity: 'High',
      treatment: {
        pesticide_name: 'Hot Water Treatment + Fungicide',
        organic_option: 'Bacillus subtilis',
        dosage: '50°C for 30 minutes (seeds)',
        method: 'Seed treatment',
        frequency: 'Before planting',
        method_hi: 'रोपण से पहले बीज उपचार',
        method_kn: 'ನೆಟ್ಟುವ ಮೊದಲು ಬೀಜ ಚಿಕಿತ್ಸೆ',
      },
    },
  },
  'Areca Nut': {
    'Root Wilt': {
      id: 4,
      name: 'Root Wilt',
      name_hi: 'जड़ मुरझान',
      name_kn: 'ಬೇರಿನ ಶೀರ್ಣತೆ',
      cause: 'Phytoplasma sp.',
      cause_hi: 'फाइटोप्लाज्मा एसपी',
      cause_kn: 'ಫೈಟೋಪ್ಲಾಜ್ಮಾ ಎಸ್ಪಿ',
      severity: 'High',
      treatment: {
        pesticide_name: 'Tetracycline 10% + Streptomycin 10%',
        organic_option: 'Organic Manure (Neem)',
        dosage: '100g per plant',
        method: 'Soil application',
        frequency: 'Once a month',
        method_hi: 'महीने में एक बार',
        method_kn: 'ತಿಂಗಳಿಗೆ ಒಮ್ಮೆ',
      },
    },
  },
};

export default fallbackDiseaseData;

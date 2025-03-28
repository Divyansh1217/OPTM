
import { Biomarker } from '@/data/mockBiomarkerData';

// Types for the biomarker values
type BiomarkerStatus = 'normal' | 'elevated' | 'low' | 'critical';

interface BiomarkerValue {
  value: number;
  unit: string;
  normalRange: string;
  status: BiomarkerStatus;
  percentage: number;
  description: string;
  possibleCauses?: string[];
  recommendations?: string[];
}

interface BiomarkerValues {
  [key: string]: BiomarkerValue;
}

// Enhanced sample values for different biomarker types with comprehensive health information
const biomarkerValues: BiomarkerValues = {
  'Vitamin D': { 
    value: 28, 
    unit: 'ng/mL', 
    normalRange: '30-50', 
    status: 'low', 
    percentage: 56,
    description: 'Vitamin D helps your body absorb calcium and is essential for bone health, immune function, and reducing inflammation.',
    possibleCauses: [
      'Limited sun exposure',
      'Dark skin pigmentation',
      'Malabsorption disorders (Crohn\'s, celiac)',
      'Obesity'
    ],
    recommendations: [
      'Consider vitamin D supplementation (1000-2000 IU daily)',
      'Increase sun exposure (15-30 minutes daily)',
      'Consume vitamin D-rich foods (fatty fish, fortified milk, egg yolks)'
    ]
  },
  'Cholesterol': { 
    value: 195, 
    unit: 'mg/dL', 
    normalRange: '125-200', 
    status: 'normal', 
    percentage: 78,
    description: 'Total cholesterol is a measure of all cholesterol in your blood. Mainly composed of HDL (good) and LDL (bad) cholesterol.',
    possibleCauses: [
      'Diet high in saturated fats',
      'Sedentary lifestyle',
      'Genetic factors',
      'Obesity'
    ],
    recommendations: [
      'Maintain a heart-healthy diet',
      'Regular exercise (150+ minutes weekly)',
      'Limit alcohol consumption',
      'Follow up with cholesterol panel annually'
    ]
  },
  'Glucose': { 
    value: 110, 
    unit: 'mg/dL', 
    normalRange: '70-99', 
    status: 'elevated', 
    percentage: 65,
    description: 'Blood glucose (sugar) is your body\'s main source of energy. Elevated levels may indicate prediabetes or diabetes.',
    possibleCauses: [
      'Insulin resistance',
      'Diet high in simple carbohydrates',
      'Lack of physical activity',
      'Family history of diabetes'
    ],
    recommendations: [
      'Reduce refined carbohydrate intake',
      'Increase physical activity',
      'Maintain healthy weight',
      'Follow up with HbA1c testing'
    ]
  },
  'Iron': { 
    value: 80, 
    unit: 'μg/dL', 
    normalRange: '60-170', 
    status: 'normal', 
    percentage: 82,
    description: 'Iron is necessary for producing hemoglobin, which helps red blood cells deliver oxygen throughout your body.',
    possibleCauses: [
      'Low iron diet (for deficiency)',
      'Blood loss (menstruation, GI bleeding)',
      'Absorption issues',
      'Genetic conditions (for excess)'
    ],
    recommendations: [
      'Maintain balanced diet with iron-rich foods',
      'Pair iron-rich foods with vitamin C for better absorption',
      'Regular monitoring if prone to deficiency or excess'
    ]
  },
  'Hemoglobin A1C': { 
    value: 5.9, 
    unit: '%', 
    normalRange: '4.0-5.6', 
    status: 'elevated', 
    percentage: 62,
    description: 'HbA1C measures your average blood sugar level over the past 2-3 months, used to diagnose and monitor diabetes.',
    possibleCauses: [
      'Prediabetes',
      'Type 2 diabetes',
      'Insulin resistance',
      'Metabolic syndrome'
    ],
    recommendations: [
      'Regular monitoring every 3-6 months',
      'Work with healthcare provider on lifestyle modifications',
      'Consider dietary changes (low glycemic index foods)',
      'Increase physical activity (30+ minutes daily)'
    ]
  },
  'Vitamin B12': { 
    value: 220, 
    unit: 'pg/mL', 
    normalRange: '200-900', 
    status: 'low', 
    percentage: 45,
    description: 'Vitamin B12 is essential for nerve function, DNA production, and the formation of red blood cells.',
    possibleCauses: [
      'Vegetarian/vegan diet',
      'Pernicious anemia',
      'Malabsorption disorders',
      'Medications (metformin, PPIs)'
    ],
    recommendations: [
      'Consider B12 supplementation (oral or injection)',
      'Increase consumption of B12-rich foods (meat, fish, dairy)',
      'Consider fortified foods if vegetarian/vegan',
      'Retest in 3 months after intervention'
    ]
  },
  'Thyroid Stimulating Hormone': { 
    value: 4.8, 
    unit: 'mIU/L', 
    normalRange: '0.4-4.0', 
    status: 'elevated', 
    percentage: 58,
    description: 'TSH controls the production of thyroid hormones. Elevated levels may indicate an underactive thyroid (hypothyroidism).',
    possibleCauses: [
      'Hashimoto\'s thyroiditis',
      'Iodine deficiency',
      'Radiation therapy to the neck',
      'Certain medications'
    ],
    recommendations: [
      'Follow up with additional thyroid tests (T3, T4)',
      'Consider thyroid hormone replacement if confirmed',
      'Monitor regularly with thyroid panel',
      'Discuss symptoms with healthcare provider'
    ]
  },
  'Ferritin': { 
    value: 15, 
    unit: 'ng/mL', 
    normalRange: '20-250', 
    status: 'low', 
    percentage: 40,
    description: 'Ferritin is a blood protein that contains iron. Low levels can indicate iron deficiency.',
    possibleCauses: [
      'Blood loss (menstruation, GI bleeding)',
      'Poor iron absorption',
      'Inadequate dietary iron intake',
      'Pregnancy'
    ],
    recommendations: [
      'Iron supplementation (consult provider for dosage)',
      'Increase dietary iron (red meat, spinach, beans)',
      'Pair iron-rich foods with vitamin C',
      'Follow up testing in 3 months'
    ]
  },
  'C-Reactive Protein': { 
    value: 4.2, 
    unit: 'mg/L', 
    normalRange: '0.0-3.0', 
    status: 'elevated', 
    percentage: 52,
    description: 'CRP is a marker of inflammation in the body. Elevated levels may indicate infection or chronic inflammation.',
    possibleCauses: [
      'Acute infection',
      'Chronic inflammatory conditions',
      'Autoimmune disorders',
      'Cardiovascular disease risk'
    ],
    recommendations: [
      'Identify and treat underlying cause',
      'Consider anti-inflammatory diet',
      'Regular exercise',
      'Follow up testing after treatment'
    ]
  },
  'HDL Cholesterol': { 
    value: 62, 
    unit: 'mg/dL', 
    normalRange: '40-60', 
    status: 'normal', 
    percentage: 88,
    description: 'HDL (good) cholesterol helps remove other forms of cholesterol from your bloodstream. Higher levels are better.',
    possibleCauses: [
      'Genetic factors',
      'Regular exercise',
      'Healthy diet high in omega-3s',
      'Moderate alcohol consumption'
    ],
    recommendations: [
      'Continue regular physical activity',
      'Maintain heart-healthy diet',
      'Avoid smoking',
      'Maintain regular cholesterol screening'
    ]
  },
  'LDL Cholesterol': { 
    value: 128, 
    unit: 'mg/dL', 
    normalRange: '0-99', 
    status: 'elevated', 
    percentage: 54,
    description: 'LDL (bad) cholesterol can build up in your arteries, increasing your risk of heart disease and stroke.',
    possibleCauses: [
      'Diet high in saturated and trans fats',
      'Sedentary lifestyle',
      'Genetic factors',
      'Type 2 diabetes'
    ],
    recommendations: [
      'Reduce saturated fat intake',
      'Increase soluble fiber consumption',
      'Regular exercise (150+ minutes weekly)',
      'Consider medication if lifestyle changes insufficient'
    ]
  },
  'Triglycerides': { 
    value: 180, 
    unit: 'mg/dL', 
    normalRange: '0-149', 
    status: 'elevated', 
    percentage: 60,
    description: 'Triglycerides are a type of fat in your blood. Elevated levels may increase your risk of heart disease.',
    possibleCauses: [
      'Diet high in refined carbohydrates and sugars',
      'Excess alcohol consumption',
      'Obesity',
      'Genetic factors'
    ],
    recommendations: [
      'Limit added sugars and refined carbohydrates',
      'Limit alcohol consumption',
      'Increase physical activity',
      'Consider omega-3 fatty acid supplements'
    ]
  },
  'Blood Pressure': {
    value: 142, 
    unit: 'mmHg', 
    normalRange: '90-120', 
    status: 'elevated', 
    percentage: 65,
    description: 'Systolic blood pressure measures the pressure in your arteries when your heart beats. Elevated levels increase risk of heart disease and stroke.',
    possibleCauses: [
      'High sodium intake',
      'Lack of physical activity',
      'Stress',
      'Genetics'
    ],
    recommendations: [
      'Reduce sodium intake to less than 2300mg daily',
      'Regular physical activity (30+ minutes most days)',
      'DASH diet (rich in fruits, vegetables, whole grains)',
      'Stress management techniques'
    ]
  },
  'Vitamin B6': {
    value: 3.2,
    unit: 'ng/mL',
    normalRange: '5.0-24.0',
    status: 'low',
    percentage: 48,
    description: 'Vitamin B6 is essential for brain development and function, and helps the body make hormones and brain chemicals (neurotransmitters).',
    possibleCauses: [
      'Poor dietary intake',
      'Kidney disease',
      'Autoimmune disorders',
      'Certain medications (isoniazid, cycloserine)'
    ],
    recommendations: [
      'Increase B6-rich foods (poultry, fish, potatoes, bananas)',
      'Consider B6 supplementation',
      'Monitor medication interactions',
      'Retest in 3 months after intervention'
    ]
  }
};

// Helper function to intelligently determine biomarker type from filename
const determineBiomarkerFromFileName = (fileName?: string): string => {
  if (!fileName) {
    // If no filename, return a random biomarker
    const biomarkerTypes = Object.keys(biomarkerValues);
    return biomarkerTypes[Math.floor(Math.random() * biomarkerTypes.length)];
  }
  
  // Convert filename to lowercase for easier matching
  const lowerFileName = fileName.toLowerCase();
  
  // Try to match filename with specific biomarker types
  if (lowerFileName.includes('vitamin d') || lowerFileName.includes('vit d')) {
    return 'Vitamin D';
  } else if (lowerFileName.includes('chol') || lowerFileName.includes('lipid')) {
    return 'Cholesterol';
  } else if (lowerFileName.includes('glucose') || lowerFileName.includes('blood sugar')) {
    return 'Glucose';
  } else if (lowerFileName.includes('iron') || lowerFileName.includes('fe')) {
    return 'Iron';
  } else if (lowerFileName.includes('a1c') || lowerFileName.includes('hba1c')) {
    return 'Hemoglobin A1C';
  } else if (lowerFileName.includes('b12') || lowerFileName.includes('cobalamin')) {
    return 'Vitamin B12';
  } else if (lowerFileName.includes('tsh') || lowerFileName.includes('thyroid')) {
    return 'Thyroid Stimulating Hormone';
  } else if (lowerFileName.includes('ferritin')) {
    return 'Ferritin';
  } else if (lowerFileName.includes('crp') || lowerFileName.includes('c-reactive')) {
    return 'C-Reactive Protein';
  } else if (lowerFileName.includes('hdl')) {
    return 'HDL Cholesterol';
  } else if (lowerFileName.includes('ldl')) {
    return 'LDL Cholesterol';
  } else if (lowerFileName.includes('triglyceride') || lowerFileName.includes('tg')) {
    return 'Triglycerides';
  } else if (lowerFileName.includes('bp') || lowerFileName.includes('blood pressure')) {
    return 'Blood Pressure';
  } else if (lowerFileName.includes('b6') || lowerFileName.includes('pyridoxine')) {
    return 'Vitamin B6';
  }
  
  // If no specific match is found, return a random biomarker
  const biomarkerTypes = Object.keys(biomarkerValues);
  return biomarkerTypes[Math.floor(Math.random() * biomarkerTypes.length)];
};

// Helper function to determine trend based on biomarker status
const determineTrend = (status: BiomarkerStatus): 'up' | 'down' | 'stable' => {
  if (status === 'normal') {
    // Normal values are more likely to be stable
    const random = Math.random();
    if (random < 0.7) return 'stable';
    return random < 0.85 ? 'up' : 'down';
  } else if (status === 'elevated') {
    // Elevated values are more likely to show an upward trend
    return Math.random() < 0.7 ? 'up' : 'stable';
  } else if (status === 'low') {
    // Low values are more likely to show a downward trend
    return Math.random() < 0.7 ? 'down' : 'stable';
  } else if (status === 'critical') {
    // Critical values have different patterns
    return Math.random() < 0.5 ? 'up' : 'down';
  }
  
  return 'stable';
};

export const generateBiomarker = (fileName?: string): Biomarker => {
  // Intelligently determine biomarker type based on filename
  const biomarkerName = determineBiomarkerFromFileName(fileName);
  
  const selectedBiomarker = biomarkerValues[biomarkerName];
  const trend = determineTrend(selectedBiomarker.status);

  // Create a unique ID using the biomarker name and timestamp
  const uniqueId = `bm-${biomarkerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

  // Add slight variation to values to make them more realistic
  const variationPercentage = (Math.random() * 0.06) - 0.03; // -3% to +3%
  let adjustedValue = selectedBiomarker.value;
  
  // Only apply variation to numeric values
  if (typeof adjustedValue === 'number') {
    adjustedValue = +(adjustedValue * (1 + variationPercentage)).toFixed(1);
  }

  return {
    id: uniqueId,
    name: biomarkerName,
    value: adjustedValue,
    unit: selectedBiomarker.unit,
    normalRange: selectedBiomarker.normalRange,
    status: selectedBiomarker.status,
    timestamp: new Date().toISOString(),
    percentage: selectedBiomarker.percentage,
    trend: trend,
    description: selectedBiomarker.description,
    possibleCauses: selectedBiomarker.possibleCauses,
    recommendations: selectedBiomarker.recommendations
  };
};


import { Biomarker, BiomarkerValue, ExtractedBiomarker } from '@/types/medicalData';

/**
 * Categorizes a biomarker based on its name
 */
export const categorizeBiomarker = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('glucose') || lowerName.includes('a1c') || lowerName.includes('insulin')) {
    return 'Blood Sugar';
  } else if (lowerName.includes('cholesterol') || lowerName.includes('ldl') || lowerName.includes('hdl') || lowerName.includes('triglyceride')) {
    return 'Lipids';
  } else if (lowerName.includes('vitamin')) {
    return 'Vitamins';
  } else if (lowerName.includes('tsh') || lowerName.includes('t3') || lowerName.includes('t4') || lowerName.includes('thyroid')) {
    return 'Thyroid';
  } else if (lowerName.includes('hemoglobin') || lowerName.includes('hematocrit') || lowerName.includes('rbc') || lowerName.includes('wbc') || lowerName.includes('platelet')) {
    return 'Blood Count';
  } else if (lowerName.includes('iron') || lowerName.includes('ferritin')) {
    return 'Iron';
  } else if (lowerName.includes('sodium') || lowerName.includes('potassium') || lowerName.includes('calcium') || lowerName.includes('magnesium')) {
    return 'Electrolytes';
  } else if (lowerName.includes('creatinine') || lowerName.includes('bun') || lowerName.includes('egfr')) {
    return 'Kidney';
  } else if (lowerName.includes('alt') || lowerName.includes('ast') || lowerName.includes('bilirubin') || lowerName.includes('albumin')) {
    return 'Liver';
  } else if (lowerName.includes('pressure') || lowerName.includes('heart') || lowerName.includes('pulse')) {
    return 'Cardiovascular';
  }
  
  return 'Other';
};

/**
 * Returns default description for a biomarker
 */
export const getDefaultDescription = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('glucose')) {
    return 'Blood glucose is the main sugar found in your blood and your body\'s main source of energy.';
  } else if (lowerName.includes('cholesterol')) {
    return 'Cholesterol is a waxy substance found in your blood. Your body needs cholesterol to build healthy cells, but high levels can increase your risk of heart disease.';
  } else if (lowerName.includes('vitamin d')) {
    return 'Vitamin D is essential for strong bones, because it helps the body use calcium from the diet.';
  } else if (lowerName.includes('tsh')) {
    return 'Thyroid Stimulating Hormone (TSH) is produced by the pituitary gland and regulates the production of thyroid hormones.';
  } else if (lowerName.includes('hemoglobin')) {
    return 'Hemoglobin is a protein in your red blood cells that carries oxygen to your body\'s organs and tissues.';
  }
  
  return `${name} is an important biomarker for monitoring health status.`;
};

/**
 * Returns related symptoms for a biomarker
 */
export const getRelatedSymptoms = (name: string): string[] => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('glucose')) {
    return ['Increased thirst', 'Frequent urination', 'Fatigue'];
  } else if (lowerName.includes('cholesterol')) {
    return ['No clear symptoms', 'May contribute to heart disease'];
  } else if (lowerName.includes('vitamin d')) {
    return ['Fatigue', 'Bone pain', 'Muscle weakness'];
  } else if (lowerName.includes('tsh') || lowerName.includes('thyroid')) {
    return ['Fatigue', 'Weight changes', 'Cold intolerance', 'Hair loss'];
  } else if (lowerName.includes('hemoglobin') || lowerName.includes('iron')) {
    return ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'];
  } else if (lowerName.includes('pressure')) {
    return ['Headache', 'Dizziness', 'Blurred vision'];
  } else if (lowerName.includes('creatinine') || lowerName.includes('egfr')) {
    return ['Swelling', 'Fatigue', 'Urination changes'];
  }
  
  return [];
};

/**
 * Returns affected body parts for a biomarker
 */
export const getAffectedBodyParts = (name: string): string[] => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('glucose')) {
    return ['pancreas', 'kidneys', 'blood vessels'];
  } else if (lowerName.includes('cholesterol') || lowerName.includes('ldl') || lowerName.includes('hdl')) {
    return ['heart', 'blood vessels', 'liver'];
  } else if (lowerName.includes('vitamin d')) {
    return ['bones', 'muscles'];
  } else if (lowerName.includes('tsh') || lowerName.includes('thyroid')) {
    return ['thyroid', 'brain'];
  } else if (lowerName.includes('hemoglobin') || lowerName.includes('iron')) {
    return ['blood', 'bone marrow'];
  } else if (lowerName.includes('pressure')) {
    return ['heart', 'blood vessels', 'kidneys'];
  } else if (lowerName.includes('creatinine') || lowerName.includes('egfr')) {
    return ['kidneys'];
  } else if (lowerName.includes('alt') || lowerName.includes('ast') || lowerName.includes('bilirubin')) {
    return ['liver'];
  }
  
  return [];
};

/**
 * Returns default recommendations for a biomarker
 */
export const getDefaultRecommendations = (name: string, status: string): string[] => {
  const lowerName = name.toLowerCase();
  
  if (status === 'normal') {
    return ['Continue current health practices', 'Regular monitoring at standard intervals'];
  }
  
  if (lowerName.includes('glucose') && status !== 'normal') {
    return [
      'Monitor diet and limit simple carbohydrates',
      'Regular physical activity',
      'Consider consulting with endocrinologist',
      'Regular glucose monitoring'
    ];
  } else if ((lowerName.includes('cholesterol') || lowerName.includes('ldl')) && status === 'elevated') {
    return [
      'Heart-healthy diet low in saturated fats',
      'Regular exercise',
      'Consider medication if levels remain high',
      'Follow up testing in 3-6 months'
    ];
  } else if (lowerName.includes('vitamin d') && status === 'low') {
    return [
      'Vitamin D supplementation',
      'Increased sun exposure (15-30 minutes daily)',
      'Dietary sources: fatty fish, egg yolks, fortified milk',
      'Retest levels in 3 months'
    ];
  } else if (lowerName.includes('tsh') && status === 'elevated') {
    return [
      'Consult with endocrinologist',
      'Consider thyroid hormone replacement therapy',
      'Regular thyroid function monitoring',
      'Monitor for symptoms of hypothyroidism'
    ];
  } else if ((lowerName.includes('hemoglobin') || lowerName.includes('iron')) && status === 'low') {
    return [
      'Iron supplementation',
      'Dietary sources: red meat, spinach, beans',
      'Vitamin C to enhance iron absorption',
      'Follow up testing in 3 months'
    ];
  }
  
  return [
    'Consult with healthcare provider',
    'Follow up testing recommended',
    'Monitor for changes in symptoms'
  ];
};

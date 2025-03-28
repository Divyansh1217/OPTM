
import { Biomarker } from '@/data/mockBiomarkerData';

// Biomarker weights for age calculation
interface BiomarkerWeight {
  name: string;
  weight: number;
  isInverse?: boolean; // If true, higher values are better
}

// Weights for common biomarkers
const BIOMARKER_WEIGHTS: BiomarkerWeight[] = [
  { name: 'Hemoglobin', weight: 0.12 },
  { name: 'White Blood Cell Count', weight: 0.10 },
  { name: 'Glucose (Fasting)', weight: 0.15, isInverse: true },
  { name: 'Total Cholesterol', weight: 0.13, isInverse: true },
  { name: 'HDL Cholesterol', weight: 0.14, isInverse: false }, // Higher HDL is better
  { name: 'LDL Cholesterol', weight: 0.14, isInverse: true },
  { name: 'Blood Pressure', weight: 0.12, isInverse: true },
  { name: 'BMI', weight: 0.10, isInverse: true }
];

/**
 * Calculate biological age based on chronological age and biomarker values
 * 
 * @param chronologicalAge The actual age of the person
 * @param biomarkers Array of biomarker data
 * @returns Calculated biological age
 */
export const calculateBiologicalAge = (
  chronologicalAge: number,
  biomarkers: Biomarker[]
): number => {
  // Default modifier based on existing biomarker health
  let ageModifier = 0;
  
  // Sum of weights used to normalize the calculation
  let totalWeightApplied = 0;
  
  // Process each biomarker
  biomarkers.forEach(biomarker => {
    // Find the weight configuration for this biomarker
    const weightConfig = BIOMARKER_WEIGHTS.find(w => 
      biomarker.name.toLowerCase().includes(w.name.toLowerCase())
    );
    
    if (!weightConfig) return; // Skip if no weight defined
    
    // Determine how much this biomarker impacts age
    let impact = 0;
    let statusValue = 0;
    
    // Convert status to a numeric value
    switch (biomarker.status) {
      case 'normal':
        statusValue = 0; // No impact
        break;
      case 'elevated':
        statusValue = weightConfig.isInverse ? 1 : -1; // Bad if elevated and inverse
        break;
      case 'low':
        statusValue = weightConfig.isInverse ? -1 : 1; // Bad if low and not inverse
        break;
      case 'critical':
        statusValue = 2 * (weightConfig.isInverse ? 1 : -1); // Double impact for critical
        break;
    }
    
    // Calculate impact based on status and weight
    impact = statusValue * weightConfig.weight * 5; // 5-year maximum impact per biomarker
    ageModifier += impact;
    totalWeightApplied += Math.abs(weightConfig.weight);
  });
  
  // If we have analyzed biomarkers, normalize the modifier
  if (totalWeightApplied > 0) {
    // Normalize to ensure biomarkers have reasonable impact
    ageModifier = ageModifier * (BIOMARKER_WEIGHTS.reduce((sum, w) => sum + w.weight, 0) / totalWeightApplied);
  }
  
  // Calculate biological age by adjusting chronological age
  const biologicalAge = Math.max(18, Math.round(chronologicalAge + ageModifier));
  
  return biologicalAge;
};

/**
 * Provides analysis of the relationship between chronological and biological age
 */
export const getBiologicalAgeAnalysis = (
  biologicalAge: number, 
  chronologicalAge: number
) => {
  const ageDifference = chronologicalAge - biologicalAge;
  const isYounger = ageDifference > 0;
  
  return {
    difference: Math.abs(ageDifference),
    isYounger,
    status: isYounger ? 'excellent' : ageDifference >= -2 ? 'good' : ageDifference >= -5 ? 'fair' : 'poor',
    message: isYounger 
      ? `Your body is functioning like someone ${Math.abs(ageDifference)} years younger!` 
      : `Your body is functioning like someone ${Math.abs(ageDifference)} years older.`
  };
};

/**
 * Generate recommendations based on biomarker status
 */
export const getBiomarkerRecommendations = (biomarkers: Biomarker[]): string[] => {
  const recommendations: string[] = [];
  
  // Check for problematic biomarkers
  const elevatedBiomarkers = biomarkers.filter(b => b.status === 'elevated' || b.status === 'critical');
  
  elevatedBiomarkers.forEach(biomarker => {
    if (biomarker.name.includes('Glucose')) {
      recommendations.push('Consider reducing sugar intake and consulting with a nutritionist');
    }
    if (biomarker.name.includes('Cholesterol')) {
      recommendations.push('Consider a diet lower in saturated fats and higher in omega-3 fatty acids');
    }
    if (biomarker.name.includes('Blood Pressure')) {
      recommendations.push('Maintain regular physical activity and consider reducing sodium intake');
    }
  });
  
  // Add general recommendations if we have specific ones
  if (recommendations.length > 0) {
    recommendations.push('Consult with your healthcare provider about these biomarker results');
  }
  
  // Add default recommendations if none specific
  if (recommendations.length === 0) {
    recommendations.push('Continue maintaining your current healthy lifestyle');
    recommendations.push('Stay hydrated and maintain regular physical activity');
  }
  
  return recommendations;
};

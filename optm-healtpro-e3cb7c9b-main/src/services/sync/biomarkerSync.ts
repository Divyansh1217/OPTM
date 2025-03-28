
import { 
  Biomarker, 
  BiomarkerValue, 
  ExtractedBiomarker 
} from '@/types/medicalData';

import { 
  categorizeBiomarker, 
  getDefaultDescription, 
  getRelatedSymptoms, 
  getAffectedBodyParts, 
  getDefaultRecommendations 
} from './biomarkerUtils';

/**
 * Synchronizes biomarkers with newly extracted values
 */
export const syncBiomarkers = (
  extractedBiomarkers: ExtractedBiomarker[],
  existingBiomarkers: Biomarker[]
): Biomarker[] => {
  const timestamp = new Date().toISOString();
  const result = [...existingBiomarkers];
  
  // Process each extracted biomarker
  extractedBiomarkers.forEach(extracted => {
    // Try to find matching existing biomarker
    const existingIndex = result.findIndex(
      b => b.name.toLowerCase() === extracted.name.toLowerCase()
    );
    
    const newValue: BiomarkerValue = {
      value: extracted.value,
      unit: extracted.unit,
      normalRange: extracted.normalRange || 'Unknown',
      status: extracted.status || 'normal',
      timestamp,
      trend: 'stable' // Default value, will be updated if historical data exists
    };
    
    if (existingIndex >= 0) {
      // Update existing biomarker
      const existing = result[existingIndex];
      
      // Determine trend
      const previousValue = existing.latestValue.value;
      if (typeof previousValue === 'number' && typeof extracted.value === 'number') {
        newValue.trend = previousValue < extracted.value 
          ? 'increasing' 
          : previousValue > extracted.value 
            ? 'decreasing' 
            : 'stable';
      }
      
      // Update the biomarker
      result[existingIndex] = {
        ...existing,
        latestValue: newValue,
        historicalValues: [newValue, ...existing.historicalValues]
      };
    } else {
      // Create new biomarker
      const newBiomarker: Biomarker = {
        id: `bio-${Date.now()}-${Math.round(Math.random() * 1000)}`,
        name: extracted.name,
        category: categorizeBiomarker(extracted.name),
        description: getDefaultDescription(extracted.name),
        latestValue: newValue,
        historicalValues: [newValue],
        relatedSymptoms: getRelatedSymptoms(extracted.name),
        affectedBodyParts: getAffectedBodyParts(extracted.name),
        recommendations: getDefaultRecommendations(extracted.name, extracted.status || 'normal')
      };
      
      result.push(newBiomarker);
    }
  });
  
  return result;
};

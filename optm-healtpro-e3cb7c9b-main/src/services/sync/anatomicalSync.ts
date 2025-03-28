
import { 
  Biomarker, 
  AnatomicalMapping 
} from '@/types/medicalData';
import { getDefaultCoordinates } from './anatomicalUtils';

/**
 * Updates anatomical mappings based on biomarker changes
 */
export const syncAnatomicalMappings = (
  biomarkers: Biomarker[],
  existingMappings: AnatomicalMapping[]
): AnatomicalMapping[] => {
  const result = [...existingMappings];
  
  // Find abnormal biomarkers
  const abnormalBiomarkers = biomarkers.filter(
    b => b.latestValue.status !== 'normal'
  );
  
  // Update anatomical mappings
  abnormalBiomarkers.forEach(biomarker => {
    biomarker.affectedBodyParts.forEach(bodyPart => {
      // Check if this body part already has a mapping
      const existingIndex = result.findIndex(
        m => m.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      );
      
      // Calculate severity based on biomarker status (1-10 scale)
      let severity = 4; // Default for 'low'/'elevated'
      if (biomarker.latestValue.status === 'critical') {
        severity = 9;
      }
      
      if (existingIndex >= 0) {
        // Update existing mapping
        result[existingIndex] = {
          ...result[existingIndex],
          severity: Math.max(result[existingIndex].severity, severity),
          // Add this biomarker to affected biomarkers if not already there
          affectedBiomarkers: [
            ...new Set([
              ...result[existingIndex].affectedBiomarkers,
              biomarker.id
            ])
          ]
        };
      } else {
        // Create new anatomical mapping with default coordinates
        const coordinates = getDefaultCoordinates(bodyPart);
        
        const newMapping: AnatomicalMapping = {
          bodyPart,
          coordinates,
          affectedBiomarkers: [biomarker.id],
          severity,
          notes: `Auto-generated based on ${biomarker.name} levels`
        };
        
        result.push(newMapping);
      }
    });
  });
  
  return result;
};

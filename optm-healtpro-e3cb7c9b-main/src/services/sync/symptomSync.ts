
import { 
  Biomarker, 
  SymptomRecord 
} from '@/types/medicalData';

/**
 * Updates symptom records based on biomarker changes
 */
export const syncSymptoms = (
  biomarkers: Biomarker[],
  existingSymptoms: SymptomRecord[]
): SymptomRecord[] => {
  const result = [...existingSymptoms];
  const timestamp = new Date().toISOString();
  
  // Find abnormal biomarkers
  const abnormalBiomarkers = biomarkers.filter(
    b => b.latestValue.status !== 'normal'
  );
  
  // Create or update symptom records for abnormal biomarkers
  abnormalBiomarkers.forEach(biomarker => {
    biomarker.relatedSymptoms.forEach(symptomName => {
      // Check if this symptom already exists
      const existingIndex = result.findIndex(
        s => s.symptomName.toLowerCase() === symptomName.toLowerCase()
      );
      
      // Calculate severity based on biomarker status (1-10 scale)
      let severity = 3; // Default for 'low'/'elevated'
      if (biomarker.latestValue.status === 'critical') {
        severity = 8;
      }
      
      if (existingIndex >= 0) {
        // Update existing symptom
        result[existingIndex] = {
          ...result[existingIndex],
          severity: Math.max(result[existingIndex].severity, severity),
          timestamp,
          // Add this biomarker to related biomarkers if not already there
          relatedBiomarkers: [
            ...new Set([
              ...result[existingIndex].relatedBiomarkers,
              biomarker.id
            ])
          ]
        };
      } else {
        // Create new symptom record
        const newSymptom: SymptomRecord = {
          id: `sym-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          symptomName,
          severity,
          timestamp,
          relatedBiomarkers: [biomarker.id],
          notes: `Auto-generated based on ${biomarker.name} levels`
        };
        
        result.push(newSymptom);
      }
    });
  });
  
  return result;
};

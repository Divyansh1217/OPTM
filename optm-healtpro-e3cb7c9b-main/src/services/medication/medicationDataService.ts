
import { toast } from 'sonner';
import { 
  MedicationWithSummary,
  MedicationImprovementData,
  PatientMedication
} from '@/types/medicationData';
import { getFromLocalStorage, storeInLocalStorage } from '@/services/storage/localStorageService';
import { addSummariesToMedications } from './utils/dataTransformers';

// Load medication data for a patient
export const loadPatientMedicationData = (patientId: string) => {
  try {
    // Get stored medication data
    const medicationsData = getFromLocalStorage('medications') || [];
    const patientMedications = medicationsData.find(
      (data: PatientMedication) => data.patientId === patientId
    );
    
    if (patientMedications) {
      // Calculate summary for each medication
      const medicationsWithSummary = addSummariesToMedications(patientMedications.medications);
      
      return {
        medications: medicationsWithSummary,
        improvements: patientMedications.improvements || []
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error loading medication data:', error);
    throw error;
  }
};

// Save medication data for a patient
export const saveMedicationData = (patientId: string, medications: MedicationWithSummary[], improvements: MedicationImprovementData[]) => {
  try {
    const medicationsData = getFromLocalStorage('medications') || [];
    
    // Update existing patient data or add new patient
    const updatedMedicationsData = medicationsData.some((data: PatientMedication) => data.patientId === patientId)
      ? medicationsData.map((data: PatientMedication) => {
          if (data.patientId === patientId) {
            return {
              ...data,
              medications,
              improvements
            };
          }
          return data;
        })
      : [...medicationsData, { patientId, medications, improvements }];
    
    storeInLocalStorage('medications', updatedMedicationsData);
    return true;
  } catch (error) {
    console.error('Error saving medication data:', error);
    throw error;
  }
};

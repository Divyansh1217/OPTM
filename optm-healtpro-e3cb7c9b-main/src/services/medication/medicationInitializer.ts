
import { v4 as uuidv4 } from 'uuid';
import { 
  Medication, 
  MedicationWithSummary,
  MedicationImprovementData,
  PatientMedication,
  MedicationDose
} from '@/types/medicationData';
import { getFromLocalStorage, storeInLocalStorage } from '@/services/storage/localStorageService';
import { DEFAULT_MEDICATIONS, calculateMedicationSummary } from '@/utils/medicationUtils';
import { addSummariesToMedications } from './utils/dataTransformers';

// Initialize default medications for a new patient
export const initializeDefaultMedications = (patientId: string) => {
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  
  // Create default medication entries
  const defaultMedications: Medication[] = DEFAULT_MEDICATIONS.map(med => {
    const doses: MedicationDose[] = [];
    
    // Generate 7 days of scheduled doses
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() + day);
      
      for (let dose = 0; dose < med.frequency; dose++) {
        // Space doses evenly throughout the day (8am, 2pm, 8pm for 3x daily)
        const hour = 8 + (dose * (12 / med.frequency));
        date.setHours(hour, 0, 0, 0);
        
        doses.push({
          id: uuidv4(),
          medicationId: uuidv4(), // Will be replaced
          timestamp: date.toISOString(),
          status: day === 0 && dose === 0 ? 'taken' : 'scheduled' as 'taken' | 'scheduled'
        });
      }
    }
    
    return {
      id: uuidv4(),
      name: med.name,
      description: med.description,
      frequency: med.frequency,
      startDate,
      doses,
      isActive: true
    };
  });
  
  // Add the IDs to doses
  const medicationsWithIds = defaultMedications.map(med => {
    const doses = med.doses.map(dose => ({
      ...dose,
      medicationId: med.id
    }));
    
    return {
      ...med,
      doses
    };
  });
  
  // Calculate summaries
  const medicationsWithSummary = addSummariesToMedications(medicationsWithIds);
  
  // Generate some sample improvement data
  const improvementData: MedicationImprovementData[] = [];
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() - 6 + day);
    
    improvementData.push({
      date: date.toISOString().split('T')[0],
      adherenceRate: 25 + (day * 10), // Gradually improving adherence
      healthScore: 60 + (day * 5), // Gradually improving health
      symptoms: {
        pain: Math.max(1, 8 - day), // Decreasing pain
        inflammation: Math.max(1, 7 - day), // Decreasing inflammation
        stiffness: Math.max(1, 8 - day * 0.8) // Decreasing stiffness
      }
    });
  }
  
  // Save to storage
  saveMedicationData(patientId, medicationsWithSummary, improvementData);
  
  return {
    medications: medicationsWithSummary,
    improvements: improvementData
  };
};

// Helper function to avoid circular imports
const saveMedicationData = (patientId: string, medications: MedicationWithSummary[], improvements: MedicationImprovementData[]) => {
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

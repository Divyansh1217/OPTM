
import { 
  MedicationWithSummary, 
  MedicationImprovementData 
} from '@/types/medicationData';
import { calculateMedicationSummary } from '@/utils/medicationUtils';

// Transform medication data by adding summary information
export const addSummariesToMedications = (medications: any[]) => {
  return medications.map(med => ({
    ...med,
    summary: calculateMedicationSummary(med)
  }));
};

// Sort improvement data by date
export const sortImprovementDataByDate = (data: MedicationImprovementData[]) => {
  return [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

// Filter medications by active status
export const filterActiveMedications = (medications: MedicationWithSummary[]) => {
  return medications.filter(med => med.isActive);
};


import { 
  MedicationWithSummary,
  MedicationImprovementData
} from '@/types/medicationData';
import { generateImprovementData } from '@/utils/medicationUtils';

// Calculate overall improvement metrics across all medications
export const calculateOverallImprovement = (medications: MedicationWithSummary[]) => {
  return generateImprovementData(medications);
};

// Format date for consistent display
export const formatMedicationDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Check if a dose is scheduled for today
export const isDoseScheduledForToday = (timestamp: string) => {
  const doseDate = new Date(timestamp);
  doseDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return doseDate.getTime() === today.getTime();
};

// Get today's date in ISO format
export const getTodayISODate = () => {
  return new Date().toISOString().split('T')[0];
};


import { 
  MedicationWithSummary,
  MedicationImprovementData
} from '@/types/medicationData';
import { saveMedicationData } from './medicationDataService';
import { calculateOverallImprovement, getTodayISODate } from './utils/medicationUtils';
import { sortImprovementDataByDate } from './utils/dataTransformers';

// Update improvement data based on medication adherence
export const updateImprovementData = (patientId: string, medications: MedicationWithSummary[], existingData: MedicationImprovementData[]) => {
  try {
    // Get today's date
    const today = getTodayISODate();
    
    // Generate new improvement data for today
    const newImprovementData = calculateOverallImprovement(medications);
    
    // Clone the existing data
    const updatedImprovementData = [...existingData];
    
    // Check if we already have data for today
    const todayIndex = updatedImprovementData.findIndex(data => data.date === today);
    
    if (todayIndex >= 0) {
      // Update today's data
      updatedImprovementData[todayIndex] = {
        ...updatedImprovementData[todayIndex],
        ...newImprovementData,
        date: today
      };
    } else {
      // Add new data for today
      updatedImprovementData.push({
        ...newImprovementData,
        date: today
      });
    }
    
    // Sort by date ascending
    const sortedData = sortImprovementDataByDate(updatedImprovementData);
    
    // Save the updated improvement data
    saveMedicationData(patientId, medications, sortedData);
    
    return sortedData;
  } catch (error) {
    console.error('Error updating improvement data:', error);
    throw error;
  }
};

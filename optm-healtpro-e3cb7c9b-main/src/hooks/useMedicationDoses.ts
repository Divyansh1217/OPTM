
import { useCallback } from 'react';
import { toast } from 'sonner';
import { 
  MedicationWithSummary,
  MedicationImprovementData
} from '@/types/medicationData';
import { calculateMedicationSummary } from '@/utils/medicationUtils';
import { 
  saveMedicationData, 
  updateImprovementData 
} from '@/services/medication';

export const useMedicationDoses = (
  patientId: string,
  medications: MedicationWithSummary[],
  improvementData: MedicationImprovementData[],
  setMedications: (medications: MedicationWithSummary[]) => void,
  setImprovementData: (improvementData: MedicationImprovementData[]) => void
) => {
  // Record a dose as taken
  const recordDoseTaken = useCallback(async (medicationId: string, doseId: string) => {
    try {
      const updatedMedications = medications.map(med => {
        if (med.id === medicationId) {
          const updatedDoses = med.doses.map(dose => {
            if (dose.id === doseId) {
              return {
                ...dose,
                status: 'taken' as const,
                timestamp: new Date().toISOString() // Update to current time
              };
            }
            return dose;
          });
          
          return {
            ...med,
            doses: updatedDoses
          };
        }
        return med;
      });
      
      // Recalculate summaries
      const medicationsWithSummary: MedicationWithSummary[] = updatedMedications.map(med => ({
        ...med,
        summary: calculateMedicationSummary({
          ...med,
          doses: med.doses
        })
      }));
      
      // Update local state
      setMedications(medicationsWithSummary);
      
      // Update storage
      saveMedicationData(patientId, medicationsWithSummary, improvementData);
      
      // Update improvement data
      const updatedImprovementData = updateImprovementData(patientId, medicationsWithSummary, improvementData);
      setImprovementData(updatedImprovementData);
      
      toast.success('Medication recorded as taken');
      return true;
    } catch (error) {
      console.error('Error recording medication dose:', error);
      toast.error('Failed to record medication');
      return false;
    }
  }, [medications, patientId, improvementData, setMedications, setImprovementData]);
  
  // Mark a dose as missed
  const recordDoseMissed = useCallback(async (medicationId: string, doseId: string) => {
    try {
      const updatedMedications = medications.map(med => {
        if (med.id === medicationId) {
          const updatedDoses = med.doses.map(dose => {
            if (dose.id === doseId) {
              return {
                ...dose,
                status: 'missed' as const
              };
            }
            return dose;
          });
          
          return {
            ...med,
            doses: updatedDoses
          };
        }
        return med;
      });
      
      // Recalculate summaries
      const medicationsWithSummary: MedicationWithSummary[] = updatedMedications.map(med => ({
        ...med,
        summary: calculateMedicationSummary({
          ...med,
          doses: med.doses
        })
      }));
      
      // Update local state
      setMedications(medicationsWithSummary);
      
      // Update storage
      saveMedicationData(patientId, medicationsWithSummary, improvementData);
      
      toast.success('Medication recorded as missed');
      return true;
    } catch (error) {
      console.error('Error recording medication dose as missed:', error);
      toast.error('Failed to record missed medication');
      return false;
    }
  }, [medications, patientId, improvementData, setMedications, setImprovementData]);
  
  return {
    recordDoseTaken,
    recordDoseMissed
  };
};

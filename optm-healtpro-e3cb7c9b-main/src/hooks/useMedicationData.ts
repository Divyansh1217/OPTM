
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  MedicationWithSummary,
  MedicationImprovementData
} from '@/types/medicationData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  loadPatientMedicationData,
  initializeDefaultMedications
} from '@/services/medication';
import { useMedicationDoses } from './useMedicationDoses';

export const useMedicationData = (patientId?: string) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [medications, setMedications] = useState<MedicationWithSummary[]>([]);
  const [improvementData, setImprovementData] = useState<MedicationImprovementData[]>([]);
  
  // Use current user's ID if no patient ID provided
  const effectivePatientId = patientId || user?.id || 'anonymous';
  
  // Load medication data
  const loadMedicationData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Try to load existing medication data
      const patientData = loadPatientMedicationData(effectivePatientId);
      
      if (patientData) {
        // Use existing data
        setMedications(patientData.medications);
        setImprovementData(patientData.improvements);
      } else {
        // Initialize with default medications
        const defaultData = initializeDefaultMedications(effectivePatientId);
        setMedications(defaultData.medications);
        setImprovementData(defaultData.improvements);
        toast.success('Default medication tracking initialized');
      }
    } catch (error) {
      console.error('Error loading medication data:', error);
      toast.error('Failed to load medication data');
    } finally {
      setIsLoading(false);
    }
  }, [effectivePatientId]);
  
  // Use the medication doses hook
  const { recordDoseTaken, recordDoseMissed } = useMedicationDoses(
    effectivePatientId,
    medications,
    improvementData,
    setMedications,
    setImprovementData
  );
  
  // Load data on mount and when patient ID changes
  useEffect(() => {
    loadMedicationData();
  }, [loadMedicationData]);
  
  return {
    isLoading,
    medications,
    improvementData,
    loadMedicationData,
    recordDoseTaken,
    recordDoseMissed
  };
};

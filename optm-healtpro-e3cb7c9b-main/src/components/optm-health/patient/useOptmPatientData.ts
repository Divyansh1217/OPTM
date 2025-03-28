
import { useReducer, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { OptmPatientData } from '@/types/optm-health';
import { 
  optmPatientReducer, 
  initialOptmPatientState
} from './optmPatientReducer';

export function useOptmPatientData(patientId: string, patientName: string) {
  const [state, dispatch] = useReducer(optmPatientReducer, initialOptmPatientState);
  
  // Load patient's OPTM health data
  useEffect(() => {
    const loadPatientData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // This would be replaced with actual API call to fetch patient data
        // For now, we'll use mock data or empty data
        const patientData = await fetchPatientOptmData(patientId);
        
        dispatch({ type: 'SET_ASSESSMENTS', payload: patientData });
      } catch (error) {
        console.error('Error loading patient OPTM data:', error);
        toast.error('Failed to load OPTM health data');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadPatientData();
  }, [patientId]);
  
  // Submit a new assessment
  const submitAssessment = useCallback(async (data: OptmPatientData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // In a real app, this would save to the database
      // For now, we'll just add it to our local state
      const newAssessment = {
        ...data,
        patientId,
        name: patientName,
        lastUpdated: new Date().toISOString()
      };
      
      // Add assessment to state
      dispatch({ type: 'ADD_ASSESSMENT', payload: newAssessment });
      toast.success('Assessment saved successfully');
      
      return true;
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Failed to save assessment');
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [patientId, patientName]);
  
  // Refresh the analysis
  const refreshAnalysis = useCallback(() => {
    dispatch({ type: 'REFRESH_ANALYSIS' });
    toast.success('Analysis refreshed');
  }, []);
  
  return {
    ...state,
    submitAssessment,
    refreshAnalysis
  };
}

// Mock function to fetch patient OPTM data
// In a real app, this would be an API call to your backend
async function fetchPatientOptmData(patientId: string): Promise<OptmPatientData[]> {
  // For demo purposes, return an empty array
  // In a real app, you would fetch from your database
  return [];
}

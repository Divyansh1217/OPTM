
import { OptmPatientData, OptmAnalysisResult } from '@/types/optm-health';
import { analyzeOptmPatientData } from '@/utils/optmHealthUtils';

export type OptmPatientState = {
  isLoading: boolean;
  assessments: OptmPatientData[];
  currentData: OptmPatientData | null;
  previousData: OptmPatientData | null;
  analysisResult: OptmAnalysisResult | undefined;
};

export type OptmPatientAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ASSESSMENTS'; payload: OptmPatientData[] }
  | { type: 'ADD_ASSESSMENT'; payload: OptmPatientData }
  | { type: 'REFRESH_ANALYSIS' };

export const initialOptmPatientState: OptmPatientState = {
  isLoading: false,
  assessments: [],
  currentData: null,
  previousData: null,
  analysisResult: undefined,
};

export function optmPatientReducer(
  state: OptmPatientState,
  action: OptmPatientAction
): OptmPatientState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
      
    case 'SET_ASSESSMENTS':
      // Sort assessments by date (newest first)
      const sortedAssessments = [...action.payload].sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
      
      // Get current and previous data
      const currentData = sortedAssessments.length > 0 ? sortedAssessments[0] : null;
      const previousData = sortedAssessments.length > 1 ? sortedAssessments[1] : null;
      
      // Generate analysis if both current and previous data exist
      const analysisResult = currentData && previousData 
        ? analyzeOptmPatientData(currentData, previousData)
        : undefined;
        
      return {
        ...state,
        assessments: sortedAssessments,
        currentData,
        previousData,
        analysisResult,
      };
      
    case 'ADD_ASSESSMENT':
      // Add new assessment to the beginning of the array
      const newAssessments = [action.payload, ...state.assessments];
      
      // Update current and previous data
      const newCurrentData = action.payload;
      const newPreviousData = state.currentData;
      
      // Generate new analysis
      const newAnalysisResult = newPreviousData 
        ? analyzeOptmPatientData(newCurrentData, newPreviousData)
        : undefined;
        
      return {
        ...state,
        assessments: newAssessments,
        currentData: newCurrentData,
        previousData: newPreviousData,
        analysisResult: newAnalysisResult,
      };
      
    case 'REFRESH_ANALYSIS':
      if (!state.currentData || !state.previousData) {
        return state;
      }
      
      return {
        ...state,
        analysisResult: analyzeOptmPatientData(state.currentData, state.previousData),
      };
      
    default:
      return state;
  }
}

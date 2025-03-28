
import { useCallback } from 'react';
import { SquatState, FeedbackType } from '../types';

interface UseSessionResetProps {
  resetMetrics: () => void;
  setCurrentSquatState: (state: SquatState) => void;
  setPrevSquatState: (state: SquatState) => void;
  setFeedback: (message: string | null, type: FeedbackType) => void;
}

export const useSessionReset = ({
  resetMetrics,
  setCurrentSquatState,
  setPrevSquatState,
  setFeedback
}: UseSessionResetProps) => {
  const resetSession = useCallback(() => {
    // Reset metrics
    resetMetrics();
    
    // Reset squat state
    setCurrentSquatState(SquatState.STANDING);
    setPrevSquatState(SquatState.STANDING);
    
    // Update feedback
    setFeedback("Session reset. Ready to start new exercises.", FeedbackType.INFO);
  }, [resetMetrics, setCurrentSquatState, setPrevSquatState, setFeedback]);
  
  return { resetSession };
};

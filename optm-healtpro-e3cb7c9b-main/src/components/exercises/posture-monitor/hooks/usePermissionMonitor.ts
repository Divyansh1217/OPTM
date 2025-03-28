
import { useEffect } from 'react';
import { FeedbackType } from '@/lib/human/types';
import type { CustomFeedback } from './types';

interface UsePermissionMonitorProps {
  permission: PermissionState | null;
  setCustomFeedback: (feedback: CustomFeedback | null) => void;
}

export const usePermissionMonitor = ({
  permission,
  setCustomFeedback
}: UsePermissionMonitorProps) => {
  // Monitor permission state changes
  useEffect(() => {
    if (permission === 'denied') {
      setCustomFeedback({
        message: "Camera access denied. Please enable camera permissions in your browser settings.",
        type: FeedbackType.WARNING
      });
    } else if (permission === 'granted') {
      setCustomFeedback(null); // Clear any permission-related feedback
    }
  }, [permission, setCustomFeedback]);
};

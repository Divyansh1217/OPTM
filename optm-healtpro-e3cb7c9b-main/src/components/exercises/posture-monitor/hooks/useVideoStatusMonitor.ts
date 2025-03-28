
import { useEffect } from 'react';
import { FeedbackType } from '@/lib/human/types';
import type { CustomFeedback } from './types';

interface UseVideoStatusMonitorProps {
  cameraActive: boolean;
  videoStatus: { 
    isReady: boolean; 
    hasStream: boolean;
    resolution: { width: number; height: number } | null;
  };
  setCustomFeedback: (feedback: CustomFeedback | null) => void;
}

export const useVideoStatusMonitor = ({
  cameraActive,
  videoStatus,
  setCustomFeedback
}: UseVideoStatusMonitorProps) => {
  // Monitor video status changes
  useEffect(() => {
    if (cameraActive) {
      if (!videoStatus.hasStream) {
        setCustomFeedback({
          message: "Camera stream not available. Please try restarting the camera.",
          type: FeedbackType.WARNING
        });
      } else if (videoStatus.isReady) {
        setCustomFeedback({
          message: "Camera ready. You can start pose detection.",
          type: FeedbackType.INFO
        });
      }
    }
  }, [cameraActive, videoStatus, setCustomFeedback]);
};


import { useEffect } from 'react';
import { FeedbackType } from '@/lib/human/types';

interface UseAutoStartCameraProps {
  cameraActive: boolean;
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
  toggleCamera: () => void;
  setCustomFeedback: (feedback: { message: string, type: FeedbackType } | null) => void;
}

export function useAutoStartCamera({
  cameraActive,
  permission,
  toggleCamera,
  setCustomFeedback
}: UseAutoStartCameraProps) {
  // Auto-start camera when permission is granted
  useEffect(() => {
    if (!cameraActive && permission === 'granted') {
      // Short delay to avoid immediate toggling
      const timer = setTimeout(() => {
        toggleCamera();
        setCustomFeedback({
          message: "Camera started automatically. Position yourself in frame.",
          type: FeedbackType.INFO
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [cameraActive, permission, toggleCamera, setCustomFeedback]);
}

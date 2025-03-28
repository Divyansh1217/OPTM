
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { FeedbackType } from './types';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Controls and displays the status of pose detection
interface PoseDetectionControllerProps {
  isModelLoading: boolean;
  modelError: string | null;
  cameraActive: boolean;
  feedback: { message: string | null; type: FeedbackType };
  detectionStatus: {
    isDetecting: boolean;
    fps: number | null;
    confidence: number | null;
  };
}

const PoseDetectionController: React.FC<PoseDetectionControllerProps> = ({
  isModelLoading,
  modelError,
  cameraActive,
  feedback,
  detectionStatus
}) => {
  // Log status for debugging
  useEffect(() => {
    if (isModelLoading) {
      console.log('AI model loading in progress...');
    } else if (cameraActive && detectionStatus?.isDetecting) {
      console.log('Pose detection active:', { 
        fps: detectionStatus.fps, 
        confidence: detectionStatus.confidence 
      });
    }
  }, [isModelLoading, cameraActive, detectionStatus]);

  // If model is loading, show loader
  if (isModelLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 p-2 bg-primary-50 dark:bg-primary-900/20 rounded-md">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm">Loading AI model...</span>
      </div>
    );
  }

  // If there's a model error, show error alert
  if (modelError) {
    return (
      <Alert variant="destructive" className="mt-2">
        <AlertTitle>AI Model Error</AlertTitle>
        <AlertDescription>{modelError}</AlertDescription>
      </Alert>
    );
  }

  // If camera isn't active or no detection is happening, show nothing
  if (!cameraActive || !detectionStatus?.isDetecting) {
    return null;
  }

  // Show current feedback if available
  if (feedback?.message) {
    return (
      <Alert 
        variant={feedback.type === FeedbackType.WARNING ? "destructive" : 
               feedback.type === FeedbackType.SUCCESS ? "default" : "default"}
        className="mt-2"
      >
        <AlertDescription>{feedback.message}</AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default PoseDetectionController;

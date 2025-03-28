
import { useState, useEffect } from 'react';
import { FeedbackType } from '../types';

export const useFeedbackState = (isModelLoading: boolean, modelError: string | null) => {
  const [feedback, setFeedback] = useState<string | null>(
    isModelLoading ? "Loading pose detection model..." : null
  );
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(FeedbackType.INFO);
  
  // Update feedback when model loading state changes
  useEffect(() => {
    if (isModelLoading) {
      setFeedback("Loading pose detection model...");
      setFeedbackType(FeedbackType.INFO);
    } else if (modelError) {
      setFeedback(modelError);
      setFeedbackType(FeedbackType.WARNING);
    }
  }, [isModelLoading, modelError]);
  
  return {
    feedback: {
      message: feedback,
      type: feedbackType
    },
    setFeedback,
    setFeedbackType
  };
};

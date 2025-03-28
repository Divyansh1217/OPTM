
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackType } from './types';

interface FeedbackDisplayProps {
  feedback: { message: string | null; type: FeedbackType };
  stats: {
    totalReps: number;
    goodReps: number;
    badReps: number;
    accuracy: number;
  };
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, stats }) => {
  // If no feedback or empty message, don't display
  if (!feedback.message) return null;
  
  // Set color based on feedback type
  const messageClass = 
    feedback.type === FeedbackType.WARNING ? 'text-orange-500 dark:text-orange-400' :
    feedback.type === FeedbackType.SUCCESS ? 'text-green-500 dark:text-green-400' :
    'text-primary'; // Default for INFO or any other type
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Exercise Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className={`text-base ${messageClass}`}>
            {feedback.message}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-muted p-2 rounded-md">
            <div className="text-sm">Reps</div>
            <div className="font-semibold">{stats.totalReps}</div>
          </div>
          <div className="bg-muted p-2 rounded-md">
            <div className="text-sm">Good</div>
            <div className="font-semibold text-green-500">{stats.goodReps}</div>
          </div>
          <div className="bg-muted p-2 rounded-md">
            <div className="text-sm">Needs Work</div>
            <div className="font-semibold text-orange-500">{stats.badReps}</div>
          </div>
          <div className="bg-muted p-2 rounded-md">
            <div className="text-sm">Accuracy</div>
            <div className="font-semibold">{stats.accuracy.toFixed(0)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;

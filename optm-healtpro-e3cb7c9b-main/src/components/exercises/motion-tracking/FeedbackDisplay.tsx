
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackType } from '@/lib/human/types';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: { message: string | null; type: FeedbackType };
  stats: {
    totalReps: number;
    goodReps: number;
    badReps: number;
    accuracy: number;
    currentStreak?: number;
    bestStreak?: number;
  };
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, stats }) => {
  // Default message if no feedback
  const displayMessage = feedback.message || 'Ready for exercise. Maintain good posture.';
  
  // Get appropriate icon and color for feedback type
  const getFeedbackDisplay = () => {
    switch (feedback.type) {
      case FeedbackType.WARNING:
        return { 
          icon: <AlertCircle className="h-5 w-5" />,
          colorClass: 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50'
        };
      case FeedbackType.SUCCESS:
        return { 
          icon: <CheckCircle className="h-5 w-5" />,
          colorClass: 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-950/50'
        };
      case FeedbackType.ERROR:
        return { 
          icon: <AlertCircle className="h-5 w-5" />,
          colorClass: 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/50'
        };
      default:
        return { 
          icon: <Info className="h-5 w-5" />,
          colorClass: 'text-primary bg-primary/5'
        };
    }
  };
  
  const { icon, colorClass } = getFeedbackDisplay();
  
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2 border-b bg-card/60">
        <CardTitle className="text-lg">Exercise Feedback</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-5">
          <div className={`p-3 rounded-lg flex items-start gap-3 ${colorClass}`}>
            <span className="mt-0.5">{icon}</span>
            <span className="text-base font-medium">{displayMessage}</span>
          </div>
        </div>
        
        {/* Primary Stats - 4 columns layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-3 stats-grid-4">
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Reps</div>
            <div className="font-semibold text-lg stat-value">{stats.totalReps}</div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Good</div>
            <div className="font-semibold text-lg text-green-500 stat-value">{stats.goodReps}</div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Needs Work</div>
            <div className="font-semibold text-lg text-orange-500 stat-value">{stats.badReps}</div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Accuracy</div>
            <div className="font-semibold text-lg stat-value">{stats.accuracy}%</div>
          </div>
        </div>
        
        {/* Streak Stats - 2 columns layout */}
        <div className="grid grid-cols-2 gap-3 text-center stats-grid-2">
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Current Streak</div>
            <div className="font-semibold text-lg stat-value">
              {stats.currentStreak !== undefined ? stats.currentStreak : 0} reps
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md flex flex-col items-center stat-card">
            <div className="text-xs text-muted-foreground mb-1 stat-label">Best Streak</div>
            <div className="font-semibold text-lg stat-value">
              {stats.bestStreak !== undefined ? stats.bestStreak : 0} reps
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cva } from 'class-variance-authority';

interface HealthScoreProps {
  score: number;
  category: string;
}

const scoreColorVariants = cva('', {
  variants: {
    range: {
      low: 'text-red-500',
      medium: 'text-amber-500',
      high: 'text-green-500',
    },
  },
});

const progressColorVariants = cva('', {
  variants: {
    range: {
      low: 'bg-red-500',
      medium: 'bg-amber-500',
      high: 'bg-green-500',
    },
  },
});

const HealthScore: React.FC<HealthScoreProps> = ({ score, category }) => {
  // Determine color range based on score
  const getRange = (score: number) => {
    if (score < 50) return 'low';
    if (score < 75) return 'medium';
    return 'high';
  };
  
  const range = getRange(score);
  const scoreColor = scoreColorVariants({ range });
  const progressColor = progressColorVariants({ range });
  
  // Get score description based on range
  const getScoreDescription = (range: string) => {
    switch (range) {
      case 'low':
        return 'Needs Attention';
      case 'medium':
        return 'Good Progress';
      case 'high':
        return 'Excellent';
      default:
        return '';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
        <div className="text-sm text-muted-foreground mb-2">{category} Score</div>
        <div className={`text-3xl font-bold ${scoreColor}`}>{score}</div>
        <Progress 
          value={score} 
          className="w-full h-2 mt-2"
          indicatorClassName={progressColor}
        />
        <div className={`text-sm mt-2 ${scoreColor}`}>
          {getScoreDescription(range)}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScore;

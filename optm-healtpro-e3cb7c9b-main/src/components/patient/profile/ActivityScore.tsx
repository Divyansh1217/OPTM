
import React from 'react';
import { Activity, Clock, Clipboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ActivityScoreItem from './ActivityScoreItem';

interface ActivityScoreProps {
  patient: any;
  score?: number;
  activityScores?: Array<{
    label: string;
    value: string;
    unit: string;
  }>;
}

const ActivityScore: React.FC<ActivityScoreProps> = ({ 
  patient, 
  score = 65, 
  activityScores 
}) => {
  const defaultActivityScores = [
    {
      label: "Daily Steps",
      value: "7,234",
      unit: "steps"
    },
    {
      label: "Active Time",
      value: "42",
      unit: "min"
    },
    {
      label: "Health Score",
      value: "72",
      unit: "%"
    }
  ];

  const displayActivityScores = activityScores || defaultActivityScores;
  
  const getScoreStatus = (score: number) => {
    if (score < 40) return { label: 'Low', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900' };
    if (score < 70) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900' };
    return { label: 'High', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900' };
  };

  const scoreStatus = getScoreStatus(score);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">Activity score</h3>
        <div className="text-lg font-bold flex items-center">
          {score}%
          <Badge className={`ml-2 ${scoreStatus.color}`}>
            {scoreStatus.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {displayActivityScores.map((score, index) => (
          <ActivityScoreItem 
            key={index} 
            label={score.label} 
            value={score.value} 
            unit={score.unit}
            icon={
              index === 0 ? <Activity className="h-4 w-4 text-blue-500" /> :
              index === 1 ? <Clock className="h-4 w-4 text-blue-500" /> :
              <Clipboard className="h-4 w-4 text-blue-500" />
            }
          />
        ))}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ 
          width: `${score}%`, 
          background: 'linear-gradient(90deg, #4299E1, #F6AD55, #F56565)' 
        }}></div>
      </div>
    </div>
  );
};

export default ActivityScore;

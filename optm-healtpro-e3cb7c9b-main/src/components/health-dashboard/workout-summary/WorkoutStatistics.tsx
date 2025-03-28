
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { HealthMetric } from '@/services/health';

interface WorkoutStatisticsProps {
  workoutData: HealthMetric[];
}

const WorkoutStatistics: React.FC<WorkoutStatisticsProps> = ({ workoutData }) => {
  const averageDuration = Math.round(
    workoutData.reduce((sum, w) => sum + w.value, 0) / workoutData.length
  );
  
  return (
    <CardContent className="pt-0">
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold">Workout Statistics</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Total Workouts</p>
            <p className="text-xl font-bold">{workoutData.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Duration</p>
            <p className="text-xl font-bold">
              {averageDuration} min
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default WorkoutStatistics;

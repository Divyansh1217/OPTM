
import React from 'react';
import { HealthMetric, TimeRange } from '@/services/health';
import WorkoutLoadingSkeleton from './WorkoutLoadingSkeleton';
import WorkoutHeader from './WorkoutHeader';
import WorkoutStatistics from './WorkoutStatistics';
import LatestWorkoutDetails from './LatestWorkoutDetails';
import WorkoutEmptyState from './WorkoutEmptyState';
import { Card } from '@/components/ui/card';

interface WorkoutSummaryProps {
  workoutData: HealthMetric[];
  timeRange: TimeRange;
  isLoading: boolean;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({
  workoutData,
  timeRange,
  isLoading
}) => {
  if (isLoading) {
    return <WorkoutLoadingSkeleton />;
  }

  const hasWorkouts = workoutData && workoutData.length > 0;
  const latestWorkout = hasWorkouts ? workoutData[0] : null;
  
  return (
    <Card className="w-full">
      <WorkoutHeader timeRange={timeRange} />
      
      {hasWorkouts ? (
        <>
          <WorkoutStatistics workoutData={workoutData} />
          {latestWorkout && <LatestWorkoutDetails workout={latestWorkout} />}
        </>
      ) : (
        <WorkoutEmptyState />
      )}
    </Card>
  );
};

export default WorkoutSummary;

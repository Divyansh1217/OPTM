
import React from 'react';
import { HealthMetric } from '@/services/health';
import { formatDistanceToNow } from 'date-fns';

export interface LatestWorkoutDetailsProps {
  workout: HealthMetric;
}

const LatestWorkoutDetails: React.FC<LatestWorkoutDetailsProps> = ({ workout }) => {
  const workoutDate = new Date(workout.timestamp);
  const timeAgo = formatDistanceToNow(workoutDate, { addSuffix: true });
  
  // Extract workout details from metadata
  const duration = workout.metadata?.duration || 0;
  const caloriesBurned = workout.metadata?.calories || 0;
  const workoutType = workout.metadata?.type || 'Unknown';
  
  // Format duration (in minutes) to hours and minutes
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = hours > 0 
    ? `${hours}h ${minutes}m` 
    : `${minutes}m`;
  
  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium text-sm mb-2">Latest Workout</h4>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type</span>
          <span className="font-medium">{workoutType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">When</span>
          <span className="font-medium">{timeAgo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium">{formattedDuration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Calories</span>
          <span className="font-medium">{caloriesBurned} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default LatestWorkoutDetails;

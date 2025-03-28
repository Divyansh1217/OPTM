
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import { TimeRange } from '@/services/health';

interface WorkoutHeaderProps {
  timeRange: TimeRange;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({ timeRange }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <Dumbbell className="h-5 w-5 mr-2 text-orange-500" />
        Workout Summary
      </CardTitle>
      <CardDescription>
        Your workout data for the {timeRange} period
      </CardDescription>
    </CardHeader>
  );
};

export default WorkoutHeader;

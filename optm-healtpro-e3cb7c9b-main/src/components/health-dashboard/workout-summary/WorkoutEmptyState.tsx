
import React from 'react';
import { CardContent } from '@/components/ui/card';

const WorkoutEmptyState: React.FC = () => {
  return (
    <CardContent>
      <p className="text-sm text-muted-foreground">
        No workout data available for the selected period.
      </p>
    </CardContent>
  );
};

export default WorkoutEmptyState;

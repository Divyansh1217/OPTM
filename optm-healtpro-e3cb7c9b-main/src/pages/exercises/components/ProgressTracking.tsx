
import React from 'react';
import MuscleProgress from '@/components/exercises/MuscleProgress';
import WeeklyGoals from './WeeklyGoals';
import DoctorRecommendations from './DoctorRecommendations';
import { MuscleGroup, ProgressData } from '@/types/exercise.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressTrackingProps {
  muscleGroups: MuscleGroup[];
  progressData: ProgressData[];
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({
  muscleGroups,
  progressData
}) => {
  return (
    <div className="space-y-5">
      <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-primary">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MuscleProgress 
            muscleGroups={muscleGroups}
            progressData={progressData}
          />
        </CardContent>
      </Card>
      
      <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-primary">Weekly Goals</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <WeeklyGoals />
        </CardContent>
      </Card>
      
      <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-primary">Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <DoctorRecommendations />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;

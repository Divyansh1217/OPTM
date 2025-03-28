
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';

const ExerciseSelectionView: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posture Monitor</CardTitle>
        <CardDescription>
          Select an exercise to start posture analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <div className="text-center text-muted-foreground">
          <Info className="mx-auto h-12 w-12 mb-2 text-muted-foreground/50" />
          <p>Please select an exercise from the library to begin</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseSelectionView;

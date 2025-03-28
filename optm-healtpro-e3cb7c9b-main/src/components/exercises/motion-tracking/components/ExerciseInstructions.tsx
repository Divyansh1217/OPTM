
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ExerciseInstructionsProps {
  exerciseName: string;
}

const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({ exerciseName }) => {
  return (
    <Card className="border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 border-b bg-card/60">
        <CardTitle className="text-lg font-semibold text-primary">Exercise Instructions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-semibold mb-4 text-lg">{exerciseName}</h3>
        <div className="space-y-2.5">
          {instructionSteps.map((step, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 bg-secondary/20 rounded-md p-2.5 transition-colors hover:bg-secondary/30"
            >
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const instructionSteps = [
  "Stand with feet shoulder-width apart",
  "Keep your back straight and core engaged",
  "Lower your body by bending at the knees and hips",
  "Keep knees aligned with toes, not extending past them",
  "Aim for a 90-degree angle at the knees at bottom position",
  "Return to standing position with control",
  "Maintain consistent breathing throughout"
];

export default ExerciseInstructions;

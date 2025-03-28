
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exercise } from '@/types/exercise.types'; 
import { Button } from '@/components/ui/button';
import ExerciseVideo from '@/components/exercises/ExerciseVideo';
import { Play, Dumbbell, Clock, Award } from 'lucide-react';
import MotionTracker from '@/components/exercises/motion-tracking';
import { Card, CardContent } from '@/components/ui/card';

interface ExerciseContentProps {
  filteredExercises: Exercise[];
  selectedExercise: Exercise | null;
  activeCategory: string | null;
  onCategoryFilter: (category: string | null) => void;
  onStartExercise: (exerciseId: string) => void;
  onFinishExercise: () => void;
  showMonitor: boolean;
  setShowMonitor: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExerciseContent: React.FC<ExerciseContentProps> = ({ 
  filteredExercises, 
  selectedExercise, 
  activeCategory, 
  onCategoryFilter, 
  onStartExercise, 
  onFinishExercise, 
  showMonitor, 
  setShowMonitor 
}) => {
  const navigate = useNavigate();
  const [showMotionTracker, setShowMotionTracker] = React.useState(false);
  
  if (!selectedExercise) {
    return (
      <div className="space-y-6">
        <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-primary">Select an Exercise</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Please select an exercise from the list to get started.
            </p>
            
            {filteredExercises.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-medium mb-4 text-primary/90">Available Exercises:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredExercises.slice(0, 6).map(exercise => (
                    <Button 
                      key={exercise.id}
                      variant="outline" 
                      onClick={() => onStartExercise(exercise.id)}
                      className="justify-start text-left h-auto py-4 px-5 border-2 hover:bg-secondary/30"
                    >
                      <div>
                        <div className="font-medium text-base">{exercise.title}</div>
                        <div className="text-xs text-muted-foreground mt-1.5">{exercise.duration} • {exercise.difficulty}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleStartExercise = () => {
    setShowMotionTracker(true);
  };
  
  const handleFinishExercise = () => {
    setShowMotionTracker(false);
    onFinishExercise();
  };
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{selectedExercise.title}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Award className="h-4 w-4 mr-1.5" />
              {selectedExercise.difficulty}
            </div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Clock className="h-4 w-4 mr-1.5" />
              {selectedExercise.duration}
            </div>
            {selectedExercise.muscleGroups.map((group) => (
              <div key={group} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <Dumbbell className="h-4 w-4 mr-1.5" />
                {group}
              </div>
            ))}
          </div>
          <p className="mt-5 text-muted-foreground leading-relaxed text-base">{selectedExercise.description}</p>
          
          {!showMotionTracker && (
            <Button 
              onClick={handleStartExercise} 
              className="mt-6 gap-2 shadow-sm text-white bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Play className="h-5 w-5" />
              Start Exercise
            </Button>
          )}
        </CardContent>
      </Card>
      
      {showMotionTracker ? (
        <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 pb-0">
              <h2 className="text-xl font-semibold text-primary">Motion Tracking</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Position yourself in front of the camera for analysis</p>
            </div>
            <MotionTracker
              exerciseId={selectedExercise?.id}
              exerciseName={selectedExercise?.title}
              onFinish={handleFinishExercise}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 pb-0">
              <h2 className="text-xl font-semibold text-primary">Exercise Demonstration</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Watch the video for proper form guidance</p>
            </div>
            <ExerciseVideo exercise={selectedExercise} />
          </CardContent>
        </Card>
      )}
      
      <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-primary mb-5">Exercise Instructions</h2>
          <ol className="list-decimal pl-6 space-y-4 text-sm">
            <li className="pl-2">Position yourself in front of the camera so your full body is visible.</li>
            <li className="pl-2">Follow the exercise demonstration video for proper form.</li>
            <li className="pl-2">The AI will track your movements and provide real-time feedback.</li>
            <li className="pl-2">Complete the recommended number of repetitions with good form.</li>
            <li className="pl-2">Take breaks if needed and focus on quality over quantity.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseContent;

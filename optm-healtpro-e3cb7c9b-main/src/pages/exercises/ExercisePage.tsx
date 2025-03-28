
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import useExercises from '@/hooks/useExercises';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import ExerciseContent from './components/ExerciseContent';
import ProgressTracking from './components/ProgressTracking';
import { Exercise } from '@/types/exercise.types';

const ExercisePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [showMonitor, setShowMonitor] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const {
    exercises,
    muscleGroups,
    progressData,
    selectedExercise,
    setSelectedExercise,
    markExerciseCompleted,
    startExercise,
    filterExercisesByCategory
  } = useExercises();

  // Set default selected exercise if none is selected
  useEffect(() => {
    if (exercises.length > 0 && !selectedExercise) {
      setSelectedExercise(exercises[0]);
    }
  }, [exercises, selectedExercise, setSelectedExercise]);

  const filteredExercises = filterExercisesByCategory(activeCategory);

  const handleCategoryFilter = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleStartExercise = (exerciseId: string) => {
    startExercise(exerciseId);
    setShowMonitor(true);
    toast.success("Starting exercise session", {
      description: "Get ready for your guided workout"
    });
  };

  const handleFinishExercise = () => {
    if (selectedExercise) {
      markExerciseCompleted(selectedExercise.id);
      toast.success("Exercise completed!", {
        description: "Great job! Your progress has been saved."
      });
    }
    setShowMonitor(false);
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 pl-2 md:pl-0">
              <h1 className="text-2xl font-bold tracking-tight">Exercise Therapy</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Personalized exercises with AI-powered posture monitoring
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main content area */}
              <div className="lg:col-span-8 space-y-6">
                <ExerciseContent 
                  showMonitor={showMonitor}
                  selectedExercise={selectedExercise}
                  filteredExercises={filteredExercises}
                  activeCategory={activeCategory}
                  onCategoryFilter={handleCategoryFilter}
                  onStartExercise={handleStartExercise}
                  onFinishExercise={handleFinishExercise}
                  setShowMonitor={setShowMonitor}
                />
              </div>
              
              {/* Right sidebar with progress tracking */}
              {!isMobile && !showMonitor && (
                <div className="lg:col-span-4 space-y-6">
                  <ProgressTracking 
                    muscleGroups={muscleGroups}
                    progressData={progressData}
                  />
                </div>
              )}
              
              {/* Responsive design - show progress below content on mobile */}
              {isMobile && !showMonitor && (
                <div className="col-span-1 space-y-6 mt-6">
                  <ProgressTracking 
                    muscleGroups={muscleGroups}
                    progressData={progressData}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExercisePage;

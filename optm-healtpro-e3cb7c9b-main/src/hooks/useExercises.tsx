
import { useState, useEffect } from 'react';
import { Exercise, MuscleGroup, ProgressData } from '../types/exercise.types';
import { mockExercises, mockMuscleGroups, mockProgressData } from '../data/mockExerciseData';
import { 
  updateExerciseProgress, 
  filterExercisesByCategory, 
  getExerciseById 
} from '../utils/exerciseUtils';

const useExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>(mockMuscleGroups);
  const [progressData, setProgressData] = useState<ProgressData[]>(mockProgressData);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Function to mark exercise as completed
  const markExerciseCompleted = (exerciseId: string) => {
    const { updatedExercises, updatedMuscleGroups, updatedProgressData } = 
      updateExerciseProgress(exercises, muscleGroups, progressData, exerciseId);
    
    setExercises(updatedExercises);
    setMuscleGroups(updatedMuscleGroups);
    setProgressData(updatedProgressData);
  };

  // Function to start an exercise (mark as in-progress)
  const startExercise = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      setSelectedExercise(exercise);
      
      setExercises(prevExercises => 
        prevExercises.map(ex => 
          ex.id === exerciseId && ex.completionStatus !== 'completed'
            ? { ...ex, completionStatus: 'in-progress' as const } 
            : ex
        )
      );
    }
  };

  return {
    exercises,
    muscleGroups,
    progressData,
    selectedExercise,
    setSelectedExercise,
    markExerciseCompleted,
    startExercise,
    filterExercisesByCategory: (category: string | null) => 
      filterExercisesByCategory(exercises, category),
    getExerciseById: (id: string) => getExerciseById(exercises, id)
  };
};

export default useExercises;

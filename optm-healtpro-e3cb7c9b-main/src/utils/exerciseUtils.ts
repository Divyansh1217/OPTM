
import { Exercise, MuscleGroup, ProgressData } from '../types/exercise.types';

/**
 * Updates exercise progress and related muscle groups
 */
export const updateExerciseProgress = (
  exercises: Exercise[],
  muscleGroups: MuscleGroup[],
  progressData: ProgressData[],
  exerciseId: string
): {
  updatedExercises: Exercise[];
  updatedMuscleGroups: MuscleGroup[];
  updatedProgressData: ProgressData[];
} => {
  // Update exercises completion status
  const updatedExercises = exercises.map(ex => 
    ex.id === exerciseId 
      ? { ...ex, completionStatus: 'completed' as const } 
      : ex
  );
  
  // Update the latest progress data point
  const lastIndex = progressData.length - 1;
  const lastItem = progressData[lastIndex];
  const updatedProgressData = [
    ...progressData.slice(0, lastIndex),
    {
      ...lastItem,
      strength: Math.min(lastItem.strength + 2, 100),
      flexibility: Math.min(lastItem.flexibility + 2, 100),
      endurance: Math.min(lastItem.endurance + 2, 100)
    }
  ];
  
  // Find the exercise to update muscle groups
  const exercise = exercises.find(ex => ex.id === exerciseId);
  let updatedMuscleGroups = [...muscleGroups];
  
  if (exercise) {
    updatedMuscleGroups = muscleGroups.map(muscle => 
      exercise.muscleGroups.includes(muscle.name)
        ? { ...muscle, progress: Math.min(muscle.progress + 5, 100) }
        : muscle
    );
  }

  return {
    updatedExercises,
    updatedMuscleGroups,
    updatedProgressData
  };
};

/**
 * Filter exercises by category
 */
export const filterExercisesByCategory = (
  exercises: Exercise[],
  category: string | null
): Exercise[] => {
  if (!category) return exercises;
  return exercises.filter(ex => ex.category === category);
};

/**
 * Get a specific exercise by ID
 */
export const getExerciseById = (
  exercises: Exercise[],
  id: string
): Exercise | null => {
  return exercises.find(ex => ex.id === id) || null;
};

import { MotionStats } from '@/lib/human/types';

/**
 * Calculate the accuracy percentage based on good and bad reps.
 */
export const calculateAccuracy = (goodReps: number, totalReps: number): number => {
  return totalReps === 0 ? 0 : Math.round((goodReps / totalReps) * 100);
};

/**
 * Estimate calories burned based on exercise stats.
 * Uses MET (Metabolic Equivalent of Task) values for rough approximation.
 */
export const estimateCaloriesBurned = (
  reps: number,
  exerciseType: string = 'squat',
  userWeight: number = 70 // Default 70kg if not provided
): number => {
  const MET_VALUES: Record<string, number> = {
    squat: 5.0,
    pushup: 4.0,
    lunge: 4.5,
    jumping_jack: 8.0,
    default: 5.0,
  };

  const met = MET_VALUES[exerciseType] || MET_VALUES.default;
  const averageSecPerRep = 4; // Estimated seconds per repetition
  const timeInHours = (reps * averageSecPerRep) / 3600;

  return Number((met * userWeight * timeInHours).toFixed(1)); // Round to 1 decimal place
};

/**
 * Update exercise stats based on new rep data.
 */
export const updateExerciseStats = (currentStats: MotionStats, isGoodForm: boolean): MotionStats => {
  const newStats = { ...currentStats };

  newStats.totalReps += 1;
  
  if (isGoodForm) {
    newStats.goodReps += 1;
    newStats.currentStreak += 1;
    newStats.bestStreak = Math.max(newStats.bestStreak, newStats.currentStreak);
  } else {
    newStats.badReps += 1;
    newStats.currentStreak = 0;
  }

  newStats.accuracy = calculateAccuracy(newStats.goodReps, newStats.totalReps);
  newStats.caloriesBurned = estimateCaloriesBurned(newStats.totalReps);
  newStats.lastUpdated = Date.now();

  return newStats;
};

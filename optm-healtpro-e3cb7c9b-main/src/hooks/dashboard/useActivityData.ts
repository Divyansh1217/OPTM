import { FitnessData } from '@/hooks/useFitnessIntegration';

export const useActivityData = (fitnessData: FitnessData) => {
  // Transform data from fitnessData for activity visualization, but keep the original structure
  // for components that need the raw FitnessData format
  
  const activityData = {
    steps: {
      daily: fitnessData.steps.data.map(item => ({
        date: new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
        count: item.value
      })),
      weeklyTotal: fitnessData.steps.summary.total,
      dailyAverage: fitnessData.steps.summary.average
    },
    calories: {
      daily: fitnessData.calories.data.map(item => ({
        date: new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
        count: item.value
      })),
      weeklyTotal: fitnessData.calories.summary.total,
      dailyAverage: fitnessData.calories.summary.average
    },
    heartRate: {
      readings: fitnessData.heartRate.data.map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        bpm: item.value
      })),
      average: fitnessData.heartRate.summary.average,
      min: fitnessData.heartRate.summary.min,
      max: fitnessData.heartRate.summary.max
    }
  };

  // Return both the transformed activity data and the original fitnessData
  return {
    activityData,
    fitnessData
  };
};

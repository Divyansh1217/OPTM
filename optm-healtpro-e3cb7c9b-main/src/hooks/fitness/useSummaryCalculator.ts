
import { useMemo } from 'react';
import { FitnessData } from './types';

export const useSummaryCalculator = (rawData: FitnessData): FitnessData => {
  return useMemo(() => {
    // If the data already has summary calculations, return it as is
    if (
      rawData.steps.summary &&
      rawData.heartRate.summary &&
      rawData.calories.summary
    ) {
      return rawData;
    }
    
    // Calculate steps summary
    const totalSteps = rawData.steps.data.reduce((sum, item) => sum + item.value, 0);
    const avgSteps = Math.round(totalSteps / (rawData.steps.data.length || 1));
    
    // Calculate heart rate summary
    const heartRateValues = rawData.heartRate.data.map(item => item.value);
    const avgHeartRate = heartRateValues.length > 0
      ? Math.round(heartRateValues.reduce((sum, val) => sum + val, 0) / heartRateValues.length)
      : 0;
    const minHeartRate = heartRateValues.length > 0 ? Math.min(...heartRateValues) : 0;
    const maxHeartRate = heartRateValues.length > 0 ? Math.max(...heartRateValues) : 0;
    
    // Calculate calories summary
    const totalCalories = rawData.calories.data.reduce((sum, item) => sum + item.value, 0);
    const avgCalories = Math.round(totalCalories / (rawData.calories.data.length || 1));
    
    // Return the data with calculated summaries
    return {
      steps: {
        data: rawData.steps.data,
        summary: {
          total: totalSteps,
          average: avgSteps
        }
      },
      heartRate: {
        data: rawData.heartRate.data,
        summary: {
          average: avgHeartRate,
          min: minHeartRate,
          max: maxHeartRate
        }
      },
      calories: {
        data: rawData.calories.data,
        summary: {
          total: totalCalories,
          average: avgCalories
        }
      }
    };
  }, [rawData]);
};

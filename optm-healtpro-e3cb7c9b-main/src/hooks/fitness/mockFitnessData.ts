
import { FitnessProvider, FitnessData } from './types';

export const mockProviders: FitnessProvider[] = [
  {
    id: 'google-fit',
    name: 'Google Fit',
    logo: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png',
    isConnected: false,
  },
  {
    id: 'apple-health',
    name: 'Apple Health',
    logo: 'https://developer.apple.com/assets/elements/icons/healthkit/healthkit-96x96.png',
    isConnected: false,
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    logo: 'https://www.fitbit.com/images/open-graph/fitbit-logo.png',
    isConnected: false,
  }
];

export const generateMockFitnessData = (): FitnessData => {
  const now = new Date();
  const days = 7; // Generate data for last 7 days
  
  const stepsData = [];
  const heartRateData = [];
  const caloriesData = [];
  
  let totalSteps = 0;
  let totalCalories = 0;
  let minHeartRate = 999;
  let maxHeartRate = 0;
  let totalHeartRate = 0;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const timestamp = date.toISOString();
    
    // Generate random data
    const steps = Math.floor(Math.random() * 6000) + 3000;
    const heartRate = Math.floor(Math.random() * 30) + 60;
    const calories = Math.floor(Math.random() * 500) + 1500;
    
    // Update totals and min/max
    totalSteps += steps;
    totalCalories += calories;
    totalHeartRate += heartRate;
    
    if (heartRate < minHeartRate) minHeartRate = heartRate;
    if (heartRate > maxHeartRate) maxHeartRate = heartRate;
    
    // Add to data arrays
    stepsData.push({ timestamp, value: steps });
    heartRateData.push({ timestamp, value: heartRate });
    caloriesData.push({ timestamp, value: calories });
  }
  
  // Calculate averages
  const avgSteps = Math.round(totalSteps / days);
  const avgCalories = Math.round(totalCalories / days);
  const avgHeartRate = Math.round(totalHeartRate / days);
  
  return {
    steps: {
      data: stepsData,
      summary: {
        total: totalSteps,
        average: avgSteps
      }
    },
    heartRate: {
      data: heartRateData,
      summary: {
        average: avgHeartRate,
        min: minHeartRate,
        max: maxHeartRate
      }
    },
    calories: {
      data: caloriesData,
      summary: {
        total: totalCalories,
        average: avgCalories
      }
    }
  };
};

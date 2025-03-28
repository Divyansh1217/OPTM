
import { format } from 'date-fns';

// Type definitions for Google Fit data
export interface GoogleFitDataset {
  dataSourceId: string;
  point: Array<{
    startTimeNanos: string;
    endTimeNanos: string;
    dataTypeName: string;
    value: Array<{
      fpVal?: number;
      intVal?: number;
      stringVal?: string;
      mapVal?: Array<{
        key: string;
        value: {
          fpVal?: number;
          intVal?: number;
          stringVal?: string;
        }
      }>
    }>
  }>;
}

export interface GoogleFitBucket {
  startTimeMillis: string;
  endTimeMillis: string;
  dataset: GoogleFitDataset[];
}

export interface GoogleFitResponse {
  bucket: GoogleFitBucket[];
}

// Function to extract steps data
export const extractStepsData = (data: GoogleFitResponse): { day: string; value: number }[] => {
  if (!data?.bucket?.length) return [];
  
  return data.bucket.map(bucket => {
    const day = format(new Date(parseInt(bucket.startTimeMillis)), 'EEE');
    const stepsDataset = bucket.dataset.find(set => 
      set.dataSourceId.includes('com.google.step_count.delta')
    );
    
    let steps = 0;
    if (stepsDataset?.point?.length) {
      steps = stepsDataset.point.reduce((total, point) => {
        return total + (point.value[0]?.intVal || 0);
      }, 0);
    }
    
    return { day, value: steps };
  });
};

// Function to extract heart rate data
export const extractHeartRateData = (data: GoogleFitResponse): number => {
  if (!data?.bucket?.length) return 0;
  
  let totalHeartRate = 0;
  let countReadings = 0;
  
  data.bucket.forEach(bucket => {
    const heartRateDataset = bucket.dataset.find(set => 
      set.dataSourceId.includes('com.google.heart_rate.bpm')
    );
    
    if (heartRateDataset?.point?.length) {
      heartRateDataset.point.forEach(point => {
        if (point.value[0]?.fpVal) {
          totalHeartRate += point.value[0].fpVal;
          countReadings++;
        }
      });
    }
  });
  
  return countReadings > 0 ? Math.round(totalHeartRate / countReadings) : 0;
};

// Function to extract calories data
export const extractCaloriesData = (data: GoogleFitResponse): number => {
  if (!data?.bucket?.length) return 0;
  
  let totalCalories = 0;
  
  data.bucket.forEach(bucket => {
    const caloriesDataset = bucket.dataset.find(set => 
      set.dataSourceId.includes('com.google.calories.expended')
    );
    
    if (caloriesDataset?.point?.length) {
      caloriesDataset.point.forEach(point => {
        if (point.value[0]?.fpVal) {
          totalCalories += point.value[0].fpVal;
        }
      });
    }
  });
  
  return Math.round(totalCalories);
};

// Function to format Google Fit data for our health metrics
export const formatGoogleFitData = (data: GoogleFitResponse) => {
  const stepsData = extractStepsData(data);
  const heartRate = extractHeartRateData(data);
  const calories = extractCaloriesData(data);
  
  const timestamp = new Date().toISOString();
  
  return {
    heartRate: {
      name: 'Heart Rate',
      value: heartRate,
      unit: 'bpm',
      timestamp,
      source: 'Google Fit'
    },
    steps: {
      name: 'Steps',
      value: stepsData.length > 0 ? stepsData[stepsData.length - 1].value : 0,
      unit: 'steps',
      timestamp,
      source: 'Google Fit'
    },
    calories: {
      name: 'Calories',
      value: calories,
      unit: 'kcal',
      timestamp,
      source: 'Google Fit'
    }
  };
};

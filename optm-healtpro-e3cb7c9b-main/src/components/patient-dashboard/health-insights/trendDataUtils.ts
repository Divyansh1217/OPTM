
import { FitnessData } from '@/hooks/useFitnessIntegration';
import { TrendDataPoint } from './types';

export const getMuscularTrendData = (): TrendDataPoint[] => {
  return [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 68 },
    { day: 'Wed', value: 72 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 85 },
    { day: 'Sun', value: 88 },
  ];
};

export const getNervousTrendData = (): TrendDataPoint[] => {
  return [
    { day: 'Mon', value: 7 },
    { day: 'Tue', value: 6 },
    { day: 'Wed', value: 5 },
    { day: 'Thu', value: 4 },
    { day: 'Fri', value: 3 },
    { day: 'Sat', value: 3 },
    { day: 'Sun', value: 2 },
  ];
};

export const getSleepTrendData = (): TrendDataPoint[] => {
  return [
    { day: 'Mon', value: 6.5 },
    { day: 'Tue', value: 7.2 },
    { day: 'Wed', value: 8.0 },
    { day: 'Thu', value: 7.5 },
    { day: 'Fri', value: 6.8 },
    { day: 'Sat', value: 8.5 },
    { day: 'Sun', value: 7.8 },
  ];
};

export const getOverallTrendData = (): TrendDataPoint[] => {
  return [
    { day: 'Mon', value: 75 },
    { day: 'Tue', value: 77 },
    { day: 'Wed', value: 80 },
    { day: 'Thu', value: 82 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 87 },
    { day: 'Sun', value: 90 },
  ];
};

export const getHeartRateTrendData = (fitnessData: FitnessData): TrendDataPoint[] => {
  return fitnessData.heartRate.data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    value: item.value
  }));
};

export const getMobilityTrendData = (fitnessData: FitnessData): TrendDataPoint[] => {
  return fitnessData.steps.data.map(item => ({
    day: new Date(item.timestamp).toLocaleDateString([], {weekday: 'short'}),
    value: item.value / 100 // Convert steps to a mobility score
  }));
};

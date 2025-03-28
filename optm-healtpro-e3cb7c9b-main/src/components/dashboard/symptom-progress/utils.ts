
import { ChartData, TrendData } from './types';

/**
 * Calculates the average pain reduction percentage across all symptoms
 * @param symptoms Array of symptom data
 * @returns Rounded percentage of pain reduction
 */
export const calculatePainReduction = (symptoms: ChartData[]): number => {
  if (!symptoms.length) return 0;
  
  const reductions = symptoms.map(symptom => {
    if (!symptom.data.length) return 0;
    
    const firstValue = symptom.data[0].value;
    const lastValue = symptom.data[symptom.data.length - 1].value;
    return firstValue === 0 ? 0 : (firstValue - lastValue) / firstValue * 100;
  });
  
  const avgReduction = reductions.reduce((sum, value) => sum + value, 0) / reductions.length;
  return Math.round(avgReduction);
};

/**
 * Prepares the data for the chart component by combining all symptom datasets
 * @param symptoms Array of symptom data
 * @returns Formatted data ready for Recharts
 */
export const prepareChartData = (symptoms: ChartData[]) => {
  if (!symptoms.length || !symptoms[0].data.length) return [];
  
  return symptoms[0].data.map((item, index) => {
    const dataPoint: any = {
      name: item.name
    };
    symptoms.forEach(symptom => {
      if (symptom.data[index]) {
        dataPoint[symptom.symptomName] = symptom.data[index].value;
      }
    });
    return dataPoint;
  });
};

/**
 * Calculates weekly and monthly trends for a symptom
 * @param symptom The symptom data to analyze
 * @returns Object containing weekly and monthly change percentages
 */
export const calculateTrend = (symptom: ChartData): TrendData => {
  if (!symptom.data.length) {
    return { weeklyChange: 0, monthlyChange: 0 };
  }
  
  const data = symptom.data;
  const lastValue = data[data.length - 1].value;
  
  // Weekly trend (last 7 entries or less if not available)
  const weeklyData = data.length >= 7 ? data.slice(-7) : data;
  const weekStartValue = weeklyData[0].value;
  const weeklyChange = weekStartValue === 0 ? 0 : 
    ((lastValue - weekStartValue) / weekStartValue) * 100;
  
  // Monthly trend (last 30 entries or less if not available)
  const monthlyData = data.length >= 30 ? data.slice(-30) : data;
  const monthStartValue = monthlyData[0].value;
  const monthlyChange = monthStartValue === 0 ? 0 : 
    ((lastValue - monthStartValue) / monthStartValue) * 100;
  
  return {
    weeklyChange: Math.round(weeklyChange),
    monthlyChange: Math.round(monthlyChange)
  };
};

/**
 * Gets a color based on the pain level
 * @param painLevel Pain level from 0-10
 * @returns Appropriate color for the pain level
 */
export const getPainLevelColor = (painLevel: number): string => {
  if (painLevel <= 3) return 'text-medical-green';
  if (painLevel <= 6) return 'text-medical-yellow';
  return 'text-medical-red';
};

/**
 * Creates a formatted display string for a date
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


import { ChartData } from './types';

// Generate sample data for symptom trends visualization
export const generateMockSymptomData = (): ChartData[] => {
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (13 - i));
    return date.toISOString().split('T')[0];
  });
  
  return [
    {
      symptomName: 'Lower Back Pain',
      color: '#ef4444',
      data: dates.map((date, index) => ({
        date,
        name: date.slice(-2), // Use day for display
        value: Math.max(1, 8 - Math.floor(index / 2)),
      })),
    },
    {
      symptomName: 'Neck Pain',
      color: '#f97316',
      data: dates.map((date, index) => ({
        date,
        name: date.slice(-2),
        value: Math.max(1, 7 - Math.floor(index / 3)),
      })),
    },
    {
      symptomName: 'Shoulder Pain',
      color: '#3b82f6',
      data: dates.map((date, index) => ({
        date,
        name: date.slice(-2),
        value: Math.min(10, 3 + Math.sin(index / 2) * 2),
      })),
    },
  ];
};

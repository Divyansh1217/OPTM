
import { useState, useEffect } from 'react';
import { useSymptoms } from '@/contexts/SymptomContext';
import { ChartData } from './types';
import { calculatePainReduction, prepareChartData } from './utils';
import { generateMockSymptomData } from './mockData';

// Custom hook to prepare and manage symptom progress data
export const useSymptomProgress = () => {
  const { symptoms: patientSymptoms } = useSymptoms();
  const [symptoms, setSymptoms] = useState<ChartData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [painReduction, setPainReduction] = useState(0);
  
  useEffect(() => {
    // If we have patient symptoms from context, transform them
    if (patientSymptoms.length > 0) {
      // Group symptoms by name and location
      const groupedSymptoms = patientSymptoms.reduce((acc, symptom) => {
        const key = `${symptom.symptomName}-${symptom.location}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(symptom);
        return acc;
      }, {} as Record<string, typeof patientSymptoms>);
      
      // Transform to chart data format
      const transformedSymptoms = Object.entries(groupedSymptoms).map(([key, entries], index) => {
        // Use predefined colors or generate based on index
        const colors = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#8b5cf6'];
        
        return {
          symptomName: entries[0].symptomName,
          color: colors[index % colors.length],
          data: entries.map(entry => ({
            date: entry.date.toISOString().split('T')[0],
            name: entry.date.getDate().toString(),
            value: entry.painLevel
          })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        };
      });
      
      setSymptoms(transformedSymptoms);
    } else {
      // Use mock data if no patient symptoms
      setSymptoms(generateMockSymptomData());
    }
  }, [patientSymptoms]);
  
  useEffect(() => {
    if (symptoms.length > 0) {
      // Prepare data for the chart
      setChartData(prepareChartData(symptoms));
      
      // Calculate pain reduction
      setPainReduction(calculatePainReduction(symptoms));
    }
  }, [symptoms]);
  
  return {
    symptoms,
    chartData,
    painReduction,
  };
};


import React from 'react';
import SymptomChart from '../SymptomChart';
import { ChartData } from '../types';

export interface ChartSectionProps {
  symptoms: ChartData[];
  chartData: any[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ symptoms, chartData }) => {
  return (
    <SymptomChart 
      symptoms={symptoms}
      chartData={chartData}
    />
  );
};

export default ChartSection;

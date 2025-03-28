
import React from 'react';
import { useSymptomProgress } from './symptom-progress/useSymptomProgress';
import { SymptomProgressChartProps } from './symptom-progress/types';
import { 
  PainReductionSummary,
  ChartSection,
  SymptomDetails
} from './symptom-progress/progress-chart';

const SymptomProgressChart: React.FC<SymptomProgressChartProps> = ({ className }) => {
  const { symptoms, chartData, painReduction } = useSymptomProgress();
  
  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-4">Symptom Progress</h3>
      
      <PainReductionSummary painReduction={painReduction} />
      
      <ChartSection 
        symptoms={symptoms}
        chartData={chartData}
      />
      
      <SymptomDetails symptoms={symptoms} />
    </div>
  );
};

export default SymptomProgressChart;


import React from 'react';
import MedicationImprovementChart from './MedicationImprovementChart';
import { MedicationImprovementData } from '@/types/medicationData';

interface ProgressTabProps {
  improvementData: MedicationImprovementData[];
}

const ProgressTab: React.FC<ProgressTabProps> = ({ improvementData }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Your Progress</h3>
        <p className="text-xs text-muted-foreground">
          Health improvement based on medication adherence
        </p>
      </div>
      
      <MedicationImprovementChart improvementData={improvementData} />
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="border rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Adherence</p>
          <p className="text-lg font-semibold">
            {improvementData.length > 0 
              ? Math.round(improvementData[improvementData.length - 1].adherenceRate) 
              : 0}%
          </p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Health Score</p>
          <p className="text-lg font-semibold">
            {improvementData.length > 0 
              ? Math.round(improvementData[improvementData.length - 1].healthScore) 
              : 0}
          </p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Pain Level</p>
          <p className="text-lg font-semibold">
            {improvementData.length > 0 && improvementData[improvementData.length - 1].symptoms.pain
              ? Math.round(improvementData[improvementData.length - 1].symptoms.pain) 
              : 0}/10
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;

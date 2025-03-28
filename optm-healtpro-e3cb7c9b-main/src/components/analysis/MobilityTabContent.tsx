
import React from 'react';
import MetricsSection from './MetricsSection';

interface MobilityTabContentProps {
  mobilityMetrics: {
    'Shoulder Flexion': { value: number; change: number; unit: string; previous: number };
    'Knee Extension Range': { value: number; change: number; unit: string; previous: number };
    'Active TFL Angle': { value: number; change: number; unit: string; previous: number };
  };
}

const MobilityTabContent: React.FC<MobilityTabContentProps> = ({ mobilityMetrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Joint Mobility Assessment</h3>
          <MetricsSection 
            title="Range of Motion Measurements" 
            metrics={mobilityMetrics} 
            useProgressBar={false}
            maxValue={180}
          />
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Improvement Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The patient demonstrates significant improvements in mobility metrics, particularly in knee extension
            range with a 15-degree increase since the previous assessment.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Substantial improvement in knee extension (+15 degrees)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Moderate improvement in shoulder flexion (+8 degrees)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Positive trend in TFL angle improvements (+3.2 degrees)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobilityTabContent;

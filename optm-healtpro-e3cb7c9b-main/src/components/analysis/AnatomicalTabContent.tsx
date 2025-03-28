
import React from 'react';
import MetricsSection from './MetricsSection';

interface AnatomicalTabContentProps {
  anatomicalMetrics: {
    'Cervical Extension/Flexion (ECF)': { value: number; change: number; unit: string; previous: number };
    'Cervical Circumference (CC)': { value: number; change: number; unit: string; previous: number };
    'Scapulothoracic Angle (STA)': { value: number; change: number; unit: string; previous: number };
  };
}

const AnatomicalTabContent: React.FC<AnatomicalTabContentProps> = ({ anatomicalMetrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Anatomical Measurements</h3>
          <MetricsSection 
            title="Cervical and Thoracic Measurements" 
            metrics={anatomicalMetrics} 
            useProgressBar={false}
            maxValue={180}
          />
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Change Summary</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The patient shows improvements in cervical measurements with a notable increase in circumference 
            and stabilization of the scapulothoracic angle.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Significant increase in cervical circumference (+1.8 cm)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Minor improvement in cervical extension/flexion ratio</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Improved scapulothoracic alignment (+1.1 degrees)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnatomicalTabContent;

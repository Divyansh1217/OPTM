
import React from 'react';
import MetricsSection from './MetricsSection';

interface BiomarkersTabContentProps {
  biomarkers: {
    vcs: { value: number; change: number; unit: string; previous: number };
    jht: { value: number; change: number; unit: string; previous: number };
    rom: { value: number; change: number; unit: string; previous: number };
    force: { value: number; change: number; unit: string; previous: number };
  };
}

const BiomarkersTabContent: React.FC<BiomarkersTabContentProps> = ({ biomarkers }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Functional Biomarkers</h3>
          <MetricsSection 
            title="Core Metrics" 
            metrics={biomarkers} 
            useProgressBar={true}
            maxValue={100}
          />
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The patient shows mixed biomarker results with improvements in ROM and force metrics,
            but no significant change in VCS and a slight decrease in JHT performance.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>No change in Voluntary Control Score (VCS)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Slight decrease in Jebsen Hand Test time (-0.2s)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Improved Range of Motion (+5 degrees)</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Significant increase in strength (+2.1 kg)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BiomarkersTabContent;

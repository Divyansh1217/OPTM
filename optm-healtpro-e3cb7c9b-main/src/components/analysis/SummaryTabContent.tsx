
import React from 'react';
import MuscleImprovementChart from './MuscleImprovementChart';
import TreatmentRecommendations from './TreatmentRecommendations';
import ProgressRadarChart from './ProgressRadarChart';
import MetricsSection from './MetricsSection';

interface PatientMetrics {
  vcs: { value: number; change: number; unit: string; previous: number };
  jht: { value: number; change: number; unit: string; previous: number };
  rom: { value: number; change: number; unit: string; previous: number };
  force: { value: number; change: number; unit: string; previous: number };
  anatomical: Record<string, { value: number; change: number; unit: string; previous: number }>;
  mobility: Record<string, { value: number; change: number; unit: string; previous: number }>;
}

interface SummaryTabContentProps {
  metrics: PatientMetrics;
}

const SummaryTabContent: React.FC<SummaryTabContentProps> = ({ metrics }) => {
  const biomarkers = {
    'VCS': metrics.vcs,
    'JHT': metrics.jht,
    'ROM': metrics.rom,
    'Force': metrics.force
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Key Metrics Overview</h3>
          
          {/* Visualization for before/after comparison */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Before vs After Comparison</h4>
            <div className="rounded-lg border p-4 bg-card">
              <MuscleImprovementChart metrics={metrics} />
            </div>
          </div>
          
          <div className="space-y-4">
            <MetricsSection 
              title="Biomarkers" 
              metrics={biomarkers} 
              useProgressBar={true} 
            />
            
            <MetricsSection 
              title="Anatomical" 
              metrics={metrics.anatomical} 
              useProgressBar={false} 
              maxValue={100} 
            />
            
            <MetricsSection 
              title="Mobility" 
              metrics={metrics.mobility} 
              useProgressBar={false} 
              maxValue={180} 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Treatment Recommendations</h3>
          <TreatmentRecommendations />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Progress Overview
          <span className="text-sm font-normal text-muted-foreground">Comparison of progress across all metrics</span>
        </h3>
        <div className="h-80 w-full">
          <ProgressRadarChart />
        </div>
      </div>
    </div>
  );
};

export default SummaryTabContent;

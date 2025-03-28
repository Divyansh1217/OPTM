
import React, { Suspense } from 'react';
import { ComponentSkeleton } from './ComponentSkeleton';
import { HealthMetric } from '@/types/health';

const EnhancedMetricsOverview = React.lazy(() => import('@/components/patient-dashboard/EnhancedMetricsOverview'));
const EnhancedBiologicalAgeMeter = React.lazy(() => import('@/components/patient-dashboard/EnhancedBiologicalAgeMeter'));

interface MetricsAndAgeSectionProps {
  healthMetrics: HealthMetric[];
  biologicalAge: number;
  chronologicalAge: number;
}

const MetricsAndAgeSection: React.FC<MetricsAndAgeSectionProps> = ({
  healthMetrics,
  biologicalAge,
  chronologicalAge
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Suspense fallback={<ComponentSkeleton />}>
          <EnhancedMetricsOverview metrics={healthMetrics || []} />
        </Suspense>
      </div>
      <div className="md:col-span-1">
        <Suspense fallback={<ComponentSkeleton />}>
          <EnhancedBiologicalAgeMeter 
            biologicalAge={biologicalAge} 
            chronologicalAge={chronologicalAge} 
          />
        </Suspense>
      </div>
    </div>
  );
};

export default MetricsAndAgeSection;

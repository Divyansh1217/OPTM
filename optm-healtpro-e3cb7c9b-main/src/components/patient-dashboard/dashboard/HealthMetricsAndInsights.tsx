
import React, { Suspense } from 'react';
import { ComponentSkeleton } from './ComponentSkeleton';
import { HealthMetric } from '@/types/health';
import { FitnessData } from '@/hooks/useFitnessIntegration';

const RealTimeHealthMetrics = React.lazy(() => import('@/components/patient-dashboard/RealTimeHealthMetrics'));
const AIHealthInsights = React.lazy(() => import('@/components/patient-dashboard/AIHealthInsights'));

interface HealthMetricsAndInsightsProps {
  healthMetrics: HealthMetric[];
  fitnessData: FitnessData;
}

const HealthMetricsAndInsights: React.FC<HealthMetricsAndInsightsProps> = ({
  healthMetrics,
  fitnessData
}) => {
  return (
    <>
      {healthMetrics && healthMetrics.length > 0 && (
        <Suspense fallback={<ComponentSkeleton />}>
          <RealTimeHealthMetrics metrics={healthMetrics} />
        </Suspense>
      )}
      
      {fitnessData && Object.keys(fitnessData).length > 0 && (
        <Suspense fallback={<ComponentSkeleton />}>
          <AIHealthInsights fitnessData={fitnessData} />
        </Suspense>
      )}
    </>
  );
};

export default HealthMetricsAndInsights;

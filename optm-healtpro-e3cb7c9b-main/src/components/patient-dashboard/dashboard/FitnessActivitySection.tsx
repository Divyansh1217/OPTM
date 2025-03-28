
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ComponentSkeleton } from './ComponentSkeleton';
import { FitnessData } from '@/hooks/useFitnessIntegration';

const FitnessDataCharts = React.lazy(() => import('@/components/dashboard/FitnessDataCharts'));

interface FitnessActivitySectionProps {
  hasConnectedApps: boolean;
  fitnessData: FitnessData;
  onSyncData: () => Promise<void>;
}

const FitnessActivitySection: React.FC<FitnessActivitySectionProps> = ({
  hasConnectedApps,
  fitnessData,
  onSyncData
}) => {
  if (!hasConnectedApps) return null;
  
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Fitness Activity</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSyncData}
          className="gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Data</span>
        </Button>
      </div>
      
      <Suspense fallback={<ComponentSkeleton />}>
        <FitnessDataCharts fitnessData={fitnessData} />
      </Suspense>
    </>
  );
};

export default FitnessActivitySection;

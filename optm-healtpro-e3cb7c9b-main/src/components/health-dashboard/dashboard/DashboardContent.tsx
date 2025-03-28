
import React from 'react';
import HealthMetricsOverview from '../HealthMetricsOverview';
import DetailedMetricsTabs from './DetailedMetricsTabs';
import HealthSync from '../HealthSync';
import { TimeRange } from '@/services/health';
import { useHealthData } from '@/hooks/health';

interface DashboardContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedTimeRange: TimeRange;
  metrics: ReturnType<typeof useHealthData>['metrics'];
  metricsHistory: ReturnType<typeof useHealthData>['metricsHistory'];
  connections: ReturnType<typeof useHealthData>['connections'];
  lastSyncTime: Date | null;
  isLoading: boolean;
  isSyncing: boolean;
  onSyncClick: () => Promise<void>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  setActiveTab,
  selectedTimeRange,
  metrics,
  metricsHistory,
  connections,
  lastSyncTime,
  isLoading,
  isSyncing,
  onSyncClick
}) => {
  return (
    <>
      <HealthMetricsOverview 
        metrics={metrics}
        isLoading={isLoading}
        className="mb-6"
      />
      
      <DetailedMetricsTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTimeRange={selectedTimeRange}
        metricsHistory={metricsHistory}
        isLoading={isLoading}
      />
      
      <HealthSync 
        connections={connections}
        lastSyncTime={lastSyncTime}
        onManualSync={onSyncClick}
        isSyncing={isSyncing}
      />
    </>
  );
};

export default DashboardContent;

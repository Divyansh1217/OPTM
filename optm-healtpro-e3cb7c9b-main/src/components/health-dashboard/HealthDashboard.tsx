
import React, { useState } from 'react';
import { useHealthData } from '@/hooks/health';
import { TimeRange } from '@/services/health';
import { 
  DashboardHeader,
  TimeRangeSelector,
  ConnectPrompt,
  DashboardContent
} from './dashboard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import GoogleFitConnect from '@/components/integrations/GoogleFitConnect';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import ActivityTimeline from '@/components/health-dashboard/ActivityTimeline';
import HeartRateMonitor from '@/components/health-dashboard/HeartRateMonitor';
import SleepAnalysis from '@/components/health-dashboard/SleepAnalysis';
import HealthMetricsOverview from '@/components/health-dashboard/HealthMetricsOverview';
import HealthSync from '@/components/health-dashboard/HealthSync';
import WorkoutSummary from '@/components/health-dashboard/workout-summary';

interface HealthDashboardProps {
  className?: string;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('week');
  
  const { 
    metrics, 
    metricsHistory,
    isLoading, 
    isSyncing, 
    lastSyncTime,
    hasGoogleFitConnected,
    connections,
    syncData,
    setTimeRange
  } = useHealthData({
    autoSync: true,
    syncInterval: 30000, // 30 seconds
    defaultTimeRange: selectedTimeRange
  });
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
    setTimeRange(range);
  };
  
  const handleSyncClick = async () => {
    await syncData(true);
  };
  
  return (
    <div className={className}>
      <DashboardHeader 
        hasGoogleFitConnected={hasGoogleFitConnected}
        isSyncing={isSyncing}
        onSyncClick={handleSyncClick}
      />
      
      <TimeRangeSelector
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />
      
      {!hasGoogleFitConnected ? (
        <ConnectPrompt />
      ) : (
        <DashboardContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTimeRange={selectedTimeRange}
          metrics={metrics}
          metricsHistory={metricsHistory}
          connections={connections}
          lastSyncTime={lastSyncTime}
          isLoading={isLoading}
          isSyncing={isSyncing}
          onSyncClick={handleSyncClick}
        />
      )}
    </div>
  );
};

export default HealthDashboard;

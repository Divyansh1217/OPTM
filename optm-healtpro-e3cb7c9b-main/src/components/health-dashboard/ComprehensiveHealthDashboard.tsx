
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar, Activity, Heart, Zap, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { HealthMetric, TimeRange } from '@/services/health/types';

import HealthMetricsOverview from './HealthMetricsOverview';
import ActivityTimeline from './ActivityTimeline';
import HeartRateMonitor from './HeartRateMonitor';
import SleepAnalysis from './SleepAnalysis';

interface HealthData {
  vitalSigns: {
    heartRate: any;
    bloodPressure: any;
    bodyTemperature: any;
    oxygenSaturation: any;
  };
  activity: {
    steps: number;
    distance: number;
    caloriesBurned: number;
    activeMinutes: number;
  };
  sleep: {
    duration: number;
    quality: 'excellent' | 'good' | 'fair' | 'poor';
    deepSleep: number;
    remSleep: number;
    lightSleep: number;
  };
}

interface ComprehensiveHealthDashboardProps {
  healthData: HealthData;
  isLoading: boolean;
  lastSynced?: string;
  onSyncClick: () => Promise<void>;
}

const ComprehensiveHealthDashboard: React.FC<ComprehensiveHealthDashboardProps> = ({
  healthData,
  isLoading,
  lastSynced,
  onSyncClick
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  
  const handleSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    try {
      await onSyncClick();
    } finally {
      setIsSyncing(false);
    }
  };
  
  const formattedLastSync = lastSynced 
    ? new Date(lastSynced).toLocaleString()
    : 'Never';

  // Convert sleep data to HealthMetric[] format for SleepAnalysis
  const sleepMetrics: HealthMetric[] = healthData?.sleep ? [
    {
      id: "sleep-duration",
      userId: "current-user",
      type: "sleep",
      value: healthData.sleep.duration,
      unit: "hours",
      timestamp: new Date().toISOString(),
      source: "health_app",
      metadata: {
        sleepStages: {
          deep: healthData.sleep.deepSleep,
          light: healthData.sleep.lightSleep,
          rem: healthData.sleep.remSleep,
          awake: 0
        },
        quality: healthData.sleep.quality
      }
    }
  ] : [];
  
  // Create metrics record from health data that correctly implements HealthMetric
  const metrics: Record<string, HealthMetric | null> = {
    steps: healthData?.activity?.steps ? {
      id: "steps-current",
      userId: "current-user",
      type: "steps",
      value: healthData.activity.steps,
      unit: 'steps',
      timestamp: new Date().toISOString(),
      source: "health_app"
    } : null,
    calories: healthData?.activity?.caloriesBurned ? {
      id: "calories-current",
      userId: "current-user",
      type: "calories",
      value: healthData.activity.caloriesBurned,
      unit: 'kcal',
      timestamp: new Date().toISOString(),
      source: "health_app"
    } : null,
    heart_rate: healthData?.vitalSigns?.heartRate ? {
      id: "heart-rate-current",
      userId: "current-user",
      type: "heart_rate",
      value: healthData.vitalSigns.heartRate.value,
      unit: 'bpm',
      timestamp: new Date().toISOString(),
      source: "health_app"
    } : null,
    distance: healthData?.activity?.distance ? {
      id: "distance-current",
      userId: "current-user",
      type: "distance",
      value: healthData.activity.distance,
      unit: 'km',
      timestamp: new Date().toISOString(),
      source: "health_app"
    } : null
  };
  
  return (
    <Card className="bg-card border-border/40">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl md:text-2xl">Health Dashboard</CardTitle>
            <CardDescription>
              {lastSynced ? (
                <>Last updated: {formattedLastSync}</>
              ) : (
                <>Connect Google Fit to see your health data</>
              )}
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5"
            onClick={handleSync}
            disabled={isSyncing || isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Data'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="heart" className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Heart</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-1.5">
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline">Sleep</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0 pt-0">
            <HealthMetricsOverview 
              metrics={metrics} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="heart" className="mt-0 pt-0">
            <HeartRateMonitor 
              heartRateData={healthData?.vitalSigns?.heartRate} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0 pt-0">
            <ActivityTimeline 
              stepsData={[]}
              caloriesData={[]}
              distanceData={[]}
              timeRange="day"
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0 pt-0">
            <SleepAnalysis 
              sleepData={sleepMetrics} 
              timeRange="day"
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveHealthDashboard;

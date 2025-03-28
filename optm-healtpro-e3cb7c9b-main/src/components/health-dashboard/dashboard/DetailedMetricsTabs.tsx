
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeRange } from '@/services/health';
import ActivityTimeline from '../ActivityTimeline';
import HeartRateMonitor from '../HeartRateMonitor';
import WorkoutSummary from '../workout-summary';
import SleepAnalysis from '../SleepAnalysis';

interface DetailedMetricsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedTimeRange: TimeRange;
  metricsHistory: any;
  isLoading: boolean;
}

const DetailedMetricsTabs: React.FC<DetailedMetricsTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedTimeRange,
  metricsHistory,
  isLoading
}) => {
  return (
    <Card className="mb-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="pb-0">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <CardContent className="pt-6">
          <TabsContent value="overview" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActivityTimeline 
                stepsData={metricsHistory.steps}
                caloriesData={metricsHistory.calories}
                distanceData={metricsHistory.distance}
                timeRange={selectedTimeRange as TimeRange}
                isLoading={isLoading}
              />
              <HeartRateMonitor 
                heartRateData={metricsHistory.heart_rate}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="m-0">
            <ActivityTimeline 
              stepsData={metricsHistory.steps}
              caloriesData={metricsHistory.calories}
              distanceData={metricsHistory.distance}
              timeRange={selectedTimeRange as TimeRange}
              isLoading={isLoading}
              showDetails={true}
            />
          </TabsContent>
          
          <TabsContent value="heart" className="m-0">
            <HeartRateMonitor 
              heartRateData={metricsHistory.heart_rate}
              isLoading={isLoading}
              showDetails={true}
            />
          </TabsContent>
          
          <TabsContent value="sleep" className="m-0">
            <SleepAnalysis 
              sleepData={metricsHistory.sleep}
              timeRange={selectedTimeRange as TimeRange}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="workouts" className="m-0">
            <WorkoutSummary 
              workoutData={metricsHistory.workout}
              timeRange={selectedTimeRange as TimeRange}
              isLoading={isLoading}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default DetailedMetricsTabs;

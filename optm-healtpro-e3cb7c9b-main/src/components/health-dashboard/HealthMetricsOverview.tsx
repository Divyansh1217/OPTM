
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric } from '@/services/health';
import { Activity, TrendingUp, Flame, Heart } from 'lucide-react';

interface HealthMetricsOverviewProps {
  metrics: Record<string, HealthMetric | null>;
  isLoading: boolean;
  className?: string;
}

const HealthMetricsOverview: React.FC<HealthMetricsOverviewProps> = ({ 
  metrics, 
  isLoading, 
  className 
}) => {
  const steps = metrics.steps?.value || 0;
  const calories = metrics.calories?.value || 0;
  const heartRate = metrics.heart_rate?.value || 0;
  const distance = metrics.distance?.value || 0;
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Steps
          </CardTitle>
          <CardDescription>Daily step count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? 'Loading...' : steps}</div>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Fetching data...' : 'Steps taken today'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flame className="h-5 w-5 mr-2 text-orange-500" />
            Calories
          </CardTitle>
          <CardDescription>Calories burned today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? 'Loading...' : calories}</div>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Fetching data...' : 'Total calories burned'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Heart Rate
          </CardTitle>
          <CardDescription>Current heart rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? 'Loading...' : heartRate} bpm</div>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Fetching data...' : 'Real-time heart rate'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Distance
          </CardTitle>
          <CardDescription>Distance traveled today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? 'Loading...' : distance} km</div>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Fetching data...' : 'Total distance covered'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsOverview;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric } from '@/services/health';
import { Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface HeartRateMonitorProps {
  heartRateData: HealthMetric[];
  isLoading: boolean;
  showDetails?: boolean;
}

const HeartRateMonitor: React.FC<HeartRateMonitorProps> = ({
  heartRateData,
  isLoading,
  showDetails = false
}) => {
  // Format data for charts
  const formatChartData = () => {
    if (!heartRateData || heartRateData.length === 0) {
      return [];
    }
    
    // Sort by timestamp
    const sortedData = [...heartRateData].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Format for chart
    return sortedData.map(metric => ({
      timestamp: new Date(metric.timestamp).toLocaleString(),
      value: metric.value
    }));
  };
  
  const chartData = formatChartData();
  
  // Calculate statistics
  const calculateStats = () => {
    if (!heartRateData || heartRateData.length === 0) {
      return { avg: 0, min: 0, max: 0 };
    }
    
    const values = heartRateData.map(metric => Number(metric.value));
    const sum = values.reduce((a, b) => a + b, 0);
    
    return {
      avg: Math.round(sum / values.length),
      min: Math.min(...values),
      max: Math.max(...values)
    };
  };
  
  const stats = calculateStats();
  
  // Define heart rate zones
  const getHeartRateZone = (bpm: number) => {
    if (bpm < 60) return { zone: 'Rest', color: 'text-blue-500' };
    if (bpm < 100) return { zone: 'Normal', color: 'text-green-500' };
    if (bpm < 140) return { zone: 'Moderate', color: 'text-yellow-500' };
    if (bpm < 170) return { zone: 'Intense', color: 'text-orange-500' };
    return { zone: 'Maximum', color: 'text-red-500' };
  };
  
  const currentZone = getHeartRateZone(stats.avg);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Heart Rate Monitor
        </CardTitle>
        <CardDescription>
          Your heart rate measurements over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-2xl font-bold">{stats.avg} <span className="text-sm font-normal">bpm</span></p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Minimum</p>
            <p className="text-2xl font-bold">{stats.min} <span className="text-sm font-normal">bpm</span></p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Maximum</p>
            <p className="text-2xl font-bold">{stats.max} <span className="text-sm font-normal">bpm</span></p>
          </div>
        </div>
        
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="timestamp" 
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }}
              />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} fontSize={12} />
              <Tooltip 
                formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                labelFormatter={(label) => `Time: ${new Date(label).toLocaleTimeString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
                name="Heart Rate" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
              <ReferenceLine y={60} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Rest', position: 'insideTopLeft', fontSize: 10 }} />
              <ReferenceLine y={100} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'Normal', position: 'insideTopLeft', fontSize: 10 }} />
              <ReferenceLine y={140} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'Moderate', position: 'insideTopLeft', fontSize: 10 }} />
              <ReferenceLine y={170} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'Intense', position: 'insideTopLeft', fontSize: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {showDetails && (
          <div className="mt-6">
            <Card className="bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-red-800 dark:text-red-400">Current Heart Rate Zone</p>
                    <h4 className={`text-lg font-bold ${currentZone.color}`}>{currentZone.zone}</h4>
                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                      {currentZone.zone === 'Rest' && 'Your heart rate is low, typical during sleep or deep relaxation.'}
                      {currentZone.zone === 'Normal' && 'Your heart rate is in the normal resting range.'}
                      {currentZone.zone === 'Moderate' && 'Light to moderate exercise intensity, good for cardiovascular health.'}
                      {currentZone.zone === 'Intense' && 'Higher intensity workout zone, improving cardio fitness.'}
                      {currentZone.zone === 'Maximum' && 'Near maximum effort, typically during intense exercise.'}
                    </p>
                  </div>
                  <Heart className="h-12 w-12 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeartRateMonitor;

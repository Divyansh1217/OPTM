
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Thermometer, Droplet } from 'lucide-react';
import { HealthMetric } from '@/types/health';

interface MetricsOverviewProps {
  metrics: HealthMetric[];
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  // Default metrics if none provided
  const defaultMetrics: HealthMetric[] = [
    {
      id: '1',
      name: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      change: 0,
      status: 'normal',
      trend: 'stable',
      icon: <Heart className="h-4 w-4 text-rose-500" />
    },
    {
      id: '2',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      icon: <Activity className="h-4 w-4 text-indigo-500" />
    },
    {
      id: '3',
      name: 'Temperature',
      value: 98.6,
      unit: '°F',
      status: 'normal',
      icon: <Thermometer className="h-4 w-4 text-amber-500" />
    },
    {
      id: '4',
      name: 'Oxygen Saturation',
      value: 98,
      unit: '%',
      status: 'normal',
      icon: <Droplet className="h-4 w-4 text-sky-500" />
    }
  ];

  const metricsToDisplay = metrics && metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metricsToDisplay.map((metric) => (
            <div key={metric.id} className="flex items-start space-x-3 rounded-md border p-3">
              <div className="mt-0.5">
                {metric.icon}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">{metric.name}</p>
                <div className="flex items-baseline">
                  <p className="text-sm font-semibold">
                    {metric.value}
                    <span className="ml-1 font-normal text-xs text-muted-foreground">
                      {metric.unit}
                    </span>
                  </p>
                  {metric.change && (
                    <span className={`ml-2 text-xs ${metric.change > 0 ? 'text-green-500' : metric.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {metric.change > 0 ? '↑' : metric.change < 0 ? '↓' : '→'} 
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsOverview;

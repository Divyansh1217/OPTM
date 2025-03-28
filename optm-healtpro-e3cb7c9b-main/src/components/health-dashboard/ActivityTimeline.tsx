
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HealthMetric, TimeRange } from '@/services/health';
import { Activity, ChevronRight } from 'lucide-react';

interface ActivityTimelineProps {
  stepsData: HealthMetric[];
  caloriesData: HealthMetric[];
  distanceData: HealthMetric[];
  timeRange: TimeRange;
  isLoading: boolean;
  showDetails?: boolean;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  stepsData, 
  caloriesData, 
  distanceData, 
  timeRange,
  isLoading,
  showDetails = false
}) => {
  // Combine relevant metric histories into a single activity array
  const activities: HealthMetric[] = React.useMemo(() => {
    // Combine and sort by timestamp
    return [...stepsData, ...caloriesData, ...distanceData]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [stepsData, caloriesData, distanceData]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Activity Timeline
        </CardTitle>
        <CardDescription>
          Recent activities for {timeRange} time range
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <p>Loading activities...</p>
        ) : activities.length === 0 ? (
          <p>No recent activities found.</p>
        ) : (
          <ul className="list-none p-0 m-0">
            {activities.map((activity) => (
              <li key={activity.id} className="py-2 border-b last:border-b-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {activity.type === 'steps' ? 'Steps' : 
                       activity.type === 'calories' ? 'Calories' : 
                       activity.type === 'distance' ? 'Distance' : 'Activity'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      {activity.value} {activity.unit}
                    </p>
                  </div>
                  {showDetails && (
                    <Button size="sm" variant="outline">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;

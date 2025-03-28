
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ThermometerIcon, ArrowUp, ArrowDown, MinusIcon } from 'lucide-react';

const mockSymptoms = [
  { 
    id: 's1', 
    name: 'Headache', 
    severity: 'mild',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    trend: 'improving'
  },
  { 
    id: 's2', 
    name: 'Fatigue', 
    severity: 'moderate',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    trend: 'stable'
  },
  { 
    id: 's3', 
    name: 'Joint Pain', 
    severity: 'moderate',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    trend: 'worsening'
  }
];

const RecentSymptoms: React.FC = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <ArrowDown className="h-3.5 w-3.5 text-green-500" />;
      case 'worsening':
        return <ArrowUp className="h-3.5 w-3.5 text-red-500" />;
      case 'stable':
      default:
        return <MinusIcon className="h-3.5 w-3.5 text-amber-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        {mockSymptoms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ThermometerIcon className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No Recent Symptoms</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't reported any symptoms recently.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockSymptoms.map(symptom => (
              <div key={symptom.id} className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{symptom.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColor(symptom.severity)}`}>
                          {symptom.severity}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          {getTrendIcon(symptom.trend)}
                          <span className="ml-1">{symptom.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(symptom.date)}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-2">
              <button className="text-xs text-primary hover:underline flex items-center">
                View all symptoms
                <ArrowUp className="ml-1 h-3 w-3 rotate-90" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSymptoms;

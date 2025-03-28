
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Zap } from 'lucide-react';

interface SleepInsightsProps {
  averageSleepMinutes: number;
  sleepQualityScore: number;
}

const SleepInsights: React.FC<SleepInsightsProps> = ({ 
  averageSleepMinutes, 
  sleepQualityScore 
}) => {
  return (
    <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-1">
              <Zap className="h-4 w-4 text-yellow-500 mr-1" />
              <p className="text-xs font-medium text-blue-800 dark:text-blue-400">Sleep Insights</p>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {averageSleepMinutes < 420 ? (
                "You're averaging less than 7 hours of sleep. Aim for 7-9 hours for optimal health."
              ) : averageSleepMinutes > 540 ? (
                "You're averaging more than 9 hours of sleep. While this might be what your body needs, consider consulting your doctor if you feel excessively tired."
              ) : (
                "You're averaging between 7-9 hours of sleep, which is the recommended amount for adults."
              )}
              {sleepQualityScore < 70 ? (
                " Your sleep quality could be improved. Try maintaining a consistent sleep schedule."
              ) : (
                " Your sleep quality is good. Keep maintaining your healthy sleep habits."
              )}
            </p>
          </div>
          <Moon className="h-8 w-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepInsights;

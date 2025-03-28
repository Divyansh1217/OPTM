
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric, TimeRange } from '@/services/health';
import { Moon, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import SleepStagesChart from './sleep-analysis/SleepStagesChart';
import SleepDurationChart from './sleep-analysis/SleepDurationChart';
import SleepMetrics from './sleep-analysis/SleepMetrics';
import SleepInsights from './sleep-analysis/SleepInsights';
import NoSleepData from './sleep-analysis/NoSleepData';
import { 
  processSleepData, 
  calculateAverageSleep, 
  calculateSleepQuality, 
  getSleepQualityText 
} from './sleep-analysis/sleepUtils';

interface SleepAnalysisProps {
  sleepData: HealthMetric[];
  timeRange: TimeRange;
  isLoading: boolean;
}

const SleepAnalysis: React.FC<SleepAnalysisProps> = ({
  sleepData,
  timeRange,
  isLoading
}) => {
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
  
  const { dailySleep, sleepStages } = processSleepData(sleepData);
  const averageSleepMinutes = calculateAverageSleep(dailySleep);
  const averageSleepHours = Math.floor(averageSleepMinutes / 60);
  const averageSleepMinutesRemainder = averageSleepMinutes % 60;
  const sleepQualityScore = calculateSleepQuality(sleepStages);
  const qualityText = getSleepQualityText(sleepQualityScore);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Moon className="h-5 w-5 mr-2 text-blue-500" />
          Sleep Analysis
        </CardTitle>
        <CardDescription>
          Your sleep patterns and quality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SleepMetrics 
          averageSleepHours={averageSleepHours}
          averageSleepMinutesRemainder={averageSleepMinutesRemainder}
          qualityText={qualityText}
          sleepQualityScore={sleepQualityScore}
        />
        
        <SleepDurationChart dailySleep={dailySleep} />
        
        {sleepStages.length > 0 && (
          <SleepStagesChart sleepStages={sleepStages} />
        )}
        
        {dailySleep.length > 0 && (
          <SleepInsights 
            averageSleepMinutes={averageSleepMinutes} 
            sleepQualityScore={sleepQualityScore} 
          />
        )}
        
        {dailySleep.length === 0 && <NoSleepData />}
      </CardContent>
    </Card>
  );
};

export default SleepAnalysis;

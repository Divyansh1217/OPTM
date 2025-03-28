
import { HealthMetric } from '@/services/health/types';

export interface SleepStage {
  date: string;
  deep: number;
  light: number;
  rem: number;
  awake: number;
}

export interface DailySleep {
  date: string;
  value: number;
  unit: string;
}

export interface ProcessedSleepData {
  dailySleep: DailySleep[];
  sleepStages: SleepStage[];
}

export const sleepStageNames = {
  deep: 'Deep Sleep',
  light: 'Light Sleep',
  rem: 'REM Sleep',
  awake: 'Awake'
};

export const sleepStageColors = {
  deep: '#3730a3',
  light: '#6366f1',
  rem: '#a5b4fc',
  awake: '#e0e7ff'
};

export const processSleepData = (sleepData: HealthMetric[]): ProcessedSleepData => {
  const dailySleep: DailySleep[] = [];
  const sleepStages: SleepStage[] = [];
  
  // Group sleep data by date
  const groupedByDate = sleepData.reduce((acc, metric) => {
    const date = new Date(metric.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(metric);
    return acc;
  }, {} as Record<string, HealthMetric[]>);
  
  // Process each date's sleep data
  Object.entries(groupedByDate).forEach(([date, metrics]) => {
    // Calculate total sleep duration
    const totalSleep = metrics.reduce((sum, metric) => {
      return sum + (Number(metric.value) || 0);
    }, 0);
    
    dailySleep.push({
      date,
      value: totalSleep,
      unit: metrics[0]?.unit || 'min'
    });
    
    // Extract sleep stages from metadata if available
    const stageData = metrics.find(m => m.metadata?.sleepStages);
    if (stageData?.metadata?.sleepStages) {
      const stages = stageData.metadata.sleepStages as Record<string, number>;
      sleepStages.push({
        date,
        deep: Number(stages.deep) || 0,
        light: Number(stages.light) || 0,
        rem: Number(stages.rem) || 0,
        awake: Number(stages.awake) || 0
      });
    }
  });
  
  // Sort by date ascending
  dailySleep.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  sleepStages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return { dailySleep, sleepStages };
};

export const calculateAverageSleep = (dailySleep: DailySleep[]): number => {
  if (dailySleep.length === 0) return 0;
  
  const totalMinutes = dailySleep.reduce((sum, day) => {
    return sum + (Number(day.value) || 0);
  }, 0);
  
  return Math.round(totalMinutes / dailySleep.length);
};

export const calculateSleepQuality = (sleepStages: SleepStage[]): number => {
  if (sleepStages.length === 0) return 0;
  
  let totalScore = 0;
  
  for (const stage of sleepStages) {
    const totalMinutes = stage.deep + stage.light + stage.rem + stage.awake;
    if (totalMinutes === 0) continue;
    
    // Calculate quality score based on proportions of sleep stages
    // Deep and REM sleep are weighted more heavily as they are most restorative
    const deepProportion = stage.deep / totalMinutes;
    const remProportion = stage.rem / totalMinutes;
    const lightProportion = stage.light / totalMinutes;
    const awakeProportion = stage.awake / totalMinutes;
    
    // Score formula: weight deep and REM sleep more heavily
    const score = (deepProportion * 40) + (remProportion * 30) + 
                  (lightProportion * 20) - (awakeProportion * 30);
    
    // Normalize to 0-100 scale
    const normalizedScore = Math.max(0, Math.min(100, score * 100));
    
    totalScore += normalizedScore;
  }
  
  return Math.round(totalScore / sleepStages.length);
};

export const getSleepQualityText = (qualityScore: number): {text: string, color: string} => {
  if (qualityScore >= 80) return {text: 'Excellent', color: 'text-green-500'};
  if (qualityScore >= 60) return {text: 'Good', color: 'text-blue-500'};
  if (qualityScore >= 40) return {text: 'Fair', color: 'text-yellow-500'};
  if (qualityScore >= 20) return {text: 'Poor', color: 'text-orange-500'};
  return {text: 'Very Poor', color: 'text-red-500'};
};

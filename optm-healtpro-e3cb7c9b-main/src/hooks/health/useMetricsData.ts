
import { useState, useCallback } from 'react';
import { HealthMetric, HealthMetricType, TimeRange } from '@/services/health/types';
import { healthDataService } from '@/services/health/metricsService';

export const useMetricsData = (userId: string | undefined, timeRange: TimeRange) => {
  // Store the latest value for each metric type
  const [metrics, setMetrics] = useState<Record<HealthMetricType, HealthMetric | null>>({
    steps: null,
    heart_rate: null,
    calories: null,
    distance: null,
    sleep: null,
    workout: null
  });
  
  // Store history for each metric type
  const [metricsHistory, setMetricsHistory] = useState<Record<HealthMetricType, HealthMetric[]>>({
    steps: [],
    heart_rate: [],
    calories: [],
    distance: [],
    sleep: [],
    workout: []
  });

  const getMetricHistory = useCallback(async (
    metricType: HealthMetricType,
    range: TimeRange = timeRange
  ): Promise<HealthMetric[]> => {
    if (!userId) return [];
    
    try {
      const data = await healthDataService.getHealthMetrics(userId, metricType, range);
      
      // Update the metrics history state
      setMetricsHistory(prev => ({
        ...prev,
        [metricType]: data
      }));
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${metricType} history:`, error);
      return [];
    }
  }, [userId, timeRange]);

  const loadInitialMetrics = useCallback(async () => {
    if (!userId) return;

    // Load latest metrics for each type
    const metricTypes: HealthMetricType[] = ['steps', 'heart_rate', 'calories', 'distance', 'sleep', 'workout'];
    const latestMetrics: Record<HealthMetricType, HealthMetric | null> = {
      steps: null,
      heart_rate: null,
      calories: null,
      distance: null,
      sleep: null,
      workout: null
    };
    
    // Load metrics in parallel
    await Promise.all(metricTypes.map(async (type) => {
      const metric = await healthDataService.getLatestMetric(userId, type);
      latestMetrics[type] = metric;
      
      // Also load history
      const history = await healthDataService.getHealthMetrics(userId, type, timeRange);
      setMetricsHistory(prev => ({
        ...prev,
        [type]: history
      }));
    }));
    
    setMetrics(latestMetrics);
  }, [userId, timeRange]);

  return {
    metrics,
    metricsHistory,
    getMetricHistory,
    loadInitialMetrics
  };
};

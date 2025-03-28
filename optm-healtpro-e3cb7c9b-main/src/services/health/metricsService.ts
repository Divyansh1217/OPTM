
import { HealthMetric, HealthMetricType, TimeRange } from './types';

// Mock data service for health metrics
export const healthDataService = {
  // Cache to store recently retrieved metrics for quick access
  _cache: new Map<string, HealthMetric>(),
  
  /**
   * Update the cache with a new metric
   */
  updateCache: (metric: HealthMetric): void => {
    const cacheKey = `${metric.userId}-${metric.type}-${metric.id}`;
    healthDataService._cache.set(cacheKey, metric);
  },

  /**
   * Get the latest metric of a specific type for a user
   */
  getLatestMetric: async (userId: string, type: HealthMetricType): Promise<HealthMetric | null> => {
    // This would normally fetch from an API, but for now we're using mock data
    const metrics = await healthDataService.getHealthMetrics(userId, type, 'day');
    return metrics.length > 0 ? metrics[0] : null;
  },

  /**
   * Get health metrics for a specific type and time range
   */
  getHealthMetrics: async (
    userId: string, 
    type: HealthMetricType, 
    timeRange: TimeRange
  ): Promise<HealthMetric[]> => {
    // In a real app, this would fetch from an API based on the time range
    // For now, we're returning mock data
    
    // Generate different amounts of data based on time range
    const daysToGenerate = 
      timeRange === 'day' ? 1 : 
      timeRange === 'week' ? 7 : 
      timeRange === 'month' ? 30 : 365;
    
    // Generate mock data
    const metrics: HealthMetric[] = [];
    const now = new Date();
    
    for (let i = 0; i < daysToGenerate; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate values appropriate for each metric type
      let value = 0;
      let unit = '';
      let metadata = {};
      
      switch (type) {
        case 'steps':
          value = Math.floor(Math.random() * 5000) + 3000; // 3000-8000 steps
          unit = 'steps';
          break;
        case 'heart_rate':
          value = Math.floor(Math.random() * 30) + 60; // 60-90 bpm
          unit = 'bpm';
          metadata = {
            min: value - Math.floor(Math.random() * 10),
            max: value + Math.floor(Math.random() * 15),
            resting: value - Math.floor(Math.random() * 5)
          };
          break;
        case 'calories':
          value = Math.floor(Math.random() * 500) + 1500; // 1500-2000 calories
          unit = 'kcal';
          break;
        case 'distance':
          value = Math.random() * 5 + 1; // 1-6 km
          unit = 'km';
          break;
        case 'sleep':
          value = Math.floor(Math.random() * 120) + 360; // 360-480 minutes (6-8 hours)
          unit = 'min';
          
          // Add sleep stages data for sleep metrics
          const totalSleep = value;
          const deep = Math.floor(totalSleep * (Math.random() * 0.1 + 0.15)); // 15-25% deep sleep
          const rem = Math.floor(totalSleep * (Math.random() * 0.1 + 0.2)); // 20-30% REM
          const awake = Math.floor(totalSleep * (Math.random() * 0.05 + 0.05)); // 5-10% awake
          const light = totalSleep - deep - rem - awake; // Remaining is light sleep
          
          metadata = {
            sleepStages: {
              deep,
              light,
              rem,
              awake
            },
            bedtime: '22:30',
            wakeup: '06:30'
          };
          break;
        case 'workout':
          const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Strength', 'Yoga', 'HIIT'];
          const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
          
          value = 1; // One workout
          unit = 'session';
          metadata = {
            type: workoutType,
            duration: Math.floor(Math.random() * 30) + 30, // 30-60 minutes
            calories: Math.floor(Math.random() * 300) + 200, // 200-500 calories
            distance: Math.random() * 5 + 2, // 2-7 km
            intensity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
          };
          break;
      }
      
      metrics.push({
        id: `${type}-${i}`,
        userId,
        type,
        value,
        unit,
        timestamp: date.toISOString(),
        source: 'health_app',
        metadata
      });
    }
    
    // Sort by most recent first
    return metrics.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
};

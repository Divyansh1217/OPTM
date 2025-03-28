
import { supabase } from '@/integrations/supabase/client';
import { HealthData } from '@/hooks/useHealthData';

/**
 * Process health data using the Supabase Edge Function
 */
export const processHealthData = async (userId: string, healthData: HealthData): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('process-health-data', {
      body: {
        userId,
        healthData
      }
    });
    
    if (error) {
      console.error('Error processing health data:', error);
      return false;
    }
    
    return data.success === true;
  } catch (error) {
    console.error('Error calling process-health-data function:', error);
    return false;
  }
};

/**
 * Simulate data from Google Fit API
 */
export const simulateGoogleFitData = () => {
  // Generate heart rate data
  const heartRate = 65 + Math.floor(Math.random() * 20); // 65-85 bpm
  const previousHeartRate = 65 + Math.floor(Math.random() * 20);
  const heartRateChange = Math.round(((heartRate - previousHeartRate) / previousHeartRate) * 100);
  
  // Generate blood pressure data
  const systolic = 115 + Math.floor(Math.random() * 15); // 115-130 mmHg
  const diastolic = 75 + Math.floor(Math.random() * 10); // 75-85 mmHg
  const previousSystolic = 115 + Math.floor(Math.random() * 15);
  const bpChange = Math.round(((systolic - previousSystolic) / previousSystolic) * 100);
  
  // Generate temperature data
  const temperature = 98.4 + (Math.random() * 0.6); // 98.4-99.0 °F
  
  // Generate oxygen saturation data
  const oxygenSaturation = 96 + Math.floor(Math.random() * 4); // 96-99%
  const previousOxygen = 96 + Math.floor(Math.random() * 4);
  const oxygenChange = Math.round(((oxygenSaturation - previousOxygen) / previousOxygen) * 100);
  
  // Generate activity data
  const steps = 5000 + Math.floor(Math.random() * 7000); // 5000-12000 steps
  const distance = (steps / 1500) + Math.random(); // Rough conversion to km
  const caloriesBurned = steps * 0.05; // Rough estimation
  const activeMinutes = Math.floor(steps / 180); // Rough estimation
  
  // Generate sleep data
  const sleepHours = 6 + Math.random() * 2.5; // 6-8.5 hours
  const deepSleep = sleepHours * (0.15 + Math.random() * 0.1); // 15-25% of total sleep
  const remSleep = sleepHours * (0.2 + Math.random() * 0.1); // 20-30% of total sleep
  const lightSleep = sleepHours - deepSleep - remSleep;
  
  return {
    vitalSigns: {
      heartRate: {
        value: heartRate,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        source: 'Google Fit',
        trend: heartRateChange > 0 ? 'up' as const : heartRateChange < 0 ? 'down' as const : 'stable' as const,
        change: heartRateChange
      },
      bloodPressure: {
        systolic,
        diastolic,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
        source: 'Google Fit',
        trend: bpChange > 0 ? 'up' as const : bpChange < 0 ? 'down' as const : 'stable' as const,
        change: bpChange
      },
      bodyTemperature: {
        value: temperature,
        unit: '°F',
        timestamp: new Date().toISOString(),
        source: 'Google Fit',
        trend: 'stable' as const,
        change: 0
      },
      oxygenSaturation: {
        value: oxygenSaturation,
        unit: '%',
        timestamp: new Date().toISOString(),
        source: 'Google Fit',
        trend: oxygenChange > 0 ? 'up' as const : oxygenChange < 0 ? 'down' as const : 'stable' as const,
        change: oxygenChange
      }
    },
    activity: {
      steps,
      distance: parseFloat(distance.toFixed(2)),
      caloriesBurned: Math.floor(caloriesBurned),
      activeMinutes
    },
    sleep: {
      duration: parseFloat(sleepHours.toFixed(1)),
      quality: sleepHours >= 8 ? 'excellent' as const : sleepHours >= 7 ? 'good' as const : sleepHours >= 6 ? 'fair' as const : 'poor' as const,
      deepSleep: parseFloat(deepSleep.toFixed(1)),
      remSleep: parseFloat(remSleep.toFixed(1)),
      lightSleep: parseFloat(lightSleep.toFixed(1))
    }
  };
};

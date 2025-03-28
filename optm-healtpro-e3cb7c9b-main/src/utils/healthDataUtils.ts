
import { supabase } from '@/integrations/supabase/client';
import { HealthData, VitalSigns, TrendData } from '@/hooks/useHealthData';

/**
 * Save health data to Supabase
 */
export const saveHealthData = async (userId: string, healthData: HealthData) => {
  try {
    // Save vital signs
    await saveVitalSigns(userId, healthData.vitalSigns);
    
    // Save activity data
    const activityData = {
      user_id: userId,
      data_type: 'activity',
      value: healthData.activity.steps, // Store numeric value
      source: 'Google Fit',
      unit: 'steps',
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: healthData.activity
    };
    
    await supabase.from('fitness_data').insert(activityData);
    
    // Save sleep data
    const sleepData = {
      user_id: userId,
      data_type: 'sleep',
      value: healthData.sleep.duration, // Store numeric value
      source: 'Google Fit',
      unit: 'hours',
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: healthData.sleep
    };
    
    await supabase.from('fitness_data').insert(sleepData);
    
    return true;
  } catch (error) {
    console.error('Error saving health data:', error);
    return false;
  }
};

/**
 * Save vital signs to Supabase
 */
const saveVitalSigns = async (userId: string, vitalSigns: VitalSigns) => {
  try {
    // Save heart rate
    const heartRateData = {
      user_id: userId,
      data_type: 'heart_rate',
      value: vitalSigns.heartRate.value, // Numeric value
      source: vitalSigns.heartRate.source,
      unit: vitalSigns.heartRate.unit,
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: {
        trend: vitalSigns.heartRate.trend,
        change: vitalSigns.heartRate.change
      }
    };
    
    await supabase.from('fitness_data').insert(heartRateData);
    
    // Save blood pressure
    const bloodPressureData = {
      user_id: userId,
      data_type: 'blood_pressure',
      value: vitalSigns.bloodPressure.systolic, // Use systolic as the primary value
      source: vitalSigns.bloodPressure.source,
      unit: vitalSigns.bloodPressure.unit,
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: {
        systolic: vitalSigns.bloodPressure.systolic,
        diastolic: vitalSigns.bloodPressure.diastolic,
        trend: vitalSigns.bloodPressure.trend,
        change: vitalSigns.bloodPressure.change
      }
    };
    
    await supabase.from('fitness_data').insert(bloodPressureData);
    
    // Save body temperature
    const temperatureData = {
      user_id: userId,
      data_type: 'body_temperature',
      value: vitalSigns.bodyTemperature.value, // Numeric value
      source: vitalSigns.bodyTemperature.source,
      unit: vitalSigns.bodyTemperature.unit,
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: {
        trend: vitalSigns.bodyTemperature.trend,
        change: vitalSigns.bodyTemperature.change
      }
    };
    
    await supabase.from('fitness_data').insert(temperatureData);
    
    // Save oxygen saturation
    const oxygenData = {
      user_id: userId,
      data_type: 'oxygen_saturation',
      value: vitalSigns.oxygenSaturation.value, // Numeric value
      source: vitalSigns.oxygenSaturation.source,
      unit: vitalSigns.oxygenSaturation.unit,
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      metadata: {
        trend: vitalSigns.oxygenSaturation.trend,
        change: vitalSigns.oxygenSaturation.change
      }
    };
    
    await supabase.from('fitness_data').insert(oxygenData);
    
    return true;
  } catch (error) {
    console.error('Error saving vital signs:', error);
    return false;
  }
};

/**
 * Fetch health data from Supabase
 */
export const fetchHealthDataFromSupabase = async (userId: string): Promise<HealthData | null> => {
  try {
    // Fetch vital signs
    const vitalSigns = await fetchVitalSigns(userId);
    
    // Fetch activity data
    const { data: activityData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'activity')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Fetch sleep data
    const { data: sleepData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'sleep')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Fetch trend data
    const weeklyTrends = await fetchTrendData(userId, 7);
    const monthlyTrends = await fetchTrendData(userId, 30);
    const yearlyTrends = await fetchTrendData(userId, 365);
    
    let activityInfo = {
      steps: 0,
      distance: 0,
      caloriesBurned: 0,
      activeMinutes: 0
    };
    
    if (activityData && activityData.length > 0 && activityData[0].metadata) {
      activityInfo = activityData[0].metadata as any;
    }
    
    let sleepInfo = {
      duration: 0,
      quality: 'fair' as 'poor' | 'fair' | 'good' | 'excellent',
      deepSleep: 0,
      remSleep: 0,
      lightSleep: 0
    };
    
    if (sleepData && sleepData.length > 0 && sleepData[0].metadata) {
      sleepInfo = sleepData[0].metadata as any;
    }
    
    return {
      vitalSigns,
      activity: activityInfo,
      sleep: sleepInfo,
      trends: {
        weekly: weeklyTrends,
        monthly: monthlyTrends,
        yearly: yearlyTrends
      }
    };
  } catch (error) {
    console.error('Error fetching health data:', error);
    return null;
  }
};

/**
 * Fetch vital signs from Supabase
 */
const fetchVitalSigns = async (userId: string): Promise<VitalSigns> => {
  try {
    // Fetch heart rate
    const { data: heartRateData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'heart_rate')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Fetch blood pressure
    const { data: bloodPressureData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'blood_pressure')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Fetch body temperature
    const { data: temperatureData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'body_temperature')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Fetch oxygen saturation
    const { data: oxygenData } = await supabase
      .from('fitness_data')
      .select('*')
      .eq('user_id', userId)
      .eq('data_type', 'oxygen_saturation')
      .order('start_time', { ascending: false })
      .limit(1);
    
    // Default vital signs
    const defaultVitalSigns: VitalSigns = {
      heartRate: {
        value: 72,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      bodyTemperature: {
        value: 98.6,
        unit: '°F',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      oxygenSaturation: {
        value: 98,
        unit: '%',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      }
    };
    
    // Update with actual data if available
    if (heartRateData && heartRateData.length > 0) {
      const metadata = heartRateData[0].metadata as any || {};
      defaultVitalSigns.heartRate = {
        value: Number(heartRateData[0].value),
        unit: heartRateData[0].unit,
        timestamp: heartRateData[0].start_time,
        source: heartRateData[0].source,
        trend: (metadata.trend as 'up' | 'down' | 'stable') || 'stable',
        change: metadata.change || 0
      };
    }
    
    if (bloodPressureData && bloodPressureData.length > 0) {
      const metadata = bloodPressureData[0].metadata as any || {};
      defaultVitalSigns.bloodPressure = {
        systolic: metadata.systolic || 120,
        diastolic: metadata.diastolic || 80,
        unit: bloodPressureData[0].unit,
        timestamp: bloodPressureData[0].start_time,
        source: bloodPressureData[0].source,
        trend: (metadata.trend as 'up' | 'down' | 'stable') || 'stable',
        change: metadata.change || 0
      };
    }
    
    if (temperatureData && temperatureData.length > 0) {
      const metadata = temperatureData[0].metadata as any || {};
      defaultVitalSigns.bodyTemperature = {
        value: Number(temperatureData[0].value),
        unit: temperatureData[0].unit,
        timestamp: temperatureData[0].start_time,
        source: temperatureData[0].source,
        trend: (metadata.trend as 'up' | 'down' | 'stable') || 'stable',
        change: metadata.change || 0
      };
    }
    
    if (oxygenData && oxygenData.length > 0) {
      const metadata = oxygenData[0].metadata as any || {};
      defaultVitalSigns.oxygenSaturation = {
        value: Number(oxygenData[0].value),
        unit: oxygenData[0].unit,
        timestamp: oxygenData[0].start_time,
        source: oxygenData[0].source,
        trend: (metadata.trend as 'up' | 'down' | 'stable') || 'stable',
        change: metadata.change || 0
      };
    }
    
    return defaultVitalSigns;
  } catch (error) {
    console.error('Error fetching vital signs:', error);
    return {
      heartRate: {
        value: 72,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      bodyTemperature: {
        value: 98.6,
        unit: '°F',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      },
      oxygenSaturation: {
        value: 98,
        unit: '%',
        timestamp: new Date().toISOString(),
        source: 'Default',
        trend: 'stable',
        change: 0
      }
    };
  }
};

/**
 * Fetch trend data for a specific time range
 */
const fetchTrendData = async (userId: string, days: number): Promise<TrendData[]> => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // For demonstration, we'll return mock data
    // In a real app, you would query Supabase for the actual data
    
    if (days === 7) {
      // Weekly data (daily points)
      return Array(7).fill(0).map((_, i) => ({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        heartRate: Math.floor(65 + Math.random() * 15),
        steps: Math.floor(5000 + Math.random() * 6000),
        bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
        bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
        temperature: 98.4 + (Math.random() * 0.8 - 0.4),
        oxygenSaturation: Math.floor(96 + Math.random() * 3),
      }));
    } else if (days === 30) {
      // Monthly data (daily points)
      return Array(30).fill(0).map((_, i) => ({
        date: new Date(new Date().setDate(new Date().getDate() - 30 + i)).toISOString().split('T')[0],
        heartRate: Math.floor(65 + Math.random() * 15),
        steps: Math.floor(5000 + Math.random() * 6000),
        bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
        bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
        temperature: 98.4 + (Math.random() * 0.8 - 0.4),
        oxygenSaturation: Math.floor(96 + Math.random() * 3),
      }));
    } else {
      // Yearly data (monthly averages)
      return Array(12).fill(0).map((_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        heartRate: Math.floor(65 + Math.random() * 15),
        steps: Math.floor(5000 + Math.random() * 6000),
        bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
        bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
        temperature: 98.4 + (Math.random() * 0.8 - 0.4),
        oxygenSaturation: Math.floor(96 + Math.random() * 3),
      }));
    }
  } catch (error) {
    console.error('Error fetching trend data:', error);
    return [];
  }
};

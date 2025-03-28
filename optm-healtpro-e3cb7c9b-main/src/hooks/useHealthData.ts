
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { HealthMetric } from '@/types/health';
import { fetchHealthDataFromSupabase } from '@/utils/healthDataUtils';
import { processHealthData, simulateGoogleFitData } from '@/services/health/apiClient';

export interface VitalSigns {
  heartRate: {
    value: number;
    unit: string;
    timestamp: string;
    source: string;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
  };
  bloodPressure: {
    systolic: number;
    diastolic: number;
    unit: string;
    timestamp: string;
    source: string;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
  };
  bodyTemperature: {
    value: number;
    unit: string;
    timestamp: string;
    source: string;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
  };
  oxygenSaturation: {
    value: number;
    unit: string;
    timestamp: string;
    source: string;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
  };
}

export interface TrendData {
  day?: string;
  date?: string;
  month?: string;
  heartRate: number;
  steps: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  oxygenSaturation: number;
}

export interface HealthData {
  vitalSigns: VitalSigns;
  activity: {
    steps: number;
    distance: number;
    caloriesBurned: number;
    activeMinutes: number;
  };
  sleep: {
    duration: number;
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    deepSleep: number;
    remSleep: number;
    lightSleep: number;
  };
  trends?: {
    weekly: TrendData[];
    monthly: TrendData[];
    yearly: TrendData[];
  };
}

export function useHealthData() {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchHealthData = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Fetch health data from Supabase
      const data = await fetchHealthDataFromSupabase(user.id);
      
      if (data) {
        setHealthData(data);
        setLastSynced(new Date());
        return;
      }
      
      // If no data is available in Supabase, use mock data
      const mockHealthData: HealthData = {
        vitalSigns: {
          heartRate: {
            value: 72,
            unit: 'bpm',
            timestamp: new Date().toISOString(),
            source: 'Google Fit',
            trend: 'stable',
            change: 0
          },
          bloodPressure: {
            systolic: 120,
            diastolic: 80,
            unit: 'mmHg',
            timestamp: new Date().toISOString(),
            source: 'Google Fit',
            trend: 'down',
            change: -3
          },
          bodyTemperature: {
            value: 98.6,
            unit: '°F',
            timestamp: new Date().toISOString(),
            source: 'Google Fit',
            trend: 'stable',
            change: 0
          },
          oxygenSaturation: {
            value: 98,
            unit: '%',
            timestamp: new Date().toISOString(),
            source: 'Google Fit',
            trend: 'up',
            change: 1
          }
        },
        activity: {
          steps: 8472,
          distance: 5.2,
          caloriesBurned: 420,
          activeMinutes: 42
        },
        sleep: {
          duration: 7.5,
          quality: 'good',
          deepSleep: 1.5,
          remSleep: 2.0,
          lightSleep: 4.0
        },
        trends: {
          weekly: Array(7).fill(0).map((_, i) => ({
            day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            heartRate: Math.floor(65 + Math.random() * 15),
            steps: Math.floor(5000 + Math.random() * 6000),
            bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
            bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
            temperature: 98.4 + (Math.random() * 0.8 - 0.4),
            oxygenSaturation: Math.floor(96 + Math.random() * 3),
          })),
          monthly: Array(30).fill(0).map((_, i) => ({
            date: new Date(new Date().setDate(new Date().getDate() - 30 + i)).toISOString().split('T')[0],
            heartRate: Math.floor(65 + Math.random() * 15),
            steps: Math.floor(5000 + Math.random() * 6000),
            bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
            bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
            temperature: 98.4 + (Math.random() * 0.8 - 0.4),
            oxygenSaturation: Math.floor(96 + Math.random() * 3),
          })),
          yearly: Array(12).fill(0).map((_, i) => ({
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
            heartRate: Math.floor(65 + Math.random() * 15),
            steps: Math.floor(5000 + Math.random() * 6000),
            bloodPressureSystolic: Math.floor(115 + Math.random() * 10),
            bloodPressureDiastolic: Math.floor(75 + Math.random() * 10),
            temperature: 98.4 + (Math.random() * 0.8 - 0.4),
            oxygenSaturation: Math.floor(96 + Math.random() * 3),
          }))
        }
      };
      
      setHealthData(mockHealthData);
      setLastSynced(new Date());
      
      // Save mock data to Supabase for future use
      if (user) {
        await processHealthData(user.id, mockHealthData);
      }
      
    } catch (err) {
      console.error('Error fetching health data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch health data'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const syncHealthData = useCallback(async () => {
    if (!user) return false;
    
    try {
      toast.info('Syncing health data...');
      
      // In a real application, we would call Google Fit API
      // For demo purposes, we'll simulate Google Fit data
      const simulatedData = simulateGoogleFitData();
      
      // Process the simulated data using the Edge Function
      const success = await processHealthData(user.id, simulatedData);
      
      if (success) {
        // Fetch the updated data
        await fetchHealthData();
        toast.success('Health data synchronized successfully');
        return true;
      } else {
        toast.error('Failed to sync health data');
        return false;
      }
    } catch (error) {
      console.error('Error syncing health data:', error);
      toast.error('Failed to sync health data');
      return false;
    }
  }, [user, fetchHealthData]);

  useEffect(() => {
    fetchHealthData();
    
    // Set up realtime subscription for health data updates
    const healthDataSubscription = supabase
      .channel('health-data-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'fitness_data' },
        (payload) => {
          console.log('New health data received:', payload);
          fetchHealthData();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(healthDataSubscription);
    };
  }, [fetchHealthData]);

  return {
    healthData,
    isLoading,
    error,
    lastSynced,
    syncHealthData
  };
}


import { useState, useCallback, useEffect } from 'react';
import { FitnessData, FitnessProvider } from './types';

export const useDataSync = (
  initialData: FitnessData,
  providers: FitnessProvider[],
  setProviders: React.Dispatch<React.SetStateAction<FitnessProvider[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [fitnessData, setFitnessData] = useState<FitnessData>(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Refresh data for a specific provider
  const refreshProviderData = useCallback(async (providerId: string): Promise<boolean> => {
    const provider = providers.find(p => p.id === providerId);
    
    if (!provider || !provider.isConnected) {
      console.warn(`Provider ${providerId} is not connected or doesn't exist`);
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update provider with new last synced time
      const now = new Date();
      setProviders(prevProviders => 
        prevProviders.map(p => 
          p.id === providerId 
            ? { 
                ...p, 
                lastSynced: now.toISOString(),
                metrics: {
                  steps: Math.floor(Math.random() * 5000) + 3000,
                  calories: Math.floor(Math.random() * 500) + 1500,
                  heartRate: Math.floor(Math.random() * 20) + 60,
                  distance: Math.floor(Math.random() * 5) + 2,
                }
              }
            : p
        )
      );
      
      // Generate new random fitness data
      // In a real app, this would use actual data from the provider
      const newStepsData = fitnessData.steps.data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 6000) + 3000
      }));
      
      const newHeartRateData = fitnessData.heartRate.data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 30) + 60
      }));
      
      const newCaloriesData = fitnessData.calories.data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 500) + 1500
      }));
      
      // Calculate new summaries
      const totalSteps = newStepsData.reduce((sum, item) => sum + item.value, 0);
      const avgSteps = Math.round(totalSteps / newStepsData.length);
      
      const totalCalories = newCaloriesData.reduce((sum, item) => sum + item.value, 0);
      const avgCalories = Math.round(totalCalories / newCaloriesData.length);
      
      const heartRateValues = newHeartRateData.map(item => item.value);
      const avgHeartRate = Math.round(heartRateValues.reduce((sum, val) => sum + val, 0) / heartRateValues.length);
      const minHeartRate = Math.min(...heartRateValues);
      const maxHeartRate = Math.max(...heartRateValues);
      
      // Update fitness data with new values
      setFitnessData({
        steps: {
          data: newStepsData,
          summary: {
            total: totalSteps,
            average: avgSteps
          }
        },
        heartRate: {
          data: newHeartRateData,
          summary: {
            average: avgHeartRate,
            min: minHeartRate,
            max: maxHeartRate
          }
        },
        calories: {
          data: newCaloriesData,
          summary: {
            total: totalCalories,
            average: avgCalories
          }
        }
      });
      
      setLastUpdated(now);
      return true;
    } catch (error) {
      console.error(`Error refreshing data for provider ${providerId}:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [providers, fitnessData, setProviders, setIsLoading]);
  
  // Refresh all connected providers
  const refreshProviders = useCallback(async (): Promise<boolean> => {
    const connectedProviders = providers.filter(p => p.isConnected);
    
    if (connectedProviders.length === 0) {
      console.warn('No connected providers to refresh');
      return false;
    }
    
    setIsLoading(true);
    
    try {
      const results = await Promise.all(
        connectedProviders.map(provider => refreshProviderData(provider.id))
      );
      
      return results.some(result => result); // Return true if at least one provider was successfully refreshed
    } catch (error) {
      console.error('Error refreshing providers:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [providers, refreshProviderData, setIsLoading]);

  return {
    fitnessData,
    lastUpdated,
    refreshProviderData,
    refreshProviders
  };
};


import { useState } from 'react';
import { FitnessProvider, FitnessData } from './types';
import { generateMockFitnessData } from './mockFitnessData';

export const useProviderOperations = (initialProviders: FitnessProvider[]) => {
  const [providers, setProviders] = useState<FitnessProvider[]>(initialProviders);
  const [isLoading, setIsLoading] = useState(false);

  // Simulates connecting to a provider
  const connectProvider = async (providerId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProviders(prevProviders => 
        prevProviders.map(provider => 
          provider.id === providerId 
            ? { 
                ...provider, 
                isConnected: true, 
                lastSynced: new Date().toISOString(),
                metrics: {
                  steps: Math.floor(Math.random() * 5000) + 3000,
                  calories: Math.floor(Math.random() * 500) + 1500,
                  heartRate: Math.floor(Math.random() * 20) + 60,
                  distance: Math.floor(Math.random() * 5) + 2,
                }
              } 
            : provider
        )
      );
      return true;
    } catch (error) {
      console.error('Error connecting provider:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulates disconnecting from a provider
  const disconnectProvider = async (providerId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProviders(prevProviders => 
        prevProviders.map(provider => 
          provider.id === providerId 
            ? { 
                ...provider, 
                isConnected: false,
                lastSynced: '',
                metrics: {
                  steps: 0,
                  calories: 0,
                  heartRate: 0,
                  distance: 0,
                }
              } 
            : provider
        )
      );
      return true;
    } catch (error) {
      console.error('Error disconnecting provider:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    providers,
    isLoading,
    connectProvider,
    disconnectProvider
  };
};

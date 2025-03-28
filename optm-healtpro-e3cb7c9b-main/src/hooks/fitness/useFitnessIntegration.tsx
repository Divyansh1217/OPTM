
import { useState } from 'react';
import { FitnessProvider, FitnessData } from './types';
import { mockProviders, generateMockFitnessData } from './mockFitnessData';
import { useProviderOperations } from './useProviderOperations';
import { useDataSync } from './useDataSync';
import { useSummaryCalculator } from './useSummaryCalculator';

const useFitnessIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialFitnessData = generateMockFitnessData();
  
  // Initialize provider operations
  const { 
    providers, 
    connectProvider, 
    disconnectProvider 
  } = useProviderOperations(mockProviders);
  
  // Initialize data synchronization 
  const { 
    fitnessData: rawFitnessData, 
    refreshProviderData, 
    refreshProviders 
  } = useDataSync(initialFitnessData, providers, setProviders => {
    // This is the setProviders callback
    // It's passed through to ensure the data sync can update provider states
  }, setIsLoading);
  
  // Calculate summary statistics 
  const fitnessData = useSummaryCalculator(rawFitnessData);

  return {
    providers,
    fitnessData,
    isLoading,
    connectProvider,
    disconnectProvider,
    refreshProviderData,
    refreshProviders
  };
};

export default useFitnessIntegration;
export type { FitnessProvider, FitnessData };

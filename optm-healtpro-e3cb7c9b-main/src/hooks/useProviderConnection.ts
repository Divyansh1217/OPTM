
import { useState } from 'react';
import { toast } from 'sonner';
import useFitnessIntegration from '@/hooks/useFitnessIntegration';
import { useHealthData } from '@/hooks/useHealthData';

export const useProviderConnection = () => {
  const { 
    providers, 
    connectProvider, 
    disconnectProvider, 
    refreshProviderData 
  } = useFitnessIntegration();
  
  const {
    healthData,
    syncHealthData
  } = useHealthData();
  
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // Adapter functions to convert Promise<void> to Promise<boolean>
  const handleConnect = async (providerId: string): Promise<boolean> => {
    await connectProvider(providerId);
    return true;
  };

  const handleDisconnect = async (providerId: string): Promise<boolean> => {
    await disconnectProvider(providerId);
    return true;
  };

  const handleRefresh = async (providerId: string): Promise<boolean> => {
    await refreshProviderData(providerId);
    return true;
  };
  
  const handleCheckConnection = async () => {
    setIsCheckingConnection(true);
    try {
      await syncHealthData();
      const hasGoogleFitConnected = healthData?.vitalSigns?.heartRate?.source === 'Google Fit';
      
      toast.success("Connection check completed", {
        description: hasGoogleFitConnected 
          ? "Google Fit connection is working properly." 
          : "Google Fit is not connected. Please connect it to sync your health data."
      });
    } catch (error) {
      console.error("Error checking connection:", error);
      toast.error("Connection check failed", {
        description: "There was an error checking your Google Fit connection."
      });
    } finally {
      setIsCheckingConnection(false);
    }
  };
  
  // Determine if Google Fit is connected based on data source
  const hasGoogleFitConnected = healthData?.vitalSigns?.heartRate?.source === 'Google Fit';
  
  return {
    providers,
    hasGoogleFitConnected,
    isCheckingConnection,
    handleConnect,
    handleDisconnect,
    handleRefresh,
    handleCheckConnection
  };
};

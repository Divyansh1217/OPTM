
import { useState, useCallback } from 'react';
import { FitnessConnection } from '@/services/health/types';
import { healthDataService } from '@/services/health/metricsService';

export const useConnections = (userId: string | undefined) => {
  const [connections, setConnections] = useState<FitnessConnection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGoogleFitConnected, setHasGoogleFitConnected] = useState(false);

  const loadConnections = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would fetch from an API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockConnections: FitnessConnection[] = [
        {
          id: 'google-fit-1',
          userId,
          provider: 'Google Fit',
          isConnected: true,
          lastSync: new Date().toISOString()
        },
        {
          id: 'apple-health-1',
          userId,
          provider: 'Apple Health',
          isConnected: false
        },
        {
          id: 'fitbit-1',
          userId,
          provider: 'Fitbit',
          isConnected: false
        }
      ];
      
      setConnections(mockConnections);
      
      // Check if Google Fit is connected
      const googleFitConnection = mockConnections.find(
        conn => conn.provider === 'Google Fit'
      );
      setHasGoogleFitConnected(googleFitConnection?.isConnected || false);
    } catch (error) {
      console.error('Error loading fitness connections:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const toggleConnection = useCallback(async (
    connectionId: string, 
    newState: boolean
  ): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      // In a real app, this would make API calls to connect/disconnect
      // For now, we'll just update our local state
      
      setConnections(prev => 
        prev.map(conn => 
          conn.id === connectionId 
            ? { ...conn, isConnected: newState, lastSync: newState ? new Date().toISOString() : undefined }
            : conn
        )
      );
      
      // Update Google Fit connection status
      if (connections.find(conn => conn.id === connectionId)?.provider === 'Google Fit') {
        setHasGoogleFitConnected(newState);
      }
      
      return true;
    } catch (error) {
      console.error('Error toggling connection:', error);
      return false;
    }
  }, [userId, connections]);

  return {
    connections,
    isLoading,
    hasGoogleFitConnected,
    loadConnections,
    toggleConnection
  };
};


import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { TimeRange, SyncOptions } from '@/services/health';
import { useSyncData } from './useSyncData';
import { useMetricsData } from './useMetricsData';
import { useConnections } from './useConnections';
import { UseHealthDataOptions, UseHealthDataResult } from './types';

/**
 * Hook for accessing and managing health data
 */
export const useHealthData = (options: UseHealthDataOptions = {}): UseHealthDataResult => {
  const { 
    autoSync = true, 
    syncInterval = 30000, // 30 seconds
    defaultTimeRange = 'week' 
  } = options;
  
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);
  
  const { isSyncing, lastSyncTime, syncData: originalSyncData } = useSyncData(user?.id);
  const { metrics, metricsHistory, getMetricHistory, loadInitialMetrics } = useMetricsData(user?.id, timeRange);
  const { hasGoogleFitConnected, connections, loadConnections } = useConnections(user?.id);
  
  // Create an adapter function to match the expected interface
  const syncData = async (forceRefresh?: boolean): Promise<boolean> => {
    return originalSyncData({ forceRefresh });
  };

  /**
   * Load initial data and check for Google Fit connection
   */
  useEffect(() => {
    const loadInitialData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Load connections first
        await loadConnections();
        
        // Then load metrics
        await loadInitialMetrics();
        
        // Perform initial sync if Google Fit is connected
        if (hasGoogleFitConnected && autoSync) {
          await syncData();
        }
      } catch (error) {
        console.error('Error loading initial health data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [user, autoSync, originalSyncData, loadConnections, loadInitialMetrics, hasGoogleFitConnected]);
  
  /**
   * Set up automatic sync on interval
   */
  useEffect(() => {
    if (!user || !autoSync || !hasGoogleFitConnected) return;
    
    const interval = setInterval(() => {
      originalSyncData({ silent: true });
    }, syncInterval);
    
    return () => clearInterval(interval);
  }, [user, autoSync, syncInterval, hasGoogleFitConnected, originalSyncData]);
  
  return {
    metrics,
    metricsHistory,
    isLoading,
    isSyncing,
    lastSyncTime,
    hasGoogleFitConnected,
    connections,
    syncData,
    getMetricHistory,
    setTimeRange
  };
};

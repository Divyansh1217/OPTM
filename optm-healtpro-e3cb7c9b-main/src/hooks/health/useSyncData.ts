
import { useState, useCallback, useEffect } from 'react';
import { SyncOptions } from '@/services/health/types';
import { healthDataService } from '@/services/health/metricsService';
import { healthSyncService } from '@/services/health/sync';
import { toast } from 'sonner';

export const useSyncData = (userId: string | undefined) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<Error | null>(null);
  const [isBackgroundSyncing, setIsBackgroundSyncing] = useState(false);
  const [syncHistory, setSyncHistory] = useState<Array<{ timestamp: Date, success: boolean }>>([]);

  // Initialize lastSyncTime from healthSyncService
  useEffect(() => {
    const lastSync = healthSyncService.getLastSyncTime();
    if (lastSync) {
      setLastSyncTime(lastSync);
    }
  }, []);

  // Function to record sync history
  const recordSyncAttempt = (success: boolean) => {
    setSyncHistory(prev => [
      { timestamp: new Date(), success },
      ...prev.slice(0, 9) // Keep only the last 10 entries
    ]);
  };

  // Background sync at regular intervals
  useEffect(() => {
    if (!userId) return;
    
    const syncInterval = 15 * 60 * 1000; // 15 minutes
    
    const performBackgroundSync = async () => {
      if (isSyncing || isBackgroundSyncing) return;
      
      setIsBackgroundSyncing(true);
      try {
        const success = await healthSyncService.syncAllHealthData(userId, { silent: true });
        if (success) {
          setLastSyncTime(new Date());
          recordSyncAttempt(true);
        } else {
          recordSyncAttempt(false);
        }
      } catch (error) {
        console.error('Background sync error:', error);
        recordSyncAttempt(false);
      } finally {
        setIsBackgroundSyncing(false);
      }
    };
    
    // Initial background sync
    performBackgroundSync();
    
    // Set up interval for regular background syncs
    const intervalId = setInterval(performBackgroundSync, syncInterval);
    
    return () => clearInterval(intervalId);
  }, [userId, isSyncing, isBackgroundSyncing]);

  const syncData = useCallback(async (
    options: SyncOptions = {}
  ): Promise<boolean> => {
    if (!userId) return false;
    
    const { forceRefresh = false, silent = false } = options;
    
    // Skip if already syncing
    if (isSyncing) return false;
    
    setIsSyncing(true);
    setSyncError(null);
    
    if (!silent) {
      toast.info("Syncing your health data...", {
        id: "health-sync",
        duration: 3000
      });
    }
    
    try {
      const success = await healthSyncService.syncAllHealthData(userId, options);
      
      setLastSyncTime(new Date());
      recordSyncAttempt(success);
      
      if (success) {
        if (!silent) {
          toast.success("Health data synced successfully", {
            id: "health-sync",
            duration: 3000
          });
        }
      } else {
        if (!silent) {
          toast.error("Some data failed to sync", {
            id: "health-sync",
            description: "Please try again or check your connection.",
            duration: 5000
          });
        }
      }
      
      return success;
    } catch (error) {
      console.error('Error syncing health data:', error);
      setSyncError(error instanceof Error ? error : new Error('Unknown error during sync'));
      
      if (!silent) {
        toast.error("Failed to sync health data", {
          id: "health-sync",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          duration: 5000
        });
      }
      
      recordSyncAttempt(false);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [userId, isSyncing]);

  return {
    isSyncing: isSyncing || isBackgroundSyncing,
    isManualSync: isSyncing,
    isBackgroundSync: isBackgroundSyncing,
    lastSyncTime,
    syncError,
    syncData,
    syncHistory
  };
};

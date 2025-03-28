
import { useCallback, useRef, useEffect } from 'react';

export function useCalendarRefresh(refreshCalendar: () => void) {
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshInProgressRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);
  
  const DEBOUNCE_TIME = 800;
  const MIN_REFRESH_INTERVAL = 2000;

  // Cleanup function to clear any pending timeouts
  const cleanupRefresh = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
  }, []);

  // Debounced refresh function
  const debouncedRefresh = useCallback(() => {
    // Debounce rapid calls
    cleanupRefresh();
    
    console.log("Executing debounced calendar refresh");
    debounceTimeoutRef.current = setTimeout(() => {
      // Check if we're already refreshing
      if (refreshInProgressRef.current) {
        console.log("Refresh already in progress, skipping");
        return;
      }
      
      // Check if enough time has passed since last refresh
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
      
      if (timeSinceLastRefresh < MIN_REFRESH_INTERVAL) {
        console.log(`Skipping refresh, only ${timeSinceLastRefresh}ms since last refresh`);
        return;
      }
      
      refreshInProgressRef.current = true;
      lastRefreshTimeRef.current = now;
      
      // Perform the refresh
      refreshCalendar();
      
      // Reset flag after a short delay
      setTimeout(() => {
        refreshInProgressRef.current = false;
      }, 1000);
    }, DEBOUNCE_TIME);
  }, [refreshCalendar, cleanupRefresh]);

  // Manual refresh function
  const handleManualRefresh = useCallback(async () => {
    try {
      // Always allow manual refreshes
      cleanupRefresh();
      lastRefreshTimeRef.current = Date.now();
      
      // Perform the refresh
      refreshCalendar();
      return true;
    } catch (error) {
      console.error("Error during manual refresh:", error);
      return false;
    }
  }, [refreshCalendar, cleanupRefresh]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return cleanupRefresh;
  }, [cleanupRefresh]);

  return {
    debouncedRefresh,
    handleManualRefresh,
    cleanupRefresh
  };
}


import { useCallback, useRef } from 'react';

export function useDebounceRefresh(refreshCalendar: () => Promise<void>) {
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);
  const lastRefreshTimeRef = useRef<number>(0);
  
  // Improved debounce function with a flag to prevent multiple concurrent refreshes
  // and a cooldown period to prevent too many refreshes in quick succession
  const debouncedRefresh = useCallback(() => {
    // Only process if we're not in the refresh cooldown period
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
    
    if (timeSinceLastRefresh < 2000) {
      console.log(`Skipping refresh, only ${timeSinceLastRefresh}ms since last refresh`);
      return;
    }
    
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    // Skip if already refreshing
    if (isRefreshingRef.current) {
      console.log("Refresh already in progress, skipping");
      return;
    }
    
    refreshTimeoutRef.current = setTimeout(async () => {
      console.log("Executing debounced calendar refresh");
      isRefreshingRef.current = true;
      lastRefreshTimeRef.current = Date.now();
      
      try {
        await refreshCalendar();
      } catch (error) {
        console.error("Error during calendar refresh:", error);
      } finally {
        isRefreshingRef.current = false;
      }
    }, 1500); // Increased debounce time to reduce flickering
  }, [refreshCalendar]);

  // Cleanup function for debounced refresh
  const cleanupRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  return {
    debouncedRefresh,
    cleanupRefresh
  };
}

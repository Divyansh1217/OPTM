
import { useCallback, useRef } from 'react';

export function useManualRefresh(refreshCalendar: () => Promise<void>) {
  const isRefreshingRef = useRef(false);
  const lastRefreshTimeRef = useRef<number>(0);
  
  // Function for manual refresh with toast notification
  const handleManualRefresh = useCallback(async () => {
    try {
      // Skip if already refreshing
      if (isRefreshingRef.current) {
        console.log("Refresh already in progress, skipping manual refresh");
        return true;
      }
      
      // Skip if we're in the cooldown period
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
      if (timeSinceLastRefresh < 2000) {
        console.log(`Manual refresh skipped, only ${timeSinceLastRefresh}ms since last refresh`);
        return true;
      }
      
      console.log("Manually refreshing calendar data...");
      isRefreshingRef.current = true;
      lastRefreshTimeRef.current = Date.now();
      
      await refreshCalendar();
      
      // Dispatch a single calendar-updated event with a specific delay
      // to prevent multiple rapid refreshes
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('calendar-data-updated', {
          detail: { action: 'manual-refresh', timestamp: new Date().toISOString() }
        }));
      }, 500);
      
      return true;
    } catch (error) {
      console.error("Error refreshing calendar:", error);
      return false;
    } finally {
      isRefreshingRef.current = false;
    }
  }, [refreshCalendar]);

  return {
    handleManualRefresh
  };
}

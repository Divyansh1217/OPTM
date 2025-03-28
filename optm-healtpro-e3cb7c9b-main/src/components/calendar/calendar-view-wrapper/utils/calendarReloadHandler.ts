
/**
 * Utility functions for handling calendar iframe reloads
 */

/**
 * Interface for reload handler configuration
 */
export interface ReloadHandlerConfig {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  reloadingRef: React.MutableRefObject<boolean>;
  lastReloadTimeRef: React.MutableRefObject<number>;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setRetryCount: (callback: (prev: number) => number) => void;
  reloadCalendarIframe?: () => void;
}

/**
 * Handles reloading of the calendar iframe
 */
export const handleCalendarReload = ({
  iframeRef,
  reloadingRef,
  lastReloadTimeRef,
  setIsLoading,
  setError,
  setRetryCount,
  reloadCalendarIframe
}: ReloadHandlerConfig): void => {
  // Prevent multiple reloads in quick succession
  const now = Date.now();
  if (reloadingRef.current || (now - lastReloadTimeRef.current < 3000)) {
    console.log("Reload already in progress or too soon since last reload, skipping");
    return;
  }
  
  reloadingRef.current = true;
  lastReloadTimeRef.current = now;
  
  if (iframeRef.current) {
    setIsLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
    
    // Store the current src
    const src = iframeRef.current.src;
    
    // Clear and reset iframe src to force reload
    iframeRef.current.src = 'about:blank';
    
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = `${src}${src.includes('?') ? '&' : '?'}cachebust=${Date.now()}`;
        
        // Set a timeout to prevent permanent loading state if iframe fails to trigger onLoad
        setTimeout(() => {
          setIsLoading(false);
          reloadingRef.current = false;
        }, 5000);
      }
    }, 200);
  } else if (reloadCalendarIframe) {
    reloadCalendarIframe();
    
    // Set a timeout to clear loading state in case the callback doesn't reset it
    setTimeout(() => {
      setIsLoading(false);
      reloadingRef.current = false;
    }, 3000);
  }
  
  // Safety timeout to ensure reloadingRef is reset
  setTimeout(() => {
    reloadingRef.current = false;
  }, 5000);
};

/**
 * Setup debounced event listener for calendar updates
 */
export const setupCalendarEventListeners = (
  reloadFn: () => void, 
  publicCalendarUrl: string | undefined
): (() => void) => {
  if (!publicCalendarUrl) return () => {};
  
  let reloadTimeout: NodeJS.Timeout | null = null;
  
  // Debounced reload handler to prevent multiple reloads
  const handleCalendarUpdate = () => {
    if (reloadTimeout) {
      clearTimeout(reloadTimeout);
    }
    
    reloadTimeout = setTimeout(() => {
      console.log("Calendar update event received, reloading iframe");
      reloadFn();
    }, 1500); // Debounce for 1.5 seconds
  };
  
  // Use a single handler for all events to reduce listeners
  const handleAnyAppointmentEvent = (event: Event) => {
    console.log(`Handling calendar event: ${event.type}`);
    handleCalendarUpdate();
  };
  
  // Listen for all appointment-related events to trigger iframe reload
  window.addEventListener('calendar-updated', handleAnyAppointmentEvent);
  window.addEventListener('calendar-data-updated', handleAnyAppointmentEvent);
  
  // Return cleanup function
  return () => {
    if (reloadTimeout) {
      clearTimeout(reloadTimeout);
    }
    window.removeEventListener('calendar-updated', handleAnyAppointmentEvent);
    window.removeEventListener('calendar-data-updated', handleAnyAppointmentEvent);
  };
};


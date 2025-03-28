
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export const useOAuthUrlParams = () => {
  const location = useLocation();
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  // Check for debug mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const debug = params.get('debug');
    if (debug === 'true') {
      setShowDebugInfo(true);
    }
  }, [location]);
  
  // Handle connection status from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const connected = params.get('connected');
    const error = params.get('error');
    
    if (connected === 'true') {
      toast.success('Google Fit connected successfully', {
        description: 'Your health data will now sync automatically.',
        duration: 5000
      });
      
      // Clean URL parameters but preserve debug mode if enabled
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('connected');
      if (showDebugInfo) {
        newUrl.searchParams.set('debug', 'true');
      } else {
        newUrl.searchParams.delete('debug');
      }
      window.history.replaceState({}, document.title, newUrl.toString());
    }
    
    if (error) {
      toast.error('Failed to connect Google Fit', {
        description: decodeURIComponent(error),
        duration: 8000
      });
      
      // Display debug info automatically if there's an error
      setShowDebugInfo(true);
      
      // Clean URL parameters but preserve debug mode
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.set('debug', 'true');
      window.history.replaceState({}, document.title, newUrl.toString());
    }
  }, [location, showDebugInfo]);
  
  return { showDebugInfo, setShowDebugInfo };
};

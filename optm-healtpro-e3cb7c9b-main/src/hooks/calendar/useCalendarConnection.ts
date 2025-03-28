
import { useState, useRef, useEffect } from 'react';

export function useCalendarConnection(
  isAuthorized: boolean,
  isLoading: boolean,
  authorizeCalendar: () => Promise<boolean>
) {
  const [isConnecting, setIsConnecting] = useState(false);
  const connectionAttemptedRef = useRef(false);
  
  // Auto-connect to calendar if needed (only once per session)
  useEffect(() => {
    const autoConnectCalendar = async () => {
      // Only attempt auto-connect once and only if not already connected
      if (!isAuthorized && !isLoading && !connectionAttemptedRef.current && !isConnecting) {
        console.log("Attempting automatic calendar reconnection");
        connectionAttemptedRef.current = true;
        setIsConnecting(true);
        
        try {
          await authorizeCalendar();
          console.log("Auto-reconnection to calendar successful");
        } catch (error) {
          console.error("Auto-reconnection failed:", error);
        } finally {
          setIsConnecting(false);
        }
      }
    };
    
    // Uncomment the line below to enable auto-connect
    // autoConnectCalendar();
  }, [isAuthorized, isLoading, authorizeCalendar, isConnecting]);

  const handleConnectCalendar = async () => {
    if (isConnecting) return false;
    
    try {
      setIsConnecting(true);
      console.info("Starting calendar authorization process");
      const result = await authorizeCalendar();
      
      if (!result) {
        throw new Error("Calendar authorization failed");
      }
      
      console.info("Calendar authorization successful");
      return true;
    } catch (error) {
      console.error("Calendar connection error:", error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isConnecting,
    handleConnectCalendar
  };
}


import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CalendarEmptyState from './components/CalendarEmptyState';
import CalendarLoading from './components/CalendarLoading';
import CalendarError from './components/CalendarError';
import CalendarFrame from './components/CalendarFrame';
import { getDisplayUrl, getFallbackDisplayUrl } from './utils/calendarUrlProcessor';
import { handleCalendarReload, setupCalendarEventListeners } from './utils/calendarReloadHandler';
import { GOOGLE_CALENDAR_ID } from '@/hooks/calendar/useCalendarAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CalendarIframeProps {
  publicCalendarUrl: string;
  reloadCalendarIframe?: () => void;
}

const CalendarIframe: React.FC<CalendarIframeProps> = ({
  publicCalendarUrl,
  reloadCalendarIframe
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeMountedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const reloadingRef = useRef(false);
  const lastReloadTimeRef = useRef(0);

  // Use the explicit calendar URL for our known calendar ID
  const manuallySetUrl = publicCalendarUrl?.includes(GOOGLE_CALENDAR_ID) || publicCalendarUrl?.includes(encodeURIComponent(GOOGLE_CALENDAR_ID))
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GOOGLE_CALENDAR_ID)}&ctz=UTC` 
    : null;
  
  // Process URLs to find a displayable format
  const processedUrl = manuallySetUrl || getDisplayUrl(publicCalendarUrl);
  const fallbackUrl = processedUrl ? null : getFallbackDisplayUrl(publicCalendarUrl);
  const finalUrl = processedUrl || fallbackUrl || "";
  
  // Setup a function to reload the iframe when needed
  const reloadIframe = useCallback(() => {
    handleCalendarReload({
      iframeRef,
      reloadingRef,
      lastReloadTimeRef,
      setIsLoading,
      setError,
      setRetryCount,
      reloadCalendarIframe
    });
  }, [reloadCalendarIframe]);

  // Initial mount/load for iframe
  useEffect(() => {
    if (publicCalendarUrl && !iframeMountedRef.current) {
      iframeMountedRef.current = true;
      console.log("Calendar iframe mounted initially");
    }
  }, [publicCalendarUrl]);

  // Add event listener for calendar changes with debouncing to prevent rapid reloads
  useEffect(() => {
    const cleanupListeners = setupCalendarEventListeners(reloadIframe, publicCalendarUrl);
    return cleanupListeners;
  }, [publicCalendarUrl, reloadIframe]);

  // Handle iframe load and error events
  const handleIframeLoad = useCallback(() => {
    console.log("Google Calendar iframe loaded");
    setIsLoading(false);
    reloadingRef.current = false;
  }, []);

  const handleIframeError = useCallback((e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error("Error loading Google Calendar iframe:", e);
    setIsLoading(false);
    setError("Failed to load calendar");
    reloadingRef.current = false;
  }, []);

  // Show empty state if URL is invalid
  if (!finalUrl || finalUrl === "") {
    return (
      <Card className="shadow-sm border border-border/30">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Calendar not connected</AlertTitle>
            <AlertDescription>
              Please connect your Google Calendar to view and manage appointments.
            </AlertDescription>
          </Alert>
          <CalendarEmptyState onReload={reloadIframe} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden border border-border/30">
      <CardContent className="p-0">
        <div className="relative h-[450px]">
          <CalendarLoading isVisible={isLoading} />
          <CalendarError error={error} onReload={reloadIframe} />
          <CalendarFrame 
            src={finalUrl} 
            onLoad={handleIframeLoad} 
            onError={handleIframeError} 
            ref={iframeRef}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarIframe;

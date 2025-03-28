
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useCalendarIntegration } from '@/hooks/calendar/useCalendarIntegration';
import { useCalendarRefresh } from '@/hooks/calendar/useCalendarRefresh';
import { useCalendarConnection } from '@/hooks/calendar/useCalendarConnection';
import { useCalendarEventListeners } from '@/hooks/calendar/useEventListeners';
import { useAuth } from '@/contexts/auth';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarGrid from '@/components/calendar/CalendarGrid';

const CalendarTab: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');
  const calendarViewRef = useRef<any>(null);
  const { user } = useAuth();
  
  const { 
    isLoading, 
    isAuthorized, 
    calendarData, 
    authorizeCalendar, 
    fetchEvents, 
    refreshCalendar,
    selectedDate,
    setSelectedDate,
    upcomingAppointments,
    publicCalendarUrl
  } = useCalendarIntegration();

  const validAppointments = upcomingAppointments || [];

  // Use our new hooks
  const { debouncedRefresh, handleManualRefresh, cleanupRefresh } = useCalendarRefresh(refreshCalendar);
  const { isConnecting, handleConnectCalendar } = useCalendarConnection(isAuthorized, isLoading, authorizeCalendar);
  
  // Setup event listeners
  useCalendarEventListeners(debouncedRefresh, refreshCalendar);

  // Initial refresh when authorized
  useEffect(() => {
    if (isAuthorized) {
      console.log("Calendar is authorized, triggering initial refresh");
      refreshCalendar();
    } else {
      console.log("Calendar is not authorized yet");
    }
    
    return cleanupRefresh;
  }, [isAuthorized, refreshCalendar, cleanupRefresh]);

  // Listen for calendar connection events
  useEffect(() => {
    const handleCalendarConnected = () => {
      console.log("Calendar connection event detected");
      refreshCalendar();
    };

    window.addEventListener('calendar-connected', handleCalendarConnected);
    return () => {
      window.removeEventListener('calendar-connected', handleCalendarConnected);
    };
  }, [refreshCalendar]);

  const handleConnect = async () => {
    console.log("Connect calendar button clicked");
    try {
      const success = await handleConnectCalendar();
      
      if (success) {
        // Toast is handled in useCalendarAuth
        await fetchEvents();
        return true;
      } else {
        console.error("Calendar connection failed");
        return false;
      }
    } catch (error) {
      console.error("Error in handleConnect:", error);
      return false;
    }
  };

  const handleCreateAppointment = () => {
    if (!isAuthorized) {
      toast.error("Calendar not connected", {
        description: "Please connect your Google Calendar first",
      });
      return;
    }
    
    // Open the create appointment dialog in the CalendarView component
    if (calendarViewRef.current && calendarViewRef.current.openCreateDialog) {
      calendarViewRef.current.openCreateDialog(selectedDate);
    } else {
      console.log("Create appointment button clicked, but ref not available");
    }
  };

  const handleRefresh = async () => {
    if (!isAuthorized) {
      toast.error("Calendar not connected", {
        description: "Please connect your Google Calendar first",
      });
      return;
    }
    
    const success = await handleManualRefresh();
    
    if (success) {
      toast.success("Calendar refreshed");
    } else {
      toast.error("Failed to refresh calendar");
    }
  };

  // Function to explicitly reload the iframe
  const reloadCalendarIframe = () => {
    console.log("Reloading calendar iframe from CalendarTab");
    window.dispatchEvent(new Event('calendar-updated'));
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-4">
      <CalendarHeader 
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        isConnecting={isConnecting}
        onRefresh={handleRefresh}
        onCreateAppointment={handleCreateAppointment}
      />

      <CalendarGrid
        isAuthorized={isAuthorized}
        isLoading={isLoading}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        calendarData={calendarData}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onConnectCalendar={handleConnect}
        isConnecting={isConnecting}
        onEventsChange={debouncedRefresh}
        calendarViewRef={calendarViewRef}
        publicCalendarUrl={publicCalendarUrl}
        reloadCalendarIframe={reloadCalendarIframe}
        validAppointments={validAppointments}
        refreshCalendar={refreshCalendar}
        currentUser={user}
      />
    </div>
  );
};

export default CalendarTab;

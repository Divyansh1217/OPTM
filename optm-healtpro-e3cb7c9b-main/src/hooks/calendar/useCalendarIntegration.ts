
import { useAuth } from '@/contexts/auth';
import { useCalendarAuth } from './useCalendarAuth';
import { useCalendarData } from './useCalendarData';
import { CalendarEvent, UpcomingAppointment } from './types';
import { useCallback } from 'react';

export type { CalendarEvent, UpcomingAppointment };

export const useCalendarIntegration = () => {
  const { user } = useAuth();
  
  const { 
    isAuthorized, 
    isLoading: isAuthLoading, 
    error: authError, 
    publicCalendarUrl,
    authorizeCalendar 
  } = useCalendarAuth();
  
  const {
    isLoading: isDataLoading,
    calendarData,
    upcomingAppointments,
    selectedDate,
    setSelectedDate,
    fetchEvents,
    refreshCalendar,
    error: dataError
  } = useCalendarData(isAuthorized);

  // Enhanced refresh that ensures we fetch new data
  const enhancedRefresh = useCallback(async () => {
    console.log("Enhanced calendar refresh triggered");
    if (!isAuthorized) {
      console.log("Calendar is not authorized, can't refresh");
      return;
    }
    
    await refreshCalendar();
    // We don't need to call fetchEvents explicitly as it's triggered by the refreshCalendar
    // function through the lastRefresh state update
  }, [refreshCalendar, isAuthorized]);

  // Combine loading states and errors
  const isLoading = isAuthLoading || isDataLoading;
  const error = authError || dataError;

  return {
    isLoading,
    isAuthorized,
    calendarData,
    upcomingAppointments,
    authorizeCalendar,
    fetchEvents,
    refreshCalendar: enhancedRefresh,
    selectedDate,
    setSelectedDate,
    publicCalendarUrl,
    error
  };
};

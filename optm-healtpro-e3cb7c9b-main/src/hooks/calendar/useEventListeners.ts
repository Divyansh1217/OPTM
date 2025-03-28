
import { useEffect, useCallback } from 'react';

export function useCalendarEventListeners(
  debouncedRefresh: () => void,
  refreshCalendar: () => void
) {
  const handleAppointmentCreated = useCallback((event: CustomEvent) => {
    console.log('Appointment created:', event.detail);
    debouncedRefresh();
  }, [debouncedRefresh]);

  const handleAppointmentUpdated = useCallback((event: CustomEvent) => {
    console.log('Appointment updated:', event.detail);
    debouncedRefresh();
  }, [debouncedRefresh]);

  const handleAppointmentDeleted = useCallback((event: CustomEvent) => {
    console.log('Appointment deleted:', event.detail);
    debouncedRefresh();
  }, [debouncedRefresh]);

  const handleCalendarDataUpdated = useCallback((event: CustomEvent) => {
    console.log('Calendar event received in CalendarTab', event.detail);
    debouncedRefresh();
  }, [debouncedRefresh]);

  // Set up event listeners
  useEffect(() => {
    // Add listeners for appointment events
    window.addEventListener('appointment-created', handleAppointmentCreated as EventListener);
    window.addEventListener('appointment-updated', handleAppointmentUpdated as EventListener);
    window.addEventListener('appointment-deleted', handleAppointmentDeleted as EventListener);
    window.addEventListener('calendar-data-updated', handleCalendarDataUpdated as EventListener);
    
    // Initial refresh
    refreshCalendar();

    // Clean up listeners
    return () => {
      window.removeEventListener('appointment-created', handleAppointmentCreated as EventListener);
      window.removeEventListener('appointment-updated', handleAppointmentUpdated as EventListener);
      window.removeEventListener('appointment-deleted', handleAppointmentDeleted as EventListener);
      window.removeEventListener('calendar-data-updated', handleCalendarDataUpdated as EventListener);
    };
  }, [
    handleAppointmentCreated,
    handleAppointmentUpdated,
    handleAppointmentDeleted,
    handleCalendarDataUpdated,
    refreshCalendar
  ]);
}

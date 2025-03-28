
import { useCallback } from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';

interface CalendarViewHandlersProps {
  openEventDetails: (event: CalendarEvent) => void;
  closeEventDetails: () => void;
  openCreateDialog: (date: Date) => void;
  closeCreateDialog: () => void;
  onEventsChange: () => void;
}

const useCalendarViewHandlers = ({
  openEventDetails,
  closeEventDetails,
  openCreateDialog,
  closeCreateDialog,
  onEventsChange
}: CalendarViewHandlersProps) => {
  
  const handleEventClick = useCallback((event: CalendarEvent) => {
    if (event.isAvailable) {
      openCreateDialog(event.start instanceof Date ? event.start : new Date(event.start));
    } else {
      openEventDetails(event);
    }
  }, [openCreateDialog, openEventDetails]);

  const handleBookFromDetails = useCallback((selectedEvent: CalendarEvent | null) => {
    if (selectedEvent) {
      closeEventDetails();
      return selectedEvent;
    }
    return null;
  }, [closeEventDetails]);

  const handleEventCreated = useCallback(async (
    handleCreateEvent: (eventData: Partial<CalendarEvent>) => Promise<boolean>,
    eventData: Partial<CalendarEvent>
  ) => {
    const success = await handleCreateEvent(eventData);
    if (success) {
      closeCreateDialog();
      onEventsChange();
    }
    return success;
  }, [closeCreateDialog, onEventsChange]);

  const handleStatusChanged = useCallback(() => {
    console.log("Appointment status changed, refreshing calendar");
    onEventsChange();
  }, [onEventsChange]);

  return {
    handleEventClick,
    handleBookFromDetails,
    handleEventCreated,
    handleStatusChanged
  };
};

export default useCalendarViewHandlers;

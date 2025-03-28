
import React, { forwardRef, useImperativeHandle } from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';
import CalendarNavigation from './CalendarNavigation';
import CalendarViewRenderer from './CalendarViewRenderer';
import CalendarSkeleton from './CalendarSkeleton';
import { useCalendarDates } from '@/hooks/calendar/useCalendarDates';
import { useCalendarEvents } from '@/hooks/calendar/useCalendarEvents';
import { useCalendarEventManager } from '@/hooks/calendar/event-manager';
import { CalendarEventDetails, CalendarDialogs } from './view';
import useCalendarViewHandlers from './view/useCalendarViewHandlers';

interface CalendarViewProps {
  view: 'day' | 'week' | 'month';
  events: CalendarEvent[];
  isLoading: boolean;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventsChange: () => void;
}

const CalendarView = forwardRef<{ openCreateDialog: (date: Date) => void }, CalendarViewProps>(({
  view,
  events,
  isLoading,
  selectedDate,
  onDateSelect,
  onEventsChange
}, ref) => {
  const {
    visibleDates,
    visibleHours,
    navigateToPrevious,
    navigateToNext,
    navigateToToday,
    isToday
  } = useCalendarDates(view, selectedDate, onDateSelect);

  const {
    selectedEvent,
    isDetailsOpen,
    openEventDetails,
    closeEventDetails,
    getEventsForDate,
    getEventsForHour
  } = useCalendarEvents(events);

  const {
    createDialogOpen,
    editDialogOpen,
    editingEvent,
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent
  } = useCalendarEventManager(onEventsChange);

  const {
    handleEventClick,
    handleBookFromDetails,
    handleEventCreated,
    handleStatusChanged
  } = useCalendarViewHandlers({
    openEventDetails,
    closeEventDetails,
    openCreateDialog,
    closeCreateDialog,
    onEventsChange
  });

  useImperativeHandle(ref, () => ({
    openCreateDialog
  }));

  const handleCreateEventWrapper = async (eventData: Partial<CalendarEvent>) => {
    return handleEventCreated(handleCreateEvent, eventData);
  };

  const handleEditFromDetails = () => {
    const eventToEdit = handleBookFromDetails(selectedEvent);
    if (eventToEdit) {
      openEditDialog(eventToEdit);
    }
  };

  // Create an adapter function for handleUpdateEvent that adapts to the expected signature
  const handleUpdateEventWrapper = async (eventData: Partial<CalendarEvent>) => {
    if (!eventData.id) {
      console.error("Cannot update event without an ID");
      return false;
    }
    const eventId = eventData.id;
    return handleUpdateEvent(eventId, eventData);
  };

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <div className="space-y-4">
      <CalendarNavigation
        selectedDate={selectedDate}
        view={view}
        onPrevious={navigateToPrevious}
        onNext={navigateToNext}
        onToday={navigateToToday}
      />
      
      <CalendarViewRenderer
        view={view}
        selectedDate={selectedDate}
        visibleDates={visibleDates}
        visibleHours={visibleHours}
        getEventsForDate={getEventsForDate}
        getEventsForHour={getEventsForHour}
        onEventClick={handleEventClick}
        onDateSelect={onDateSelect}
        isToday={isToday}
      />
      
      <CalendarEventDetails
        selectedEvent={selectedEvent}
        isDetailsOpen={isDetailsOpen}
        closeEventDetails={closeEventDetails}
        onEdit={handleEditFromDetails}
        onStatusChange={handleStatusChanged}
      />

      <CalendarDialogs
        createDialogOpen={createDialogOpen}
        editDialogOpen={editDialogOpen}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        closeCreateDialog={closeCreateDialog}
        closeEditDialog={closeEditDialog}
        onCreateEvent={handleCreateEventWrapper}
        onUpdateEvent={handleUpdateEventWrapper}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
});

CalendarView.displayName = 'CalendarView';

export default CalendarView;

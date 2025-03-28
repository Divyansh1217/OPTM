
import { useCallback } from 'react';
import { CalendarEvent } from '../types';
import { useEventValidator } from './useEventValidator';
import { EventOperations } from './types';
import { createEvent, updateEvent, deleteEvent } from './operations';

export const useEventOperations = (
  onEventChange?: () => void,
  setIsCreating?: (value: boolean) => void,
  setIsEditing?: (value: boolean) => void,
  closeEditDialog?: () => void
): EventOperations => {
  const { validateEventData } = useEventValidator();

  const handleCreateEvent = useCallback(async (eventData: Partial<CalendarEvent>): Promise<boolean> => {
    if (setIsCreating) setIsCreating(true);
    return createEvent(eventData, validateEventData, onEventChange, setIsCreating);
  }, [validateEventData, onEventChange, setIsCreating]);

  const handleUpdateEvent = useCallback(async (
    eventId: string, 
    eventData: Partial<CalendarEvent>
  ): Promise<boolean> => {
    if (setIsEditing) setIsEditing(true);
    return updateEvent(eventId, eventData, validateEventData, onEventChange, setIsEditing, closeEditDialog);
  }, [validateEventData, onEventChange, setIsEditing, closeEditDialog]);

  const handleDeleteEvent = useCallback(async (eventId: string): Promise<boolean> => {
    return deleteEvent(eventId, onEventChange, closeEditDialog);
  }, [onEventChange, closeEditDialog]);

  return {
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent
  };
};

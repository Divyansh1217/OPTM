
import { useState } from 'react';
import { CalendarEvent } from '../types';
import { useDialogState } from './useDialogState';
import { useEventOperations } from './useEventOperations';

export const useCalendarEventManager = (onEventChange?: () => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    editingEvent,
    createDialogOpen,
    editDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog
  } = useDialogState();

  const {
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent
  } = useEventOperations(
    onEventChange,
    setIsCreating,
    setIsEditing,
    closeEditDialog
  );

  return {
    isCreating,
    isEditing,
    editingEvent,
    createDialogOpen,
    editDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent
  };
};


import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';

export const useDialogState = () => {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const openCreateDialog = useCallback((date: Date) => {
    setCreateDialogOpen(true);
  }, []);

  const closeCreateDialog = useCallback(() => {
    setCreateDialogOpen(false);
  }, []);

  const openEditDialog = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setEditDialogOpen(true);
  }, []);

  const closeEditDialog = useCallback(() => {
    setEditDialogOpen(false);
    // Don't immediately clear the editing event to prevent UI flicker during dialog transitions
    setTimeout(() => {
      setEditingEvent(null);
    }, 300);
  }, []);

  return {
    editingEvent,
    createDialogOpen,
    editDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog
  };
};

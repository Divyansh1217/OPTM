
import { CalendarEvent } from '../types';

export interface EventManagerState {
  isCreating: boolean;
  isEditing: boolean;
  editingEvent: CalendarEvent | null;
  createDialogOpen: boolean;
  editDialogOpen: boolean;
}

export interface DialogActions {
  openCreateDialog: (date: Date) => void;
  closeCreateDialog: () => void;
  openEditDialog: (event: CalendarEvent) => void;
  closeEditDialog: () => void;
}

export interface EventOperations {
  handleCreateEvent: (eventData: Partial<CalendarEvent>) => Promise<boolean>;
  handleUpdateEvent: (eventId: string, eventData: Partial<CalendarEvent>) => Promise<boolean>;
  handleDeleteEvent: (eventId: string) => Promise<boolean>;
}

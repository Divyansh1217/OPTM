
import React from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';
import CreateAppointmentDialog from '../CreateAppointmentDialog';
import EditAppointmentDialog from '../EditAppointmentDialog';

interface CalendarDialogsProps {
  createDialogOpen: boolean;
  editDialogOpen: boolean;
  editingEvent: CalendarEvent | null;
  selectedDate: Date;
  closeCreateDialog: () => void;
  closeEditDialog: () => void;
  onCreateEvent: (eventData: Partial<CalendarEvent>) => Promise<boolean>;
  onUpdateEvent: (eventData: Partial<CalendarEvent>) => Promise<boolean>;
  onDeleteEvent: (eventId: string) => Promise<boolean>;
}

const CalendarDialogs: React.FC<CalendarDialogsProps> = ({
  createDialogOpen,
  editDialogOpen,
  editingEvent,
  selectedDate,
  closeCreateDialog,
  closeEditDialog,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent
}) => {
  return (
    <>
      <CreateAppointmentDialog
        open={createDialogOpen}
        onClose={closeCreateDialog}
        onCreated={onCreateEvent}
        selectedDate={selectedDate}
      />

      {editingEvent && (
        <EditAppointmentDialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          onUpdate={onUpdateEvent}
          onDelete={onDeleteEvent}
          event={editingEvent}
        />
      )}
    </>
  );
};

export default CalendarDialogs;

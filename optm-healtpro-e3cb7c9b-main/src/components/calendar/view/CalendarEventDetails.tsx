
import React from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';
import { AppointmentDetailsDialog } from '../appointment-details';

interface CalendarEventDetailsProps {
  selectedEvent: CalendarEvent | null;
  isDetailsOpen: boolean;
  closeEventDetails: () => void;
  onEdit: () => void;
  onStatusChange: () => void;
}

const CalendarEventDetails: React.FC<CalendarEventDetailsProps> = ({
  selectedEvent,
  isDetailsOpen,
  closeEventDetails,
  onEdit,
  onStatusChange
}) => {
  if (!selectedEvent) return null;
  
  return (
    <AppointmentDetailsDialog
      open={isDetailsOpen}
      onClose={closeEventDetails}
      event={selectedEvent}
      onEdit={onEdit}
      onStatusChange={onStatusChange}
    />
  );
};

export default CalendarEventDetails;

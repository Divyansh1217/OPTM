
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/hooks/calendar/types';
import { Check, Edit, X } from 'lucide-react';
import { AppointmentStatus } from '@/types/appointment';

interface AppointmentActionButtonsProps {
  event: CalendarEvent;
  isDoctor: boolean;
  onEdit: () => void;
  handleStatusUpdate: (status: AppointmentStatus) => Promise<void>;
}

const AppointmentActionButtons: React.FC<AppointmentActionButtonsProps> = ({
  event,
  isDoctor,
  onEdit,
  handleStatusUpdate
}) => {
  if (event.isAvailable) {
    return (
      <Button className="w-full" onClick={onEdit}>
        Book This Slot
      </Button>
    );
  }
  
  if (!event.status || event.status === 'scheduled') {
    return (
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          {isDoctor ? "Edit Appointment" : "Reschedule"}
        </Button>
        <Button onClick={() => handleStatusUpdate('confirmed')} className="sm:ml-auto">
          <Check className="h-4 w-4 mr-2" />
          Confirm
        </Button>
      </div>
    );
  }
  
  if (event.status === 'confirmed') {
    return (
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          {isDoctor ? "Edit Appointment" : "Reschedule"}
        </Button>
        {isDoctor && (
          <Button onClick={() => handleStatusUpdate('completed')} className="sm:ml-auto">
            <Check className="h-4 w-4 mr-2" />
            Mark Completed
          </Button>
        )}
        <Button 
          variant="destructive"
          onClick={() => handleStatusUpdate('cancelled')}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    );
  }
  
  // For completed or cancelled appointments
  return (
    <Button variant="outline" onClick={onEdit}>
      <Edit className="h-4 w-4 mr-2" />
      {isDoctor ? "Edit Appointment" : "View Details"}
    </Button>
  );
};

export default AppointmentActionButtons;

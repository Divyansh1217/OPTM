
import React from 'react';
import { Button } from '@/components/ui/button';

interface AppointmentActionsProps {
  appointmentId: string;
  onConfirmAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string) => void;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointmentId,
  onConfirmAppointment,
  onRescheduleAppointment
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 text-xs py-2 h-8"
        onClick={() => onConfirmAppointment?.(appointmentId)}
      >
        Confirm
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className="flex-1 text-xs py-2 h-8"
        onClick={() => onRescheduleAppointment?.(appointmentId)}
      >
        Reschedule
      </Button>
    </div>
  );
};

export default AppointmentActions;

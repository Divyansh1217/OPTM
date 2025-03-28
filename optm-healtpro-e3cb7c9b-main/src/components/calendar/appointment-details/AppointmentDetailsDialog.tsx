
import React from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointmentStatus } from '@/hooks/calendar/useAppointmentStatus';
import { AppointmentStatus } from '@/types/appointment';
import AppointmentInfo from './AppointmentInfo';
import AppointmentActionButtons from './AppointmentActionButtons';

interface AppointmentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  event: CalendarEvent;
  onEdit: () => void;
  onStatusChange?: () => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  open,
  onClose,
  event,
  onEdit,
  onStatusChange
}) => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const { 
    handleConfirmAppointment, 
    handleCancelAppointment, 
    handleCompleteAppointment 
  } = useAppointmentStatus();

  const handleStatusUpdate = async (newStatus: AppointmentStatus) => {
    let success = false;
    
    switch (newStatus) {
      case 'confirmed':
        success = await handleConfirmAppointment(event.id);
        break;
      case 'cancelled':
        success = await handleCancelAppointment(event.id);
        break;
      case 'completed':
        success = await handleCompleteAppointment(event.id);
        break;
    }
    
    if (success && onStatusChange) {
      onStatusChange();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {event.isAvailable ? (
              <>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Available Slot
                </Badge>
              </>
            ) : (
              <>
                <span>{event.title}</span>
                {event.status && (
                  <Badge 
                    variant="outline" 
                    className={
                      event.status === 'confirmed' ? "bg-blue-100 text-blue-800 border-blue-200" :
                      event.status === 'completed' ? "bg-green-100 text-green-800 border-green-200" :
                      event.status === 'cancelled' ? "bg-red-100 text-red-800 border-red-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                )}
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <AppointmentInfo 
          event={event}
          isDoctor={isDoctor}
        />
        
        <DialogFooter className="flex sm:justify-between gap-2">
          <AppointmentActionButtons 
            event={event}
            isDoctor={isDoctor}
            onEdit={onEdit}
            handleStatusUpdate={handleStatusUpdate}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;

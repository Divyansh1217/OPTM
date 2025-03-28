
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: string;
}

interface AppointmentItemProps {
  appointment: Appointment;
  onViewPatient: (name: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onViewPatient
}) => {
  return (
    <div className="flex items-center justify-between border-b border-border/20 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">{appointment.patientName}</h4>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{appointment.time}</span>
            <span>•</span>
            <span>{appointment.type}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge 
          variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {appointment.status}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => onViewPatient(appointment.patientName)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default AppointmentItem;

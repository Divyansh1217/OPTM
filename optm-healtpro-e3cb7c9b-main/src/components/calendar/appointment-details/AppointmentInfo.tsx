
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent } from '@/hooks/calendar/types';
import AppointmentDateTime from './AppointmentDateTime';
import AppointmentPatientInfo from './AppointmentPatientInfo';
import AppointmentLocation from './AppointmentLocation';
import AppointmentNotes from './AppointmentNotes';
import AppointmentStatus from './AppointmentStatus';

interface AppointmentInfoProps {
  event: CalendarEvent;
  isDoctor: boolean;
}

const AppointmentInfo: React.FC<AppointmentInfoProps> = ({
  event,
  isDoctor
}) => {
  // Always convert to Date objects
  const startDate = event.start instanceof Date ? event.start : new Date(event.start);
  const endDate = event.end instanceof Date ? event.end : new Date(event.end);

  return (
    <div className="space-y-4 py-4">
      <AppointmentDateTime 
        startDate={startDate}
        endDate={endDate}
      />
      
      <AppointmentPatientInfo 
        patientName={event.patientName || ''}
        showPatientInfo={!!event.patientName && isDoctor}
      />
      
      <AppointmentLocation location={event.location || ''} />
      
      <AppointmentNotes 
        description={event.description || ''}
        showNotes={!!event.description && isDoctor}
      />
      
      <AppointmentStatus 
        isAvailable={!!event.isAvailable}
        status={event.status}
        isDoctor={isDoctor}
      />
    </div>
  );
};

export default AppointmentInfo;

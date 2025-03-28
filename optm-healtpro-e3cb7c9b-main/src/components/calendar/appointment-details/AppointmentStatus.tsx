
import React from 'react';

interface AppointmentStatusProps {
  isAvailable: boolean;
  status?: string;
  isDoctor: boolean;
}

const AppointmentStatus: React.FC<AppointmentStatusProps> = ({
  isAvailable,
  status,
  isDoctor
}) => {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="text-sm text-muted-foreground">
        {isAvailable ? (
          "This time slot is available for booking."
        ) : (
          isDoctor ? 
            `This appointment is currently ${status || 'scheduled'}.` : 
            "You have an appointment scheduled at this time."
        )}
      </div>
    </div>
  );
};

export default AppointmentStatus;

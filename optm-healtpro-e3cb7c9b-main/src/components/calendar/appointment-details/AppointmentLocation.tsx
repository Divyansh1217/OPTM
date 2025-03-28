
import React from 'react';
import { MapPin } from 'lucide-react';

interface AppointmentLocationProps {
  location: string;
}

const AppointmentLocation: React.FC<AppointmentLocationProps> = ({
  location
}) => {
  if (!location) return null;

  return (
    <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
      <MapPin className="h-5 w-5 text-muted-foreground" />
      <div>
        <div className="font-medium">Location</div>
        <div className="text-sm">{location}</div>
      </div>
    </div>
  );
};

export default AppointmentLocation;


import React from 'react';
import { User } from 'lucide-react';

interface AppointmentPatientInfoProps {
  patientName: string;
  showPatientInfo: boolean;
}

const AppointmentPatientInfo: React.FC<AppointmentPatientInfoProps> = ({
  patientName,
  showPatientInfo
}) => {
  if (!showPatientInfo) return null;

  return (
    <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
      <User className="h-5 w-5 text-muted-foreground" />
      <div>
        <div className="font-medium">Patient</div>
        <div className="text-sm">{patientName}</div>
      </div>
    </div>
  );
};

export default AppointmentPatientInfo;

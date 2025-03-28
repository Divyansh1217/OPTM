
import React from 'react';
import { FileText, Calendar, User, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Patient } from '@/pages/patients/types';

interface PatientTableRowProps {
  patient: Patient;
  onViewPatient: (patientId: number) => void;
}

export const PatientTableRow: React.FC<PatientTableRowProps> = ({
  patient,
  onViewPatient,
}) => {
  const handleViewRecords = (patientId: number) => {
    onViewPatient(patientId);
  };

  const handleScheduleAppointment = (patientId: number) => {
    toast.info("Schedule Appointment", {
      description: "Opening appointment scheduler",
      duration: 3000
    });
  };

  const handleEditProfile = (patientId: number) => {
    onViewPatient(patientId);
  };

  const handleViewOptions = (patientId: number) => {
    toast.info("More Options", {
      description: "Opening additional options menu",
      duration: 3000
    });
  };

  return (
    <tr 
      key={patient.id} 
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
      onClick={() => handleViewRecords(patient.id)}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">
            {patient.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="font-medium">{patient.name}</div>
            <div className="text-xs text-muted-foreground">
              {patient.age} years • {patient.gender}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{patient.condition}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm font-mono">{patient.icdCode}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{patient.lastVisit}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm">{patient.nextVisit}</span>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleViewRecords(patient.id);
            }}
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleScheduleAppointment(patient.id);
            }}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleEditProfile(patient.id);
            }}
          >
            <User className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleViewOptions(patient.id);
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

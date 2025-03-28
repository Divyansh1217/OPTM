
import React from 'react';
import { FileText } from 'lucide-react';

interface AppointmentNotesProps {
  description: string;
  showNotes: boolean;
}

const AppointmentNotes: React.FC<AppointmentNotesProps> = ({
  description,
  showNotes
}) => {
  if (!description || !showNotes) return null;

  return (
    <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
      <FileText className="h-5 w-5 text-muted-foreground" />
      <div>
        <div className="font-medium">Notes</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};

export default AppointmentNotes;

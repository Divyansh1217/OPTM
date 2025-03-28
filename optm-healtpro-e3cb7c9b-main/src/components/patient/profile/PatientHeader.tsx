
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PatientHeaderProps {
  patient: {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    condition: string;
    icdCode: string;
  };
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
  return (
    <div className="flex items-center p-4 border-b dark:border-gray-700">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        <img 
          src="https://randomuser.me/api/portraits/men/44.jpg" 
          alt={patient.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h2 className="text-xl font-bold">{patient.name}, {patient.age} y.o.</h2>
          <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
            {patient.icdCode} - {patient.condition}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{patient.address}</p>
      </div>
    </div>
  );
};

export default PatientHeader;

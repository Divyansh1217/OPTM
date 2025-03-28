
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from 'lucide-react';

interface MedicationHeaderProps {
  name: string;
  description: string;
}

const MedicationHeader: React.FC<MedicationHeaderProps> = ({ name, description }) => {
  return (
    <CardHeader className="pb-3">
      <CardTitle className="text-xl flex items-center">
        <Pill className="h-5 w-5 mr-2 text-primary" />
        {name}
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </CardHeader>
  );
};

export default MedicationHeader;


import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface PatientListHeaderProps {
  title: string;
  description: string;
}

export const PatientListHeader: React.FC<PatientListHeaderProps> = ({
  title,
  description,
}) => {
  const handleAddPatient = () => {
    toast.info("Add Patient", {
      description: "Opening new patient form",
      duration: 3000
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      
      <Button onClick={handleAddPatient}>
        <Plus className="h-4 w-4 mr-2" />
        Add Patient
      </Button>
    </div>
  );
};

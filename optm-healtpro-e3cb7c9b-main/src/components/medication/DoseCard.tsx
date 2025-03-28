
import React from 'react';
import { Pill, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MedicationWithSummary, MedicationDose } from '@/types/medicationData';

interface DoseCardProps {
  medication: MedicationWithSummary;
  dose: MedicationDose;
  onTakeDose: (medicationId: string, doseId: string) => void;
  onMissDose: (medicationId: string, doseId: string) => void;
}

const DoseCard: React.FC<DoseCardProps> = ({ 
  medication, 
  dose, 
  onTakeDose, 
  onMissDose 
}) => {
  const isPast = new Date(dose.timestamp).getTime() < new Date().getTime();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  return (
    <div 
      key={dose.id}
      className={`p-4 border rounded-lg mb-3 ${
        dose.status === 'taken' 
          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
          : dose.status === 'missed'
          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
          : 'bg-card border-border'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pill className="h-5 w-5 text-primary" />
          <div>
            <h4 className="font-medium">{medication.name}</h4>
            <p className="text-xs text-muted-foreground">{medication.description}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {formatDate(dose.timestamp)}
        </div>
      </div>
      
      {dose.status === 'scheduled' && (
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            className="w-full flex items-center" 
            onClick={() => onTakeDose(medication.id, dose.id)}
          >
            <Check className="h-4 w-4 mr-1" /> Take Now
          </Button>
          {isPast && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center text-destructive hover:text-destructive" 
              onClick={() => onMissDose(medication.id, dose.id)}
            >
              <X className="h-4 w-4 mr-1" /> Skip
            </Button>
          )}
        </div>
      )}
      
      {dose.status === 'taken' && (
        <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center">
          <Check className="h-4 w-4 mr-1" /> Taken at {
            new Intl.DateTimeFormat('en-US', { 
              hour: 'numeric',
              minute: 'numeric'
            }).format(new Date(dose.timestamp))
          }
        </div>
      )}
      
      {dose.status === 'missed' && (
        <div className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center">
          <X className="h-4 w-4 mr-1" /> Missed
        </div>
      )}
    </div>
  );
};

export default DoseCard;

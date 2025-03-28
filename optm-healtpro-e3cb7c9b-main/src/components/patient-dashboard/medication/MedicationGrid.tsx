
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MedicationWithSummary } from '@/types/medicationData';

interface MedicationGridProps {
  medications: MedicationWithSummary[];
  onSelectMedication: (id: string) => void;
}

const MedicationGrid: React.FC<MedicationGridProps> = ({ 
  medications, 
  onSelectMedication 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {medications.map(medication => (
        <Card 
          key={medication.id} 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectMedication(medication.id)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{medication.name}</h3>
              <span className={`text-xs rounded-full px-2 py-0.5 ${
                medication.summary.adherenceRate >= 80 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : medication.summary.adherenceRate >= 50
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {Math.round(medication.summary.adherenceRate)}% Adherence
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {medication.description}
            </p>
            
            <div className="flex justify-between text-sm">
              <span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {medication.summary.dosesTaken}
                </span> taken
              </span>
              <span>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  {medication.summary.dosesMissed}
                </span> missed
              </span>
              <span>
                <span className="text-primary font-medium">
                  {medication.frequency}x
                </span> daily
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MedicationGrid;

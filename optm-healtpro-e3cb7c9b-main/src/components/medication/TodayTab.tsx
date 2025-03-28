
import React from 'react';
import DoseCard from './DoseCard';
import { MedicationWithSummary, MedicationDose } from '@/types/medicationData';

interface TodayTabProps {
  medications: MedicationWithSummary[];
  onTakeDose: (medicationId: string, doseId: string) => void;
  onMissDose: (medicationId: string, doseId: string) => void;
}

const TodayTab: React.FC<TodayTabProps> = ({ 
  medications, 
  onTakeDose, 
  onMissDose 
}) => {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Filter doses for today
  const getTodayDoses = () => {
    const doses: { medication: MedicationWithSummary, dose: MedicationDose }[] = [];
    
    medications.forEach(medication => {
      medication.doses.forEach(dose => {
        const doseDate = new Date(dose.timestamp);
        doseDate.setHours(0, 0, 0, 0);
        
        if (doseDate.getTime() === today.getTime()) {
          doses.push({ medication, dose });
        }
      });
    });
    
    // Sort by time
    return doses.sort((a, b) => 
      new Date(a.dose.timestamp).getTime() - new Date(b.dose.timestamp).getTime()
    );
  };
  
  const todayDoses = getTodayDoses();
  
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium">Today's Medications</h3>
      <p className="text-xs text-muted-foreground mb-4">
        {todayDoses.length} doses scheduled for today
      </p>
      
      {todayDoses.length > 0 ? (
        <div className="space-y-2">
          {todayDoses.map(({ medication, dose }) => (
            <DoseCard 
              key={dose.id}
              medication={medication} 
              dose={dose} 
              onTakeDose={onTakeDose}
              onMissDose={onMissDose}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No medications scheduled for today</p>
        </div>
      )}
    </div>
  );
};

export default TodayTab;

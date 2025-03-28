
import React from 'react';
import DoseCard from './DoseCard';
import { MedicationWithSummary, MedicationDose } from '@/types/medicationData';

interface UpcomingTabProps {
  medications: MedicationWithSummary[];
  onTakeDose: (medicationId: string, doseId: string) => void;
  onMissDose: (medicationId: string, doseId: string) => void;
}

const UpcomingTab: React.FC<UpcomingTabProps> = ({ 
  medications, 
  onTakeDose, 
  onMissDose 
}) => {
  // Get upcoming doses (scheduled or within the next 24 hours)
  const getUpcomingDoses = () => {
    const doses: { medication: MedicationWithSummary, dose: MedicationDose }[] = [];
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    medications.forEach(medication => {
      medication.doses.forEach(dose => {
        const doseDate = new Date(dose.timestamp);
        
        if (
          dose.status === 'scheduled' && 
          doseDate.getTime() > now.getTime() && 
          doseDate.getTime() < tomorrow.getTime()
        ) {
          doses.push({ medication, dose });
        }
      });
    });
    
    // Sort by time
    return doses.sort((a, b) => 
      new Date(a.dose.timestamp).getTime() - new Date(b.dose.timestamp).getTime()
    );
  };
  
  const upcomingDoses = getUpcomingDoses();
  
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium">Upcoming Medications</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Your next {upcomingDoses.length} doses
      </p>
      
      {upcomingDoses.length > 0 ? (
        <div className="space-y-2">
          {upcomingDoses.map(({ medication, dose }) => (
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
          <p className="text-muted-foreground">No upcoming medications in the next 24 hours</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingTab;

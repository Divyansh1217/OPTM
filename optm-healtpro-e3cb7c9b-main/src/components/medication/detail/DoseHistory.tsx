
import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MedicationDose, MedicationWithSummary } from '@/types/medicationData';
import { formatDate, groupDosesByDate, getSortedDates, getDoseStatusIcon } from './helpers';

interface DoseHistoryProps {
  medication: MedicationWithSummary;
  onTakeDose?: (medicationId: string, doseId: string) => void;
  onMissDose?: (medicationId: string, doseId: string) => void;
}

const DoseHistory: React.FC<DoseHistoryProps> = ({ medication, onTakeDose, onMissDose }) => {
  const dosesByDate = groupDosesByDate(medication);
  const dates = getSortedDates(dosesByDate);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className={`h-4 w-4 ${getDoseStatusIcon(status)}`} />;
      case 'missed':
        return <XCircle className={`h-4 w-4 ${getDoseStatusIcon(status)}`} />;
      default:
        return <Clock className={`h-4 w-4 ${getDoseStatusIcon(status)}`} />;
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3 flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        Dose History
      </h3>
      
      <div className="space-y-4">
        {dates.map(date => (
          <div key={date} className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2 font-medium text-sm">
              {new Date(date).toLocaleDateString(undefined, { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="divide-y">
              {dosesByDate[date].map(dose => {
                const isPast = new Date(dose.timestamp).getTime() < new Date().getTime();
                const isToday = new Date(dose.timestamp).toDateString() === new Date().toDateString();
                
                return (
                  <div key={dose.id} className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      {getStatusIcon(dose.status)}
                      <div className="ml-3">
                        <p className="font-medium">{formatDate(dose.timestamp)}</p>
                        <p className="text-xs text-muted-foreground">
                          {dose.status === 'taken' ? 'Taken' : dose.status === 'missed' ? 'Missed' : 'Scheduled'}
                        </p>
                      </div>
                    </div>
                    
                    {dose.status === 'scheduled' && isPast && isToday && onTakeDose && onMissDose && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onTakeDose(medication.id, dose.id)}
                          className="text-xs bg-primary text-white rounded-md px-2 py-1 hover:bg-primary/90"
                        >
                          Take Now
                        </button>
                        <button 
                          onClick={() => onMissDose(medication.id, dose.id)}
                          className="text-xs bg-destructive text-white rounded-md px-2 py-1 hover:bg-destructive/90"
                        >
                          Skip
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoseHistory;

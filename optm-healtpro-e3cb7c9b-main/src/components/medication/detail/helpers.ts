
import { MedicationWithSummary, MedicationDose } from '@/types/medicationData';

// Format date for display
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

// Group doses by date
export const groupDosesByDate = (medication: MedicationWithSummary) => {
  const grouped: { [date: string]: MedicationDose[] } = {};
  
  medication.doses.forEach(dose => {
    const date = new Date(dose.timestamp);
    const dateString = date.toISOString().split('T')[0];
    
    if (!grouped[dateString]) {
      grouped[dateString] = [];
    }
    
    grouped[dateString].push(dose);
  });
  
  return grouped;
};

// Get sorted dates from grouped doses
export const getSortedDates = (dosesByDate: { [date: string]: MedicationDose[] }) => {
  return Object.keys(dosesByDate).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );
};

// Get medication status card color based on adherence rate
export const getStatusColor = (rate: number) => {
  if (rate >= 80) return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
  if (rate >= 50) return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
  return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
};

// Get dose status icon
export const getDoseStatusIcon = (status: string) => {
  switch (status) {
    case 'taken':
      return 'text-green-500';
    case 'missed':
      return 'text-red-500';
    default:
      return 'text-amber-500';
  }
};

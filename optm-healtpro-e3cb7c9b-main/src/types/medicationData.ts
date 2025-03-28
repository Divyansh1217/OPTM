
export interface MedicationDose {
  id: string;
  medicationId: string;
  timestamp: string;
  status: 'taken' | 'missed' | 'scheduled';
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  description: string;
  frequency: number; // doses per day
  startDate: string;
  endDate?: string;
  doses: MedicationDose[];
  isActive: boolean;
}

export interface MedicationSummary {
  adherenceRate: number; // percentage of doses taken
  dosesScheduled: number;
  dosesTaken: number;
  dosesMissed: number;
  lastTaken?: string;
}

export interface MedicationWithSummary extends Medication {
  summary: MedicationSummary;
}

export interface MedicationImprovementData {
  date: string;
  adherenceRate: number;
  healthScore: number;
  symptoms: {
    [symptomName: string]: number; // symptom severity from 0-10
  };
}

export interface PatientMedication {
  patientId: string;
  medications: MedicationWithSummary[];
  improvements: MedicationImprovementData[];
}

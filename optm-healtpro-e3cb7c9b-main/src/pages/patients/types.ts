
export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low';
  timestamp: string;
  percentage: number;
  trend: string;
  description: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  email: string;
  condition: string;
  icdCode: string;
  lastVisit: string;
  nextVisit: string;
  biomarkers?: Biomarker[];
  medicalRecords?: any[];
}

export interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
  onUpdate: (patient: Patient) => void;
}

export interface PatientsListProps {
  patients: Patient[];
  onViewPatient: (patientId: number) => void;
  isLoading?: boolean; // Added this optional property
}

export interface PatientsLayoutProps {
  children: React.ReactNode;
}

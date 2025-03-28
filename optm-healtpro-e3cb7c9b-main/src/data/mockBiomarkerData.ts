
export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  timestamp: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  possibleCauses?: string[];
  recommendations?: string[];
}

export const mockBiomarkers: Biomarker[] = [
  {
    id: 'bm1',
    name: 'Hemoglobin',
    value: 14.2,
    unit: 'g/dL',
    normalRange: '13.5-17.5',
    status: 'normal',
    timestamp: '2023-05-15T10:30:00',
    percentage: 82,
    trend: 'stable',
    description: 'Protein in red blood cells that carries oxygen throughout the body'
  },
  {
    id: 'bm2',
    name: 'White Blood Cell Count',
    value: 9.1,
    unit: 'K/uL',
    normalRange: '4.5-11.0',
    status: 'normal',
    timestamp: '2023-05-15T10:30:00',
    percentage: 77,
    trend: 'up',
    description: 'Cells that help fight infection and other diseases'
  },
  {
    id: 'bm3',
    name: 'Glucose (Fasting)',
    value: 118,
    unit: 'mg/dL',
    normalRange: '70-99',
    status: 'elevated',
    timestamp: '2023-05-15T10:30:00',
    percentage: 65,
    trend: 'up',
    description: 'Blood sugar level after not eating for at least 8 hours'
  },
  {
    id: 'bm4',
    name: 'Total Cholesterol',
    value: 215,
    unit: 'mg/dL',
    normalRange: '125-200',
    status: 'elevated',
    timestamp: '2023-05-15T10:30:00',
    percentage: 58,
    trend: 'up',
    description: 'Measures all the cholesterol in your blood'
  },
  {
    id: 'bm5',
    name: 'HDL Cholesterol',
    value: 52,
    unit: 'mg/dL',
    normalRange: '40-60',
    status: 'normal',
    timestamp: '2023-05-15T10:30:00',
    percentage: 86,
    trend: 'stable',
    description: 'Good cholesterol that helps remove LDL from your arteries'
  },
  {
    id: 'bm6',
    name: 'LDL Cholesterol',
    value: 145,
    unit: 'mg/dL',
    normalRange: '0-99',
    status: 'elevated',
    timestamp: '2023-05-15T10:30:00',
    percentage: 42,
    trend: 'up',
    description: 'Bad cholesterol that can build up in your arteries'
  }
];

// Mock data for biological age
export const mockBiologicalAge = 21;
export const mockChronologicalAge = 32;

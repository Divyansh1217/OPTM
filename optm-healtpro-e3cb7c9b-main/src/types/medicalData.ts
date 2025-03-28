
/**
 * Shared data types for medical data synchronization
 */

export interface MedicalReport {
  id: string;
  patientId: string;
  timestamp: string;
  reportType: string;
  content: string;
  source: 'upload' | 'text' | 'api';
  fileName?: string;
  fileType?: string;
  analyzed: boolean;
  analysisId?: string;
}

export interface BiomarkerValue {
  value: number | string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  timestamp: string;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

export interface Biomarker {
  id: string;
  name: string;
  category: string;
  description: string;
  latestValue: BiomarkerValue;
  historicalValues: BiomarkerValue[];
  relatedSymptoms: string[];
  affectedBodyParts: string[];
  recommendations?: string[];
}

export interface SymptomRecord {
  id: string;
  symptomName: string;
  severity: number; // 1-10
  timestamp: string;
  relatedBiomarkers: string[];
  notes?: string;
}

export interface AnatomicalMapping {
  bodyPart: string;
  coordinates: { x: number; y: number };
  affectedBiomarkers: string[];
  severity: number; // 1-10
  notes?: string;
}

export interface MedicalAnalysis {
  id: string;
  reportId: string;
  timestamp: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  extractedBiomarkers: ExtractedBiomarker[];
  suggestedDiagnoses?: string[];
}

export interface ExtractedBiomarker {
  name: string;
  value: number | string;
  unit: string;
  normalRange?: string;
  status?: 'normal' | 'elevated' | 'low' | 'critical';
}

export interface Patient {
  id: string;
  name: string;
  biomarkers: Biomarker[];
  symptoms: SymptomRecord[];
  anatomicalMappings: AnatomicalMapping[];
  reports: MedicalReport[];
  analyses: MedicalAnalysis[];
}

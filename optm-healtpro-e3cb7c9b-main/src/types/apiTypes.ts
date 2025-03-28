
import { MedicalReport, MedicalAnalysis, Biomarker, Patient } from './medicalData';

/**
 * API Response types for standardized error handling
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Report upload request and response types
 */
export interface ReportUploadRequest {
  file: File;
  patientId: string;
  reportType?: string;
  notes?: string;
}

export interface ReportUploadResponse {
  report: MedicalReport;
  analysis: MedicalAnalysis;
  insights?: string;
}

/**
 * Patient data request and response types
 */
export interface PatientDataRequest {
  patientId: string;
}

export interface PatientDataResponse {
  patient: Patient;
}

/**
 * Biomarker data request and response types
 */
export interface BiomarkerHistoryRequest {
  biomarkerId: string;
  startDate?: string;
  endDate?: string;
}

export interface BiomarkerHistoryResponse {
  biomarker: Biomarker;
  history: {
    dates: string[];
    values: number[];
    statuses: string[];
  };
}

/**
 * Data sync status types
 */
export interface SyncStatusResponse {
  lastSyncTime: string;
  pendingSyncItems: number;
  syncStatus: 'synced' | 'syncing' | 'failed' | 'never';
}

/**
 * AI analysis request and response types
 */
export interface AiAnalysisRequest {
  content: string;
  contentType: 'text' | 'report' | 'question';
  patientId?: string;
}

export interface AiAnalysisResponse {
  analysis?: MedicalAnalysis;
  answer?: string;
  sources?: string[];
}

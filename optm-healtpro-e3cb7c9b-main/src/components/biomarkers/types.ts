
import { MedicalAnalysis, ExtractedBiomarker } from '@/types/medicalData';

export interface ReportAnalysis extends MedicalAnalysis {
  reportType: string;
  normalValues: Record<string, { value: string; status: 'normal' | 'abnormal' | 'critical' }>;
}

export interface MedicalReportAIProps {
  onAnalysisComplete?: (analysisResult: MedicalAnalysis) => void;
}

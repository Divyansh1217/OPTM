
import { MedicalReport, MedicalAnalysis, ExtractedBiomarker } from '@/types/medicalData';
import { ReportAnalysis } from '../types';

/**
 * Attempts to determine report type from filename
 */
export const getReportTypeFromFilename = (filename: string): string => {
  const lowerName = filename.toLowerCase();
  
  if (lowerName.includes('blood')) return 'Blood Test';
  if (lowerName.includes('thyroid')) return 'Thyroid Panel';
  if (lowerName.includes('lipid')) return 'Lipid Panel';
  if (lowerName.includes('glucose')) return 'Glucose Test';
  if (lowerName.includes('vitamin')) return 'Vitamin Panel';
  if (lowerName.includes('cbc')) return 'Complete Blood Count';
  if (lowerName.includes('metabolic')) return 'Metabolic Panel';
  
  return 'Medical Report';
};

/**
 * Attempts to determine report type from text content
 */
export const detectReportTypeFromText = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('blood test') || lowerText.includes('blood panel') || lowerText.includes('blood count')) {
    return 'Blood Test';
  }
  if (lowerText.includes('thyroid')) return 'Thyroid Panel';
  if (lowerText.includes('lipid') || lowerText.includes('cholesterol') || lowerText.includes('hdl') || lowerText.includes('ldl')) {
    return 'Lipid Panel';
  }
  if (lowerText.includes('glucose') || lowerText.includes('a1c') || lowerText.includes('diabetes')) {
    return 'Glucose Test';
  }
  if (lowerText.includes('vitamin')) return 'Vitamin Panel';
  if (lowerText.includes('metabolic')) return 'Metabolic Panel';
  
  return 'Medical Report';
};

// Helper function to convert MedicalAnalysis to ReportAnalysis
export const convertToReportAnalysis = (analysis: MedicalAnalysis): ReportAnalysis => {
  // Create normalValues from extractedBiomarkers
  const normalValues: Record<string, { value: string; status: 'normal' | 'abnormal' | 'critical' }> = {};
  
  if (analysis.extractedBiomarkers) {
    analysis.extractedBiomarkers.forEach(biomarker => {
      let displayStatus: 'normal' | 'abnormal' | 'critical';
      
      // Map the status values
      switch(biomarker.status) {
        case 'normal':
          displayStatus = 'normal';
          break;
        case 'critical':
          displayStatus = 'critical';
          break;
        default:
          displayStatus = 'abnormal';
          break;
      }
      
      normalValues[biomarker.name] = {
        value: String(biomarker.value) + (biomarker.unit ? ` ${biomarker.unit}` : ''),
        status: displayStatus
      };
    });
  }
  
  return {
    ...analysis,
    reportType: 'Medical Analysis',
    normalValues
  };
};

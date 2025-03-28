
import { MedicalAnalysis } from '@/types/medicalData';
import extractReportAnalysis from './ai/reportAnalysis';
import { normalizeStatus } from './ai/statusUtils';

export const analyzeReportContent = async (reportContent: string): Promise<MedicalAnalysis> => {
  if (!reportContent) {
    throw new Error("Report content cannot be empty.");
  }

  try {
    return await extractReportAnalysis(reportContent);
  } catch (error) {
    console.error("Failed to analyze report content:", error);
    throw error;
  }
};

// Re-export normalizeStatus for use elsewhere
export { normalizeStatus };

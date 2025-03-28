
/**
 * Re-export medical report services from their modularized files
 * This file is maintained for backward compatibility
 */

import { MedicalReportService as OriginalMedicalReportService } from './reports/medicalReportService';
import { ReportInsightsService } from './reports/reportInsightsService';

/**
 * Legacy class that forwards to the new modular services
 * @deprecated Use MedicalReportService and ReportInsightsService directly
 */
class LegacyMedicalReportService {
  /**
   * @deprecated Use ReportInsightsService.generateInsightsFromAnalysis directly
   */
  static async generateInsightsFromAnalysis(...args: Parameters<typeof ReportInsightsService.generateInsightsFromAnalysis>) {
    return ReportInsightsService.generateInsightsFromAnalysis(...args);
  }
}

// Export the original services for backward compatibility
export { OriginalMedicalReportService as MedicalReportService, ReportInsightsService };


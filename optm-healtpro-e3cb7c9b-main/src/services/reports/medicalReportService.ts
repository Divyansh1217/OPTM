
import { MedicalReport, MedicalAnalysis, Patient } from '@/types/medicalData';
import { DataSyncService } from '../dataSyncService';
import { storeInLocalStorage, getFromLocalStorage } from '../storage/localStorageService';
import { User } from '@/contexts/auth/types';
import { hasPermission } from '@/utils/rbac';

/**
 * Service for handling medical report operations with role-based access control
 */
export class MedicalReportService {
  /**
   * Uploads a medical report file to storage and processes it
   * Checks for appropriate permissions
   */
  static async uploadAndProcessReport(
    file: File,
    patientId: string,
    currentUser?: User | null
  ): Promise<{
    report: MedicalReport;
    analysis: MedicalAnalysis;
  } | null> {
    try {
      // Permission check
      if (currentUser) {
        const canUpload = 
          hasPermission(currentUser, 'REPORTS', 'CREATE') || 
          (currentUser.role === 'patient' && (currentUser.patientId === patientId || currentUser.id === patientId));
          
        if (!canUpload) {
          console.error("Permission denied: User cannot upload reports for this patient");
          return null;
        }
      }
      
      console.log(`Uploading medical report for patient: ${patientId}`);
      
      // 1. Get file content
      let reportContent = await this.extractContentFromFile(file);
      
      // 2. Create report record
      const report: MedicalReport = {
        id: `report-${Date.now()}`,
        patientId,
        timestamp: new Date().toISOString(),
        reportType: this.determineReportType(file.name, reportContent),
        content: reportContent,
        source: 'upload',
        fileName: file.name,
        fileType: file.type,
        analyzed: false
      };
      
      // 3. Store report in localStorage
      this.storeReportInLocalStorage(report);
      
      // 4. Get patient data
      const patient = await DataSyncService.getPatientData(patientId);
      if (!patient) throw new Error("Patient not found");
      
      // 5. Process the report
      const { analysis } = await DataSyncService.processMedicalReport(report, patient);
      
      return { report, analysis };
    } catch (error) {
      console.error("Error uploading and processing report:", error);
      return null;
    }
  }
  
  /**
   * Store report data in localStorage as a temporary solution
   */
  static storeReportInLocalStorage(report: MedicalReport): void {
    storeInLocalStorage('reports', report);
  }
  
  /**
   * Get all reports for a patient from localStorage with role-based access control
   */
  static getPatientReports(patientId: string, currentUser?: User | null): MedicalReport[] {
    // Permission check
    if (currentUser && currentUser.role === 'patient') {
      // Patients can only access their own reports
      if (currentUser.patientId !== patientId && currentUser.id !== patientId) {
        console.error("Permission denied: Patient attempting to access another patient's reports");
        return [];
      }
    }
    
    const allReports = getFromLocalStorage('reports');
    return allReports.filter((r: MedicalReport) => r.patientId === patientId);
  }
  
  /**
   * Extract content from a file based on its type
   */
  private static async extractContentFromFile(file: File): Promise<string> {
    if (file.type === 'application/pdf') {
      return await this.extractTextFromPdf(file);
    } else if (file.type.startsWith('image/')) {
      return `Image report: ${file.name}`;
      // Would implement OCR here in a real application
    } else {
      return await file.text();
    }
  }
  
  /**
   * Extract text from a PDF file
   */
  private static async extractTextFromPdf(file: File): Promise<string> {
    // In a real application, would use a PDF parsing library
    // For this demo, we'll return a mock message
    return `This is extracted text from PDF file: ${file.name}. 
    In a production environment, we would use a PDF parsing library or service.`;
  }
  
  /**
   * Determine the type of medical report based on filename and content
   */
  static determineReportType(fileName: string, content: string): string {
    fileName = fileName.toLowerCase();
    content = content.toLowerCase();
    
    if (fileName.includes('blood') || content.includes('blood test') || content.includes('cbc')) {
      return 'blood_test';
    } else if (fileName.includes('mri') || content.includes('mri')) {
      return 'mri';
    } else if (fileName.includes('xray') || fileName.includes('x-ray') || content.includes('xray') || content.includes('x-ray')) {
      return 'xray';
    } else if (fileName.includes('ct') || content.includes('ct scan') || content.includes('computerized tomography')) {
      return 'ct_scan';
    } else if (fileName.includes('ultrasound') || content.includes('ultrasound') || content.includes('sonogram')) {
      return 'ultrasound';
    } else {
      return 'general_report';
    }
  }
}

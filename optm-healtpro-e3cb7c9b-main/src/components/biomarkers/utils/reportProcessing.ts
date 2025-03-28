
import { ReportAnalysis } from '../types';

// Utility function to get color based on status
export const getStatusColor = (status: 'normal' | 'abnormal' | 'critical'): string => {
  switch (status) {
    case 'normal':
      return 'text-green-500';
    case 'abnormal':
      return 'text-amber-500';
    case 'critical':
      return 'text-red-500';
    default:
      return '';
  }
};

export const simulateProcessing = (
  isFileUpload: boolean,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  setProcessingProgress: React.Dispatch<React.SetStateAction<number>>,
  setAnalysis: React.Dispatch<React.SetStateAction<ReportAnalysis | null>>,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>,
  onAnalysisComplete: (analysis: ReportAnalysis) => void
) => {
  setIsProcessing(true);
  setProcessingProgress(0);
  
  const mockAnalysis: ReportAnalysis = {
    id: "report-" + Date.now(),
    reportId: `report-id-${Date.now()}`,
    timestamp: new Date().toISOString(),
    reportType: isFileUpload ? "File Upload" : "Text Input",
    summary: "Your blood test results are generally within normal ranges with a few areas that may need attention. Your lipid panel shows slightly elevated LDL cholesterol, which should be monitored. All other metrics are within healthy ranges.",
    keyFindings: [
      "LDL Cholesterol is slightly elevated at 130 mg/dL (optimal is <100 mg/dL)",
      "Blood pressure is optimal at 118/78 mmHg",
      "Fasting glucose is within normal range at 92 mg/dL",
      "Vitamin D levels are sufficient at 45 ng/mL"
    ],
    normalValues: {
      "Total Cholesterol": { value: "210 mg/dL", status: "abnormal" },
      "HDL Cholesterol": { value: "65 mg/dL", status: "normal" },
      "LDL Cholesterol": { value: "130 mg/dL", status: "abnormal" },
      "Triglycerides": { value: "88 mg/dL", status: "normal" },
      "Fasting Glucose": { value: "92 mg/dL", status: "normal" },
      "HbA1c": { value: "5.4%", status: "normal" },
      "Blood Pressure": { value: "118/78 mmHg", status: "normal" },
      "ALT (Liver)": { value: "22 U/L", status: "normal" },
      "AST (Liver)": { value: "24 U/L", status: "normal" },
      "Vitamin D": { value: "45 ng/mL", status: "normal" }
    },
    recommendations: [
      "Consider dietary adjustments to help lower LDL cholesterol, such as reducing saturated fats and increasing soluble fiber",
      "Maintain your current physical activity level to support your healthy blood pressure",
      "Continue with your current vitamin D intake as levels are sufficient",
      "Schedule a follow-up lipid panel in 6 months to monitor cholesterol levels"
    ],
    extractedBiomarkers: [
      { name: "Total Cholesterol", value: 210, unit: "mg/dL", normalRange: "125-200", status: "elevated" },
      { name: "HDL Cholesterol", value: 65, unit: "mg/dL", normalRange: "40-60", status: "normal" },
      { name: "LDL Cholesterol", value: 130, unit: "mg/dL", normalRange: "0-99", status: "elevated" },
      { name: "Triglycerides", value: 88, unit: "mg/dL", normalRange: "0-149", status: "normal" },
      { name: "Fasting Glucose", value: 92, unit: "mg/dL", normalRange: "70-99", status: "normal" },
      { name: "HbA1c", value: 5.4, unit: "%", normalRange: "4.0-5.6", status: "normal" },
      { name: "Blood Pressure", value: "118/78", unit: "mmHg", normalRange: "90/60-120/80", status: "normal" },
      { name: "ALT", value: 22, unit: "U/L", normalRange: "7-56", status: "normal" },
      { name: "AST", value: 24, unit: "U/L", normalRange: "8-48", status: "normal" },
      { name: "Vitamin D", value: 45, unit: "ng/mL", normalRange: "30-50", status: "normal" }
    ]
  };
  
  // Simulate processing with progress updates
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    
    // Pass the number value directly instead of a function
    setProcessingProgress(Math.round(progress));
    
    if (progress === 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsProcessing(false);
        setAnalysis(mockAnalysis);
        setActiveTab('analysis');
        onAnalysisComplete(mockAnalysis);
      }, 500);
    }
  }, 300);
};


import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMedicalData } from '@/contexts/MedicalDataContext';
import { MedicalReport, MedicalAnalysis } from '@/types/medicalData';
import { getReportTypeFromFilename, detectReportTypeFromText } from '../utils/reportUtils';

interface UseReportProcessingProps {
  onAnalysisComplete?: (analysis: MedicalAnalysis) => void;
}

export const useReportProcessing = ({ onAnalysisComplete }: UseReportProcessingProps) => {
  const { toast } = useToast();
  const { processMedicalReport, lastAnalysis, isLoading } = useMedicalData();
  
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      toast({
        title: "File Selected",
        description: `${e.target.files[0].name} ready for analysis`,
      });
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setError(null);
  };

  const handleProcessFile = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a medical report to analyze",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // Create a progress interval to show activity while processing
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + Math.random() * 5;
          return newProgress > 95 ? 95 : newProgress; // Cap at 95% until actual completion
        });
      }, 300);
      
      // Create a new medical report object
      const report: MedicalReport = {
        id: `report-${Date.now()}`,
        patientId: 'default-patient', // Would come from authentication in a real app
        timestamp: new Date().toISOString(),
        reportType: getReportTypeFromFilename(file.name),
        content: `File upload: ${file.name}`,
        source: 'upload',
        fileName: file.name,
        fileType: file.type,
        analyzed: false
      };
      
      // Process the report using our data sync service
      const analysis = await processMedicalReport(report);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      // Complete the UI progress
      setProcessingProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        
        if (analysis) {
          setActiveTab('analysis');
          if (onAnalysisComplete) {
            onAnalysisComplete(analysis);
          }
        }
      }, 500);
      
    } catch (err) {
      setIsProcessing(false);
      setError('Failed to process the file. Please try again.');
      console.error('Error in handleProcessFile:', err);
      toast({
        title: "Processing Failed",
        description: "There was an error analyzing your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProcessText = async () => {
    if (!textInput.trim()) {
      toast({
        title: "No Text Input",
        description: "Please enter medical report text to analyze",
        variant: "destructive",
      });
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // Create a progress interval to show activity while processing
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + Math.random() * 5;
          return newProgress > 95 ? 95 : newProgress; // Cap at 95% until actual completion
        });
      }, 300);
      
      // Create a new medical report object
      const report: MedicalReport = {
        id: `report-${Date.now()}`,
        patientId: 'default-patient', // Would come from authentication in a real app
        timestamp: new Date().toISOString(),
        reportType: detectReportTypeFromText(textInput),
        content: textInput,
        source: 'text',
        analyzed: false
      };
      
      // Process the report using our data sync service
      const analysis = await processMedicalReport(report);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      // Complete the UI progress
      setProcessingProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        
        if (analysis) {
          setActiveTab('analysis');
          if (onAnalysisComplete) {
            onAnalysisComplete(analysis);
          }
        }
      }, 500);
      
    } catch (err) {
      setIsProcessing(false);
      setError('Failed to process the text. Please try again.');
      console.error('Error in handleProcessText:', err);
      toast({
        title: "Processing Failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    file,
    isProcessing,
    processingProgress,
    activeTab,
    textInput,
    error,
    lastAnalysis,
    isLoading,
    setFile,
    setActiveTab,
    setTextInput,
    setError,
    handleFileChange,
    handleTextInputChange,
    handleProcessFile,
    handleProcessText
  };
};


import { useState } from 'react';
import { toast } from 'sonner';
import { generateBiomarker } from './biomarkerGenerator';
import { Biomarker } from '@/data/mockBiomarkerData';

interface UseFileUploadProps {
  onProcessComplete: (newBiomarker: Biomarker) => void;
}

export const useFileUpload = ({ onProcessComplete }: UseFileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingFile, setProcessingFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type (only accept PDFs and images for medical reports)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];
      if (!validTypes.includes(file.type)) {
        setFileError('Please upload a PDF or image file (JPEG, PNG, TIFF)');
        setUploadedFile(null);
        
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setFileError('File size exceeds 10MB limit');
        setUploadedFile(null);
        
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        return;
      }
      
      setUploadedFile(file);
      
      // Give immediate feedback that the file was selected
      toast(`${file.name} is ready for processing`, {
        description: "Click upload to process the file",
        duration: 4000
      });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileError(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const uploadFile = async () => {
    if (!uploadedFile) {
      toast.error("Please select a file to upload", {
        duration: 4000
      });
      return;
    }

    setIsUploading(true);
    setFileError(null);
    
    // Simulate upload progress - more realistic speeds
    let progress = 0;
    const uploadSpeed = Math.random() * 5 + 5; // Between 5-10% per tick
    const interval = setInterval(() => {
      progress += uploadSpeed;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
      }
      setUploadProgress(Math.min(Math.round(progress), 100));
      
      if (progress >= 100) {
        setTimeout(() => {
          setIsUploading(false);
          setProcessingFile(true);
          
          // Simulate AI processing of the file
          simulateProcessing();
        }, 500);
      }
    }, 300);
  };

  const simulateProcessing = () => {
    // Simulate processing time between 1-3 seconds
    const processingTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      try {
        setProcessingFile(false);
        
        // Generate a new biomarker with data that looks like it was extracted from the file
        // Pass the filename to help generate relevant biomarker type
        const newBiomarker = generateBiomarker(uploadedFile?.name);
        
        // Call the callback to add the biomarker to the state in the parent component
        onProcessComplete(newBiomarker);
        
        // Reset the form
        setUploadedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        toast.success(`New ${newBiomarker.name} data has been extracted and added to your profile`, {
          duration: 4000
        });
      } catch (error) {
        console.error('Error processing biomarker data:', error);
        setFileError('Failed to process biomarker data. Please try again.');
        toast.error("There was an error analyzing your medical report. Please try again.", {
          duration: 5000
        });
      }
    }, processingTime);
  };

  return {
    isUploading,
    uploadProgress,
    processingFile,
    uploadedFile,
    fileError,
    handleFileChange,
    removeFile,
    uploadFile
  };
};


import React from 'react';

interface UploadProgressUIProps {
  isUploading: boolean;
  processingFile: boolean;
  uploadProgress: number;
}

const UploadProgressUI: React.FC<UploadProgressUIProps> = ({
  isUploading,
  processingFile,
  uploadProgress,
}) => {
  if (!isUploading && !processingFile) {
    return null;
  }

  return (
    <div className="space-y-2">
      {isUploading && (
        <>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Uploading... {uploadProgress}%
          </p>
        </>
      )}
      
      {processingFile && (
        <div className="flex items-center justify-center space-x-2 py-2">
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm">Processing your file with AI...</span>
        </div>
      )}
    </div>
  );
};

export default UploadProgressUI;

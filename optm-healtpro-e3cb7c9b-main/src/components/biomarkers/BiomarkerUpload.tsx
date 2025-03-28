
import React from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Biomarker } from '@/data/mockBiomarkerData';

// Import our new components
import FileUploadUI from './upload/FileUploadUI';
import UploadProgressUI from './upload/UploadProgressUI';
import { useFileUpload } from './upload/useFileUpload';

interface BiomarkerUploadProps {
  onProcessComplete: (newBiomarker: Biomarker) => void;
}

const BiomarkerUpload: React.FC<BiomarkerUploadProps> = ({ onProcessComplete }) => {
  const {
    isUploading,
    uploadProgress,
    processingFile,
    uploadedFile,
    handleFileChange,
    removeFile,
    uploadFile
  } = useFileUpload({ onProcessComplete });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Test Results
        </CardTitle>
        <CardDescription>
          Upload your blood test reports or biomarker images for automatic processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FileUploadUI 
            isUploading={isUploading}
            processingFile={processingFile}
            uploadedFile={uploadedFile}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
          />
          
          <UploadProgressUI 
            isUploading={isUploading}
            processingFile={processingFile}
            uploadProgress={uploadProgress}
          />
          
          <Button
            onClick={uploadFile}
            className="w-full"
            disabled={!uploadedFile || isUploading || processingFile}
          >
            {isUploading ? 'Uploading...' : processingFile ? 'Processing...' : 'Upload and Process'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomarkerUpload;


import React from 'react';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadUIProps {
  isUploading: boolean;
  processingFile: boolean;
  uploadedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

const FileUploadUI: React.FC<FileUploadUIProps> = ({
  isUploading,
  processingFile,
  uploadedFile,
  handleFileChange,
  removeFile,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading || processingFile}
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <FileText className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-base font-medium">
            {uploadedFile ? uploadedFile.name : 'Drag and drop or click to upload'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Supports: PDF, JPG, PNG
          </p>
        </label>
      </div>
      
      {uploadedFile && !isUploading && !processingFile && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-lg">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm font-medium truncate max-w-[200px]">
              {uploadedFile.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="h-7 w-7 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadUI;

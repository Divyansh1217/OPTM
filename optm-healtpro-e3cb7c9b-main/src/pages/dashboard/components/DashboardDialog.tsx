
import React from 'react';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardDialogProps {
  showUploadDialog: boolean;
  setShowUploadDialog: (show: boolean) => void;
  handleUploadDocument: () => void;
}

const DashboardDialog: React.FC<DashboardDialogProps> = ({
  showUploadDialog,
  setShowUploadDialog,
  handleUploadDocument
}) => {
  return (
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload medical reports, X-rays, or other documents for the patient.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Drag files here or click to upload</p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports PDF, JPEG, PNG files up to 10MB
            </p>
            <Button size="sm">Select Files</Button>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm font-medium">Document Details</div>
            
            <div className="space-y-2">
              <label className="text-sm">Document Name</label>
              <Input placeholder="e.g., X-Ray Report - Left Shoulder" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm">Document Type</label>
              <select className="w-full p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <option>X-Ray</option>
                <option>MRI</option>
                <option>Lab Report</option>
                <option>Treatment Plan</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm">Date</label>
              <Input type="date" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleUploadDocument}>
            Upload Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDialog;

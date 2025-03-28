import React, { useState, useEffect } from 'react';
import { FileText, Upload, AlertTriangle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { v4 as uuidv4 } from 'uuid';
import { 
  storeInLocalStorage, 
  getFromLocalStorage,
  storeFileInLocalStorage,
  getFileFromLocalStorage,
  getAllFilesFromLocalStorage
} from '@/services/storage/localStorageService';

interface Report {
  id: string;
  title: string;
  date: string;
  fileType: string;
  fileSize: string;
  content?: string;
  url?: string;
  fileId?: string;
}

const PatientReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    try {
      const storedReports = getFromLocalStorage('patient_reports');
      console.log('Loading reports from storage:', storedReports.length);
      setReports(storedReports || []);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load your reports');
      setReports([]);
    }
  };

  const handleViewReport = async (report: Report) => {
    try {
      if (report.fileId) {
        const fileData = getFileFromLocalStorage('patient_reports', report.fileId);
        if (fileData && fileData.data) {
          const reportWithUrl = {
            ...report,
            url: fileData.data
          };
          setCurrentReport(reportWithUrl);
        } else {
          setCurrentReport(report);
        }
      } else {
        setCurrentReport(report);
      }
      setViewOpen(true);
    } catch (error) {
      console.error('Error viewing report:', error);
      toast.error('Could not load report data');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setFileError(null);
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only PDF and image files (JPEG, PNG) are allowed');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size must be less than 10MB');
      return;
    }
    
    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      setFileError('Please select a file to upload');
      return;
    }

    try {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const reportId = uuidv4();
      const fileId = uuidv4();

      await storeFileInLocalStorage('patient_reports', fileId, uploadedFile);

      const newReport: Report = {
        id: reportId,
        title: uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.')) || uploadedFile.name,
        date: new Date().toISOString().split('T')[0],
        fileType: uploadedFile.type.includes('pdf') ? 'PDF' : 'Image',
        fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileId: fileId
      };

      storeInLocalStorage('patient_reports', newReport);

      setReports(prev => [...prev, newReport]);
      setUploadedFile(null);
      
      setUploadProgress(100);
      
      setTimeout(() => {
        clearInterval(interval); // Clear the interval
        setUploadOpen(false);
        setUploadProgress(0);
        toast.success('Report uploaded successfully');
        
        loadReports();
      }, 500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      setUploadProgress(0);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.toLowerCase().includes('pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (fileType.toLowerCase().includes('image')) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    }
    return <FileText className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="space-y-4 patient-reports-container visible-content bg-background">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold high-contrast-text">My Medical Reports</h2>
        <Button onClick={() => setUploadOpen(true)} className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload Report
        </Button>
      </div>
      
      {reports.length === 0 ? (
        <Card className="visible-card">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <FileText className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-lg font-medium high-contrast-text">No reports yet</p>
            <p className="text-muted-foreground mb-4">Upload your first medical report</p>
            <Button onClick={() => setUploadOpen(true)}>Upload Report</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow visible-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {getFileIcon(report.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate high-contrast-text">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(report.date)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {report.fileType}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {report.fileSize}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t flex">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => handleViewReport(report)}
                  >
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="high-contrast-text">
              {currentReport?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{currentReport?.date ? formatDate(currentReport.date) : 'Unknown date'}</span>
              <span>•</span>
              <span>{currentReport?.fileType || 'Unknown type'}</span>
              <span>•</span>
              <span>{currentReport?.fileSize || 'Unknown size'}</span>
            </div>
            
            {currentReport?.fileType === 'PDF' ? (
              <div className="bg-muted p-4 rounded-md text-center">
                <FileText className="h-10 w-10 mx-auto mb-2 text-primary" />
                <p className="mb-3 high-contrast-text">PDF document preview</p>
                {currentReport.url ? (
                  <Button asChild size="sm">
                    <a 
                      href={currentReport.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Open PDF
                    </a>
                  </Button>
                ) : (
                  <p className="text-muted-foreground">PDF preview not available</p>
                )}
              </div>
            ) : (
              currentReport?.url ? (
                <div className="rounded-md overflow-hidden bg-muted">
                  <img 
                    src={currentReport.url} 
                    alt={currentReport.title} 
                    className="max-h-[60vh] mx-auto object-contain"
                  />
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Image preview not available</p>
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            {currentReport?.url && (
              <Button asChild>
                <a href={currentReport.url} download={currentReport.title}>
                  Download
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="high-contrast-text">Upload Medical Report</DialogTitle>
          </DialogHeader>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-3">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <div>
                  <p className="font-medium high-contrast-text">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setUploadedFile(null)}
                >
                  <X className="h-4 w-4" /> Remove
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-medium high-contrast-text">Drag & drop your file here</p>
                <p className="text-muted-foreground mb-4">Supports PDF, JPEG, and PNG (Max 10MB)</p>
                <Button asChild variant="outline">
                  <label className="cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Button>
              </>
            )}
          </div>
          
          {fileError && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{fileError}</span>
            </div>
          )}
          
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="high-contrast-text">Uploading...</span>
                <span className="high-contrast-text">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpload} disabled={!uploadedFile || uploadProgress > 0}>
              Upload Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientReports;

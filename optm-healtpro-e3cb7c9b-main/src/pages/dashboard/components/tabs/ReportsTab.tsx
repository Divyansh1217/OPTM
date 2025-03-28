
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  getFromLocalStorage, 
  storeInLocalStorage,
  storeFileInLocalStorage,
  getFileFromLocalStorage,
  getAllFilesFromLocalStorage
} from '@/services/storage/localStorageService';
import { v4 as uuidv4 } from 'uuid';

interface Report {
  id: string;
  title: string;
  date: string;
  fileType: string;
  fileSize: string;
  fileId?: string;
  patientName?: string;
  category?: string;
}

const ReportsTab: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState('');
  const [category, setCategory] = useState('Lab Results');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load reports when component mounts
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    try {
      const storedReports = getFromLocalStorage('clinic_reports');
      console.log('Loaded clinic reports:', storedReports.length);
      setReports(storedReports);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!patientName) {
      toast.error('Please enter a patient name');
      return;
    }

    setIsLoading(true);

    try {
      const reportId = uuidv4();
      const fileId = uuidv4();

      // Store the file
      await storeFileInLocalStorage('clinic_reports', fileId, uploadedFile);

      // Create report metadata
      const newReport: Report = {
        id: reportId,
        title: uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.')) || uploadedFile.name,
        date: new Date().toISOString().split('T')[0],
        fileType: uploadedFile.type.includes('pdf') ? 'PDF' : 'Image',
        fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileId: fileId,
        patientName: patientName,
        category: category
      };

      // Store report metadata
      storeInLocalStorage('clinic_reports', newReport);

      // Update local state
      setReports(prev => [...prev, newReport]);
      
      // Clear form
      setUploadedFile(null);
      setPatientName('');
      setCategory('Lab Results');
      
      toast.success('Report uploaded successfully');
      setUploadOpen(false);
      
      // Reload to ensure we have the latest data
      loadReports();
    } catch (error) {
      console.error('Error uploading report:', error);
      toast.error('Failed to upload report');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReport = (report: Report) => {
    if (report.fileId) {
      const fileData = getFileFromLocalStorage('clinic_reports', report.fileId);
      if (fileData && fileData.data) {
        // Open in new tab
        window.open(fileData.data, '_blank');
      } else {
        toast.error('Could not load file data');
      }
    } else {
      toast.error('No file associated with this report');
    }
  };

  // Filter reports based on search term
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.patientName && report.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (report.category && report.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Reports & Documents</h2>
          <p className="text-muted-foreground">
            View and manage all patient reports and medical documents
          </p>
        </div>
        
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports by title, patient name, or category..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredReports.length === 0 ? (
        <div className="border border-dashed rounded-lg py-12 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm ? 
                `No reports match your search for "${searchTerm}"` : 
                'Upload your first document to get started'}
            </p>
            <Button onClick={() => setUploadOpen(true)}>
              Upload Document
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(report.date)}</p>
                    {report.patientName && (
                      <p className="text-sm">Patient: {report.patientName}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {report.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {report.category}
                        </span>
                      )}
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
                    View Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Medical Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <Input 
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Category</label>
              <select 
                className="w-full px-3 py-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Lab Results">Lab Results</option>
                <option value="Imaging">Imaging</option>
                <option value="Clinical Notes">Clinical Notes</option>
                <option value="Prescriptions">Prescriptions</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">File</label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                {uploadedFile ? (
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div>
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to select a file (PDF, JPEG, PNG)
                    </p>
                    <Button asChild variant="outline">
                      <label className="cursor-pointer">
                        Select File
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!uploadedFile || !patientName || isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsTab;

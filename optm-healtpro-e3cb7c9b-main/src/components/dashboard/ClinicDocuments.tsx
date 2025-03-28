import React, { useEffect, useState } from 'react';
import { FileText, Upload, Search, MoreHorizontal, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, formatDate } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getFromLocalStorage, storeInLocalStorage } from '@/services/storage/localStorageService';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface ClinicDocumentsProps {
  documents?: Document[];
  className?: string;
  onUpload?: () => void;
  onViewAll?: () => void;
  patientId?: string;
}

const ClinicDocuments: React.FC<ClinicDocumentsProps> = ({
  documents: propDocuments,
  className,
  onUpload,
  onViewAll,
  patientId
}) => {
  const [documents, setDocuments] = useState<Document[]>(propDocuments || []);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (propDocuments && propDocuments.length > 0) {
      setDocuments(propDocuments);
    } else {
      loadDocumentsFromStorage();
    }
  }, [propDocuments, patientId]);

  const loadDocumentsFromStorage = () => {
    try {
      const patientReports = getFromLocalStorage('patient_reports');
      const patientRecords = getFromLocalStorage('patient_records').filter((record: any) => 
        record.fileId && (!patientId || record.patientId === patientId)
      );

      const reportDocs = patientReports
        .filter((report: any) => !patientId || report.patientId === patientId)
        .map((report: any) => ({
          id: report.id,
          name: report.title || 'Medical Report',
          type: report.fileType || 'PDF',
          date: report.date || new Date().toISOString().split('T')[0],
          size: report.fileSize || '1.0 MB'
        }));
      
      const recordDocs = patientRecords.map((record: any) => ({
        id: record.id,
        name: record.name || 'Medical Record',
        type: record.recordType === 'xray' ? 'Image' : 'PDF',
        date: record.date || new Date().toISOString().split('T')[0],
        size: '1.0 MB'
      }));

      const allDocuments = [...reportDocs, ...recordDocs].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setDocuments(allDocuments);
    } catch (error) {
      console.error('Error loading documents from storage:', error);
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    try {
      const records = getFromLocalStorage('patient_records');
      const reports = getFromLocalStorage('patient_reports');
      
      const recordIndex = records.findIndex((record: any) => record.id === documentId);
      
      if (recordIndex !== -1) {
        records.splice(recordIndex, 1);
        storeInLocalStorage('patient_records', records);
        toast.success('Document deleted successfully');
      } else {
        const reportIndex = reports.findIndex((report: any) => report.id === documentId);
        
        if (reportIndex !== -1) {
          reports.splice(reportIndex, 1);
          storeInLocalStorage('patient_reports', reports);
          toast.success('Document deleted successfully');
        }
      }
      
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
      
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const handleEditDocument = (documentId: string) => {
    toast.info('Edit functionality will be implemented soon');
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDocument = () => {
    if (onUpload) {
      onUpload();
    } else {
      toast.info('Upload functionality will be implemented soon');
    }
  };

  return <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Medical Documents</CardTitle>
          <CardDescription>Manage patient records and reports</CardDescription>
        </div>
        <Button onClick={handleAddDocument} size="sm" className="text-xs">
          <Plus className="mr-1 h-3 w-3" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredDocuments.length > 0 ? (
            <div className="space-y-2">
              {filteredDocuments.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{doc.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(new Date(doc.date), 'MMM d, yyyy')}
                        </span>
                        <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditDocument(doc.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery 
                  ? `No results matching "${searchQuery}"`
                  : "Upload a document or add a new record"
                }
              </p>
              {!searchQuery && (
                <Button size="sm" onClick={handleAddDocument}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              )}
            </div>
          )}
          
          {filteredDocuments.length > 5 && (
            <div className="text-center pt-2">
              <Button 
                variant="link" 
                className="text-xs" 
                onClick={onViewAll}
              >
                View all {filteredDocuments.length} documents
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>;
};

export default ClinicDocuments;

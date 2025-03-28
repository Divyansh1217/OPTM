
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '@/services/storage/localStorageService';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface MedicalDocumentsProps {
  patientId?: string;
  limit?: number;
}

const MedicalDocuments: React.FC<MedicalDocumentsProps> = ({ 
  patientId,
  limit = 3
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  
  useEffect(() => {
    loadDocuments();
  }, [patientId]);
  
  const loadDocuments = () => {
    try {
      // Get patient records and reports
      const records = getFromLocalStorage('patient_records')
        .filter((record: any) => !patientId || record.patientId === patientId)
        .map((record: any) => ({
          id: record.id,
          name: record.name,
          type: record.recordType || record.type,
          date: record.date
        }));
        
      const reports = getFromLocalStorage('patient_reports')
        .filter((report: any) => !patientId || report.patientId === patientId)
        .map((report: any) => ({
          id: report.id,
          name: report.title,
          type: report.fileType,
          date: report.date
        }));
      
      // Combine, sort by date (newest first) and limit
      const allDocuments = [...records, ...reports]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
        
      setDocuments(allDocuments);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Medical Documents</CardTitle>
          <Link to="/patients/records">
            <Button variant="ghost" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start gap-3 p-2 hover:bg-muted rounded-lg">
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium truncate">{doc.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <span>{formatDate(new Date(doc.date), 'MMM d, yyyy')}</span>
                    <span className="bg-muted px-1.5 py-0.5 rounded-full">
                      {doc.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <Link to="/patients/records">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Documents
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">No documents yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Upload your medical documents
            </p>
            <Link to="/patients/records">
              <Button size="sm" className="text-xs">
                <Upload className="h-3 w-3 mr-1" />
                Add Documents
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalDocuments;

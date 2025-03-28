
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalReport, MedicalAnalysis } from '@/types/medicalData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Calendar, 
  Microscope, 
  Check, 
  AlertTriangle, 
  FileSymlink, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReportsHistoryProps {
  reports: MedicalReport[];
  analyses: MedicalAnalysis[];
}

const ReportsHistory: React.FC<ReportsHistoryProps> = ({ reports, analyses }) => {
  const [activeTab, setActiveTab] = React.useState('reports');
  
  if (reports.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload medical reports to see them listed here.
          </p>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Medical Reports</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="reports" className="text-xs px-3">
              Reports
            </TabsTrigger>
            <TabsTrigger value="analyses" className="text-xs px-3">
              Analyses
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="reports" className="mt-0">
        <div className="space-y-3">
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="analyses" className="mt-0">
        <div className="space-y-3">
          {analyses.map(analysis => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

interface ReportCardProps {
  report: MedicalReport;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            
            <div>
              <h3 className="font-medium">{report.reportType}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center">
                  {report.analyzed ? (
                    <Check className="h-3 w-3 mr-1 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1 text-amber-600" />
                  )}
                  <span>{report.analyzed ? 'Analyzed' : 'Not analyzed'}</span>
                </div>
                
                {report.source === 'upload' && report.fileName && (
                  <span className="ml-1">{report.fileName}</span>
                )}
              </div>
            </div>
          </div>
          
          <Badge variant={
            report.source === 'upload' ? 'outline' : 
            report.source === 'text' ? 'secondary' : 
            'default'
          }>
            {report.source}
          </Badge>
        </div>
        
        {report.source === 'text' && (
          <div className="mt-3 p-2 text-xs bg-muted/20 rounded-md max-h-20 overflow-y-auto">
            {report.content.length > 200 
              ? `${report.content.substring(0, 200)}...` 
              : report.content}
          </div>
        )}
        
        <div className="flex justify-end mt-3">
          <Button variant="outline" size="sm" className="text-xs">
            <FileSymlink className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface AnalysisCardProps {
  analysis: MedicalAnalysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Microscope className="h-6 w-6 text-primary" />
            </div>
            
            <div>
              <h3 className="font-medium">Analysis Results</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{new Date(analysis.timestamp).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  <span>{analysis.extractedBiomarkers.length} biomarkers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="text-xs font-medium mb-1">Summary:</div>
          <p className="text-xs text-muted-foreground">
            {analysis.summary.length > 150 
              ? `${analysis.summary.substring(0, 150)}...` 
              : analysis.summary}
          </p>
        </div>
        
        <div className="mt-3">
          <div className="text-xs font-medium mb-1">Key Findings:</div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            {analysis.keyFindings.slice(0, 2).map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
            {analysis.keyFindings.length > 2 && (
              <li>
                <span className="text-primary cursor-pointer">+{analysis.keyFindings.length - 2} more</span>
              </li>
            )}
          </ul>
        </div>
        
        <div className="flex justify-end mt-3">
          <Button variant="outline" size="sm" className="text-xs">
            <FileSymlink className="h-3 w-3 mr-1" />
            View Full Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsHistory;

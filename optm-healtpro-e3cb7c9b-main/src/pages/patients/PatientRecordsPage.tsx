
import React, { useState } from 'react';
import { PatientsLayout } from './components/PatientsLayout';
import { ChevronLeft, FileText, Upload, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicalRecordsManager } from '@/components/dashboard/patient-records/MedicalRecordsManager';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PatientRecordsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('records');
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleUploadDocument = () => {
    toast.info('Upload functionality will be implemented soon', {
      description: 'This will allow doctors to upload patient documents',
    });
  };
  
  const handleCreateNote = () => {
    toast.info('Create note functionality will be implemented soon', {
      description: 'This will allow doctors to create clinical notes',
    });
  };
  
  return (
    <PatientsLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleGoBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Patient Records Management</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleUploadDocument} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Document</span>
            </Button>
            <Button onClick={handleCreateNote} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Note</span>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="records" className="space-y-6">
            <MedicalRecordsManager patientId={patientId} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Records Analytics</CardTitle>
                <CardDescription>
                  View insights and trends from patient medical records
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  We're building powerful analytics tools to help you gain insights from patient records
                </p>
                <Button variant="outline">Request Early Access</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PatientsLayout>
  );
};

export default PatientRecordsPage;

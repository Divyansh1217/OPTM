
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Activity, Newspaper, PieChart, Map, Pill } from 'lucide-react';
import { useMedicalData } from '@/contexts/MedicalDataContext';
import BiomarkerTrends from './BiomarkerTrends';
import AnatomicalViewer from './AnatomicalViewer';
import ReportsHistory from './ReportsHistory';
import SymptomTracker from './SymptomTracker';
import MedicationTab from '@/components/patient-dashboard/MedicationTab';

const PatientDashboard: React.FC = () => {
  const { patient, isLoading } = useMedicalData();
  const [activeTab, setActiveTab] = React.useState('biomarkers');

  if (isLoading) {
    return (
      <Card className="shadow-sm border">
        <CardContent className="p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{patient.name}'s Dashboard</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              View your health data, trends, and reports in one place
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white dark:bg-gray-800">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <TabsTrigger value="biomarkers" className="flex gap-1 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Biomarkers</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex gap-1 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Symptoms</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex gap-1 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="anatomical" className="flex gap-1 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Anatomical</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex gap-1 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biomarkers" className="space-y-4 mt-4">
            <BiomarkerTrends biomarkers={patient.biomarkers} />
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-4 mt-4">
            <SymptomTracker symptoms={patient.symptoms} biomarkers={patient.biomarkers} />
          </TabsContent>
          
          <TabsContent value="medications" className="space-y-4 mt-4">
            <MedicationTab patientId={patient.id} />
          </TabsContent>

          <TabsContent value="anatomical" className="space-y-4 mt-4">
            <AnatomicalViewer mappings={patient.anatomicalMappings} biomarkers={patient.biomarkers} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 mt-4">
            <ReportsHistory reports={patient.reports} analyses={patient.analyses} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientDashboard;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, PlusCircle, FileImage, Pill, Stethoscope, Activity } from 'lucide-react';

interface MedicalRecordsTabsProps {
  patientId?: number;
  onAddRecord?: (type: string) => void;
}

const MedicalRecordsTabs: React.FC<MedicalRecordsTabsProps> = ({ patientId, onAddRecord }) => {
  const [activeTab, setActiveTab] = useState('xrays');

  const handleAddRecord = (type: string) => {
    if (onAddRecord) {
      onAddRecord(type);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg mt-6">
      <CardContent className="p-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-6 bg-gray-100 dark:bg-gray-700">
            <TabsTrigger value="xrays" className="text-xs md:text-sm">
              <FileImage className="h-4 w-4 mr-2 hidden md:inline" />
              X-Rays & Scans
            </TabsTrigger>
            <TabsTrigger value="bloodwork" className="text-xs md:text-sm">
              <Activity className="h-4 w-4 mr-2 hidden md:inline" />
              Blood Tests
            </TabsTrigger>
            <TabsTrigger value="medications" className="text-xs md:text-sm">
              <Pill className="h-4 w-4 mr-2 hidden md:inline" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs md:text-sm">
              <FileText className="h-4 w-4 mr-2 hidden md:inline" />
              Clinical Notes
            </TabsTrigger>
            <TabsTrigger value="biomarkers" className="text-xs md:text-sm">
              <Activity className="h-4 w-4 mr-2 hidden md:inline" />
              Biomarkers
            </TabsTrigger>
            <TabsTrigger value="physical" className="text-xs md:text-sm">
              <Stethoscope className="h-4 w-4 mr-2 hidden md:inline" />
              Physical Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="xrays" className="space-y-4">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <FileImage className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No X-Ray or Scan Records</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload or add X-ray images and scan reports
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('xray')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bloodwork">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Blood Test Records</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload blood test results and reports
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('bloodTest')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Blood Test
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Medication Records</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add current and past medications
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('medication')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Clinical Notes</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add clinical notes and observations
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('clinicalNote')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="biomarkers">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Biomarker Records</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload biomarker test results
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('biomarker')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Biomarkers
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="physical">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Physical Exam Records</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add physical examination records
              </p>
              <Button className="mt-4" onClick={() => handleAddRecord('physicalExam')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Exam Record
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsTabs;

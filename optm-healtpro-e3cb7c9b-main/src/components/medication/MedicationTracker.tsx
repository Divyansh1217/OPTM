
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pill } from 'lucide-react';
import { useMedicationData } from '@/hooks/useMedicationData';
import LoadingState from './LoadingState';
import TodayTab from './TodayTab';
import UpcomingTab from './UpcomingTab';
import ProgressTab from './ProgressTab';

interface MedicationTrackerProps {
  patientId?: string;
  className?: string;
}

const MedicationTracker: React.FC<MedicationTrackerProps> = ({ patientId, className }) => {
  const { medications, improvementData, isLoading, recordDoseTaken, recordDoseMissed } = useMedicationData(patientId);
  const [activeTab, setActiveTab] = useState('today');
  
  if (isLoading) {
    return <LoadingState className={className} />;
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="h-5 w-5 mr-2" />
          Medication Tracker
        </CardTitle>
        <CardDescription>
          Track your medication consumption and view progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            <TodayTab 
              medications={medications} 
              onTakeDose={recordDoseTaken} 
              onMissDose={recordDoseMissed} 
            />
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-0">
            <UpcomingTab 
              medications={medications} 
              onTakeDose={recordDoseTaken} 
              onMissDose={recordDoseMissed} 
            />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-0">
            <ProgressTab improvementData={improvementData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicationTracker;

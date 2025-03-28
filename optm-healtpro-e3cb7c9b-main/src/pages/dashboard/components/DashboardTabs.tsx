
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, FileText, Bell } from 'lucide-react';
import PatientsTab from './tabs/PatientsTab';
import CalendarTab from './tabs/CalendarTab';
import ReportsTab from './tabs/ReportsTab';
import RemindersTab from './tabs/RemindersTab';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedPatient: any;
  handleClosePatientHistory: () => void;
  handleUpdatePatient: (patient: any) => void;
  handleViewPatient: (patientId: number) => void;
  dashboardData: any;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  currentDate,
  setCurrentDate,
  selectedPatient,
  handleClosePatientHistory,
  handleUpdatePatient,
  handleViewPatient,
  dashboardData
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline-block">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="patients" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline-block">Patients</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline-block">Calendar</span>
        </TabsTrigger>
        <TabsTrigger value="reminders" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline-block">Reminders</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <ReportsTab />
      </TabsContent>

      <TabsContent value="patients" className="mt-0">
        <PatientsTab 
          patients={dashboardData.patients}
          selectedPatient={selectedPatient}
          onViewPatient={handleViewPatient}
          onClosePatientHistory={handleClosePatientHistory}
          onUpdatePatient={handleUpdatePatient}
        />
      </TabsContent>

      <TabsContent value="calendar" className="mt-0">
        <CalendarTab />
      </TabsContent>

      <TabsContent value="reminders" className="mt-0">
        <RemindersTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

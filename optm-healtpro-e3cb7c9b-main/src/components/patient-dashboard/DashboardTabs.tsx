
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentWithProvider } from '@/types/appointments';

interface DashboardTabsProps {
  initialTab: string;
  upcomingAppointments: AppointmentWithProvider[];
  onConfirmAppointment: (appointmentId: string) => void;
  onRescheduleAppointment: (appointmentId: string) => void;
  children: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  initialTab,
  upcomingAppointments,
  onConfirmAppointment,
  onRescheduleAppointment,
  children
}) => {
  return (
    <Tabs defaultValue={initialTab}>
      <TabsList className="flex bg-muted/50 p-1 mb-6 w-full sm:w-auto">
        <TabsTrigger value="dashboard" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="appointments" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
          Appointments
        </TabsTrigger>
        <TabsTrigger value="records" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
          Medical Records
        </TabsTrigger>
        <TabsTrigger value="symptoms" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
          Symptoms
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default DashboardTabs;

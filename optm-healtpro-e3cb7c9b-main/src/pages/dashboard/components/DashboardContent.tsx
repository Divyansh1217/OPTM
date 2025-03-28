
import React from 'react';
import DashboardHeader from './DashboardHeader';
import PeriodFilter from './PeriodFilter';
import KeyMetricsCards from './KeyMetricsCards';
import DashboardTabs from './DashboardTabs';
import { useAuth } from '@/contexts/auth';
import { useReminders } from '@/hooks/useReminders';
import ClinicAnalyticsGraph from '@/components/dashboard/ClinicAnalyticsGraph';
import ClinicReminders from '@/components/dashboard/ClinicReminders';
import LegacyCharts from './LegacyCharts';

interface DashboardContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedPatient: any;
  filterPeriod: string;
  setFilterPeriod: (period: string) => void;
  handleClosePatientHistory: () => void;
  handleUpdatePatient: (patient: any) => void;
  handleViewPatient: (patientId: number) => void;
  handleSaveReport: () => void;
  handleAddReminder: (reminderData: Omit<{ id: string; title: string; dueDate: string; priority: 'low' | 'medium' | 'high'; completed: boolean; }, 'id'>) => void;
  dashboardData: any;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  setActiveTab,
  currentDate,
  setCurrentDate,
  selectedPatient,
  filterPeriod,
  setFilterPeriod,
  handleClosePatientHistory,
  handleUpdatePatient,
  handleViewPatient,
  handleSaveReport,
  handleAddReminder,
  dashboardData
}) => {
  const { user } = useAuth();
  const { getUpcomingReminders, toggleReminder, deleteReminder } = useReminders();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 overflow-container">
      <div className="content-wrapper visible opacity-100">
        {/* Dashboard Header */}
        <DashboardHeader doctorName={user?.name?.split(' ')[0] || "Doctor"} />
        
        {/* Filter Period Selector */}
        <div className="mb-6">
          <PeriodFilter 
            filterPeriod={filterPeriod} 
            setFilterPeriod={setFilterPeriod} 
          />
        </div>
        
        {/* Key Metrics Cards */}
        <div className="mb-8">
          <KeyMetricsCards />
        </div>
        
        {/* Analytics Graph and Reminders Section */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 visible">
            <ClinicAnalyticsGraph />
          </div>
          
          <div className="visible">
            <ClinicReminders 
              reminders={getUpcomingReminders().slice(0, 5)} 
              onAddReminder={handleAddReminder}
              onToggleReminder={toggleReminder}
              onDeleteReminder={deleteReminder}
            />
          </div>
        </div>
        
        {/* Legacy Charts Section */}
        <div className="mb-8 visible">
          <LegacyCharts handleSaveReport={handleSaveReport} />
        </div>
      
        {/* Tabs for detailed content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 mb-8 overflow-hidden visible">
          <DashboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedPatient={selectedPatient}
            handleClosePatientHistory={handleClosePatientHistory}
            handleUpdatePatient={handleUpdatePatient}
            handleViewPatient={handleViewPatient}
            dashboardData={dashboardData}
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;

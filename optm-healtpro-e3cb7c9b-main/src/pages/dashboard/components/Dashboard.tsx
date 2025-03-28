
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardContent from './DashboardContent';
import DashboardDialog from './DashboardDialog';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard: React.FC = () => {
  const {
    isLoading,
    activeTab,
    setActiveTab,
    showUploadDialog,
    setShowUploadDialog,
    currentDate,
    setCurrentDate,
    selectedPatient,
    setSelectedPatient,
    filterPeriod,
    setFilterPeriod,
    handleUploadDocument,
    handleViewPatient,
    handleClosePatientHistory,
    handleUpdatePatient,
    handleSaveReport,
    handleAddReminder,
    dashboardData,
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background z-50 fixed inset-0">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-t-primary border-b-primary rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading dashboard...</h2>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we prepare your content</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background dashboard-container visible opacity-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <DashboardContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedPatient={selectedPatient}
          filterPeriod={filterPeriod}
          setFilterPeriod={setFilterPeriod}
          handleClosePatientHistory={handleClosePatientHistory}
          handleUpdatePatient={handleUpdatePatient}
          handleViewPatient={handleViewPatient}
          handleSaveReport={handleSaveReport}
          handleAddReminder={handleAddReminder}
          dashboardData={dashboardData}
        />
      </div>
      
      <DashboardDialog 
        showUploadDialog={showUploadDialog}
        setShowUploadDialog={setShowUploadDialog}
        handleUploadDocument={handleUploadDocument}
      />
    </div>
  );
};

export default Dashboard;

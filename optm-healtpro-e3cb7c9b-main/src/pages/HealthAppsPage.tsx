
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ComprehensiveHealthDashboard from '@/components/health-dashboard/ComprehensiveHealthDashboard';
import { useHealthData } from '@/hooks/useHealthData';
import { useOAuthUrlParams } from '@/hooks/useOAuthUrlParams';
import { useProviderConnection } from '@/hooks/useProviderConnection';

// Import the new component files
import HealthAppsHeader from '@/components/health-apps/HealthAppsHeader';
import ConnectionAlert from '@/components/health-apps/ConnectionAlert';
import DebugSection from '@/components/health-apps/DebugSection';
import HealthAppsSidebar from '@/components/health-apps/HealthAppsSidebar';
import FitnessIntegrationsSection from '@/components/health-apps/FitnessIntegrationsSection';

const HealthAppsPage: React.FC = () => {
  const { showDebugInfo, setShowDebugInfo } = useOAuthUrlParams();
  
  const {
    providers,
    hasGoogleFitConnected,
    isCheckingConnection,
    handleConnect,
    handleDisconnect,
    handleRefresh,
    handleCheckConnection
  } = useProviderConnection();
  
  const {
    healthData,
    isLoading,
    lastSynced,
    syncHealthData
  } = useHealthData();
  
  // Format lastSynced as string if it's a Date
  const formattedLastSynced = lastSynced ? 
    (typeof lastSynced === 'string' ? lastSynced : lastSynced.toISOString()) : 
    undefined;

  // Create a wrapper function to handle the boolean return from syncHealthData
  const handleSyncHealthData = async (): Promise<void> => {
    await syncHealthData();
    // Return type is void, so we don't return anything
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <HealthAppsHeader />
          
          {/* Debug info component */}
          <DebugSection 
            showDebugInfo={showDebugInfo}
            setShowDebugInfo={setShowDebugInfo}
            isCheckingConnection={isCheckingConnection}
            handleCheckConnection={handleCheckConnection}
          />
          
          {/* Connection instructions alert */}
          <ConnectionAlert 
            showDebugInfo={showDebugInfo}
            setShowDebugInfo={setShowDebugInfo}
          />

          <div className="grid grid-cols-1 gap-6">
            <ComprehensiveHealthDashboard 
              healthData={healthData}
              isLoading={isLoading}
              lastSynced={formattedLastSynced}
              onSyncClick={handleSyncHealthData}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <FitnessIntegrationsSection 
              providers={providers}
              handleConnect={handleConnect}
              handleDisconnect={handleDisconnect}
              handleRefresh={handleRefresh}
            />
            
            <HealthAppsSidebar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthAppsPage;

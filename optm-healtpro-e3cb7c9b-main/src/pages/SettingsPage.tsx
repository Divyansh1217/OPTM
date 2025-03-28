
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsContent from '@/components/settings/SettingsContent';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <SettingsHeader />
          <SettingsContent />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;

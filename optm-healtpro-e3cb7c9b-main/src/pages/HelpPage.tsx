
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import HelpHeader from '@/components/help/HelpHeader';
import HelpSearch from '@/components/help/HelpSearch';
import HelpTabs from '@/components/help/HelpTabs';

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // In a real application, we would implement search functionality here
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <HelpHeader />
          <HelpSearch onSearch={handleSearch} />
          
          <div className="max-w-5xl mx-auto">
            <HelpTabs defaultTab="getStarted" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpPage;

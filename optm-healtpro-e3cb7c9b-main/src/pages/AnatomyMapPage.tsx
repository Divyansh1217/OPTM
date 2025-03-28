
import React, { useEffect } from 'react';
import AnatomyMapContainer from '@/components/anatomy-map/AnatomyMapContainer';
import { Toaster } from 'sonner';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const AnatomyMapPage: React.FC = () => {
  // Add effect to prevent excessive re-renders
  useEffect(() => {
    // Prevent page refresh on form submissions
    const handleSubmit = (e: SubmitEvent) => {
      if (e.target instanceof HTMLFormElement) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('submit', handleSubmit);
    console.log('AnatomyMapPage mounted');
    
    return () => {
      document.removeEventListener('submit', handleSubmit);
      console.log('AnatomyMapPage unmounted');
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Anatomy Map</h1>
                <p className="text-muted-foreground">
                  Use this interactive map to track and update your pain symptoms. Select areas where you experience
                  discomfort and provide details to help your healthcare provider understand your condition better.
                </p>
              </div>
              
              <AnatomyMapContainer />
              <Toaster position="bottom-right" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnatomyMapPage;

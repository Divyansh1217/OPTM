
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Biomarker } from '@/data/mockBiomarkerData';
import { mockBiomarkers } from '@/data/mockBiomarkerData';
import ViewBiomarkersTab from '@/components/biomarkers/tabs/ViewBiomarkersTab';
import UploadResultsTab from '@/components/biomarkers/tabs/UploadResultsTab';
import { Button } from '@/components/ui/button';
import { Download, Upload, RefreshCw } from 'lucide-react';

const BiomarkersPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([...mockBiomarkers]);
  const [activeTab, setActiveTab] = useState<string>("view");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Load biomarkers from localStorage if available
    try {
      const savedBiomarkers = localStorage.getItem('biomarkers');
      if (savedBiomarkers) {
        setBiomarkers(JSON.parse(savedBiomarkers));
      }
    } catch (error) {
      console.error('Error loading biomarkers from localStorage:', error);
    }
  }, []);
  
  useEffect(() => {
    // Save biomarkers to localStorage whenever they change
    try {
      localStorage.setItem('biomarkers', JSON.stringify(biomarkers));
    } catch (error) {
      console.error('Error saving biomarkers to localStorage:', error);
    }
  }, [biomarkers]);
  
  const handleProcessComplete = (newBiomarker: Biomarker) => {
    console.log('New biomarker processed:', newBiomarker);
    setBiomarkers((prevBiomarkers) => {
      const updated = [...prevBiomarkers, newBiomarker];
      return updated;
    });
    
    // Switch to view tab to show the newly added biomarker
    setActiveTab("view");
    
    toast({
      title: "New Biomarker Added",
      description: `${newBiomarker.name} has been added to your profile`,
    });
  };
  
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(biomarkers, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `health-biomarkers-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Data Exported",
        description: "Your biomarker data has been exported successfully"
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data",
        variant: "destructive"
      });
    }
  };
  
  const handleSyncData = async () => {
    setLoading(true);
    try {
      // Simulate data synchronization with a health provider API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Data Synchronized",
        description: "Your biomarker data has been synchronized with your healthcare provider"
      });
    } catch (error) {
      console.error('Error syncing data:', error);
      toast({
        title: "Sync Failed",
        description: "There was an error synchronizing your data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 pl-10 lg:pl-0 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Biomarkers</h1>
              <p className="text-sm text-muted-foreground">
                Track and manage your health metrics
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs gap-1.5"
                onClick={handleExportData}
              >
                <Download className="h-3.5 w-3.5" />
                Export Data
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                className="text-xs gap-1.5"
                onClick={handleSyncData}
                disabled={loading}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                Sync with Provider
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="view">View Biomarkers</TabsTrigger>
              <TabsTrigger value="upload">Upload Test Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view">
              <ViewBiomarkersTab biomarkers={biomarkers} />
            </TabsContent>
            
            <TabsContent value="upload">
              <UploadResultsTab onProcessComplete={handleProcessComplete} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default BiomarkersPage;

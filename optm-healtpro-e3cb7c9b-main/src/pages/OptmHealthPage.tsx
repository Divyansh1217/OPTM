
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import OptmHealthDashboard from '@/components/optm-health/OptmHealthDashboard';
import OptmDataInputForm from '@/components/optm-health/OptmDataInputForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, LineChart, FileText } from 'lucide-react';
import { OptmPatientData, OptmAnalysisResult } from '@/types/optm-health';
import { analyzeOptmPatientData } from '@/utils/optmHealthUtils';

// Mock data for testing
const mockPreviousData: OptmPatientData = {
  patientId: "PT12345",
  name: "John Smith",
  age: 42,
  gender: "male",
  treatmentStage: "intermediate",
  biomarkers: {
    crp: 4.8,
    il6: 6.2,
    tnfAlpha: 18.5,
    mda: 4.2,
    vegf: 180,
    tgfBeta: 2.8,
    comp: 18,
    mmp9: 850,
    mmp13: 58,
    ckMm: 210,
    bdnf: 25000,
    substanceP: 450,
    dDimer: 0.65,
    fourHyp: 22,
    aldolase: 9.5,
    calciumPhosphorusRatio: 3.1
  },
  anatomicalMeasurements: {
    ctm: 3.2,
    ccm: [
      { value: 41.5, unit: "cm", location: "C3-C4" },
      { value: 40.8, unit: "cm", location: "C5-C6" }
    ],
    cap: [
      { value: 32.4, unit: "cm", side: "right", location: "Mid-arm" },
      { value: 31.9, unit: "cm", side: "left", location: "Mid-arm" }
    ],
    cbp: [
      { value: 37.1, unit: "cm", side: "right", location: "Upper brachial" },
      { value: 36.8, unit: "cm", side: "left", location: "Upper brachial" }
    ]
  },
  mobilityMeasurements: {
    kneeFlexion: { value: 110, unit: "degrees", side: "right" },
    kneeExtension: { value: 8, unit: "degrees", side: "right" },
    pelvicTilt: { value: 10.2, unit: "degrees" },
    cervicalRotation: { value: 65, unit: "degrees", direction: "right" },
    shoulderFlexion: { value: 145, unit: "degrees", side: "right" }
  },
  imaging: [
    {
      id: "img-001",
      type: "x-ray",
      bodyPart: "Knee",
      imageUrl: "/sample-images/knee-xray-pre.jpg",
      date: "2023-06-15T00:00:00Z",
      stage: "pre-treatment",
      notes: "Initial X-ray shows moderate joint space narrowing and osteophyte formation"
    },
    {
      id: "img-002",
      type: "mri",
      bodyPart: "Spine",
      imageUrl: "/sample-images/spine-mri-pre.jpg",
      date: "2023-06-20T00:00:00Z",
      stage: "pre-treatment",
      notes: "MRI reveals disc bulging at L4-L5 and mild spinal stenosis"
    }
  ],
  lastUpdated: "2023-06-20T10:30:00Z"
};

// Improved current data showing progress
const mockCurrentData: OptmPatientData = {
  patientId: "PT12345",
  name: "John Smith",
  age: 42,
  gender: "male",
  treatmentStage: "intermediate",
  biomarkers: {
    crp: 3.1,
    il6: 4.5,
    tnfAlpha: 14.8,
    mda: 3.4,
    vegf: 220,
    tgfBeta: 3.5,
    comp: 14,
    mmp9: 720,
    mmp13: 45,
    ckMm: 175,
    bdnf: 32000,
    substanceP: 380,
    dDimer: 0.48,
    fourHyp: 19,
    aldolase: 7.8,
    calciumPhosphorusRatio: 2.8
  },
  anatomicalMeasurements: {
    ctm: 2.7,
    ccm: [
      { value: 40.2, unit: "cm", location: "C3-C4" },
      { value: 39.5, unit: "cm", location: "C5-C6" }
    ],
    cap: [
      { value: 33.5, unit: "cm", side: "right", location: "Mid-arm" },
      { value: 33.1, unit: "cm", side: "left", location: "Mid-arm" }
    ],
    cbp: [
      { value: 36.4, unit: "cm", side: "right", location: "Upper brachial" },
      { value: 36.2, unit: "cm", side: "left", location: "Upper brachial" }
    ]
  },
  mobilityMeasurements: {
    kneeFlexion: { value: 125, unit: "degrees", side: "right" },
    kneeExtension: { value: 4, unit: "degrees", side: "right" },
    pelvicTilt: { value: 8.5, unit: "degrees" },
    cervicalRotation: { value: 72, unit: "degrees", direction: "right" },
    shoulderFlexion: { value: 158, unit: "degrees", side: "right" }
  },
  imaging: [
    {
      id: "img-001",
      type: "x-ray",
      bodyPart: "Knee",
      imageUrl: "/sample-images/knee-xray-pre.jpg",
      date: "2023-06-15T00:00:00Z",
      stage: "pre-treatment",
      notes: "Initial X-ray shows moderate joint space narrowing and osteophyte formation"
    },
    {
      id: "img-003",
      type: "x-ray",
      bodyPart: "Knee",
      imageUrl: "/sample-images/knee-xray-post.jpg",
      date: "2023-09-10T00:00:00Z",
      stage: "post-treatment",
      notes: "Follow-up X-ray shows improved joint alignment and reduced inflammation"
    },
    {
      id: "img-002",
      type: "mri",
      bodyPart: "Spine",
      imageUrl: "/sample-images/spine-mri-pre.jpg",
      date: "2023-06-20T00:00:00Z",
      stage: "pre-treatment",
      notes: "MRI reveals disc bulging at L4-L5 and mild spinal stenosis"
    },
    {
      id: "img-004",
      type: "mri",
      bodyPart: "Spine",
      imageUrl: "/sample-images/spine-mri-post.jpg",
      date: "2023-09-15T00:00:00Z",
      stage: "post-treatment",
      notes: "Follow-up MRI shows reduced disc bulging and improved canal dimensions"
    }
  ],
  lastUpdated: "2023-09-15T14:45:00Z"
};

const OptmHealthPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormMode, setIsFormMode] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<OptmPatientData>(mockCurrentData);
  const [previousData, setPreviousData] = useState<OptmPatientData>(mockPreviousData);
  const [analysisResult, setAnalysisResult] = useState<OptmAnalysisResult | undefined>(
    analyzeOptmPatientData(mockCurrentData, mockPreviousData)
  );
  
  const handleRefreshAnalysis = () => {
    if (currentData && previousData) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const newAnalysis = analyzeOptmPatientData(currentData, previousData);
        setAnalysisResult(newAnalysis);
        setIsLoading(false);
        toast.success('Analysis refreshed successfully');
      }, 1000);
    }
  };
  
  const handleFormSubmit = (data: OptmPatientData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update data
      setPreviousData(currentData);
      setCurrentData(data);
      
      // Generate new analysis
      const newAnalysis = analyzeOptmPatientData(data, currentData);
      setAnalysisResult(newAnalysis);
      
      setIsLoading(false);
      setIsFormMode(false);
      setActiveTab('dashboard');
      
      toast.success('Patient data saved and analysis updated');
    }, 1500);
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 overflow-container bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">OPTM Health Musculoskeletal Dashboard</h1>
              
              <div className="flex gap-2">
                {!isFormMode && (
                  <Button onClick={() => setIsFormMode(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Assessment
                  </Button>
                )}
                
                {isFormMode && (
                  <Button variant="outline" onClick={() => setIsFormMode(false)}>
                    <LineChart className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                )}
              </div>
            </div>
            
            {isFormMode ? (
              <OptmDataInputForm 
                initialData={currentData}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Reports
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard">
                  <OptmHealthDashboard
                    currentData={currentData}
                    previousData={previousData}
                    analysisResult={analysisResult}
                    onRefreshAnalysis={handleRefreshAnalysis}
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="reports">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Reports & Documents</h2>
                    <p className="text-muted-foreground">Historical reports and documents will be displayed here.</p>
                    
                    {/* This section would be expanded with actual reports functionality */}
                    <div className="border rounded-lg p-8 mt-4 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p>No reports are available yet</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Reports will be automatically generated after assessments
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OptmHealthPage;

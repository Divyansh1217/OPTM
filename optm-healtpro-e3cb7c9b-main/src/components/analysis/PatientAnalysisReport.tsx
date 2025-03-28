
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientHeader from './PatientHeader';
import SummaryTabContent from './SummaryTabContent';
import PlaceholderTabContent from './PlaceholderTabContent';
import BiomarkersTabContent from './BiomarkersTabContent';
import AnatomicalTabContent from './AnatomicalTabContent';
import MobilityTabContent from './MobilityTabContent';

const PatientAnalysisReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  
  const patientData = {
    name: 'John Smith',
    age: 42,
    gender: 'male',
    treatmentStage: 'intermediate',
    overallProgress: {
      status: 'minimal-improvement',
      percentChange: 25,
      description: 'John Smith shows minimal improvement (+25%) at most metrics during the intermediate treatment stage. Treatment protocol may need adjustment to improve outcomes.'
    },
    assessments: {
      current: {
        date: '9/15/2023',
      },
      previous: {
        date: '6/20/2023',
      }
    },
    metrics: {
      vcs: { value: 76.8, change: 0, unit: '%', previous: 76.8 },
      jht: { value: 27.4, change: -0.2, unit: 's', previous: 27.6 },
      rom: { value: 82, change: 5, unit: 'deg', previous: 77 },
      force: { value: 19.0, change: 2.1, unit: 'kg', previous: 16.9 },
      anatomical: {
        'Cervical Extension/Flexion (ECF)': { value: 73.5, change: 0.2, unit: '%', previous: 73.3 },
        'Cervical Circumference (CC)': { value: 38.1, change: 1.8, unit: 'cm', previous: 36.3 },
        'Scapulothoracic Angle (STA)': { value: 34.3, change: 1.1, unit: 'deg', previous: 33.2 }
      },
      mobility: {
        'Shoulder Flexion': { value: 165, change: 8, unit: 'deg', previous: 157 },
        'Knee Extension Range': { value: 140, change: 15, unit: 'deg', previous: 125 },
        'Active TFL Angle': { value: 38.2, change: 3.2, unit: 'deg', previous: 35.0 }
      }
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <PatientHeader 
          name={patientData.name}
          age={patientData.age}
          gender={patientData.gender}
          treatmentStage={patientData.treatmentStage}
          assessments={patientData.assessments}
          overallProgress={patientData.overallProgress}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <span>Summary</span>
            </TabsTrigger>
            <TabsTrigger value="biomarkers" className="flex items-center gap-2">
              <span>Biomarkers</span>
            </TabsTrigger>
            <TabsTrigger value="anatomical" className="flex items-center gap-2">
              <span>Anatomical</span>
            </TabsTrigger>
            <TabsTrigger value="mobility" className="flex items-center gap-2">
              <span>Mobility</span>
            </TabsTrigger>
            <TabsTrigger value="imaging" className="flex items-center gap-2">
              <span>Imaging</span>
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <SummaryTabContent metrics={patientData.metrics} />
          </TabsContent>
          
          {/* Biomarkers Tab */}
          <TabsContent value="biomarkers" className="space-y-4">
            <BiomarkersTabContent biomarkers={patientData.metrics} />
          </TabsContent>
          
          {/* Anatomical Tab */}
          <TabsContent value="anatomical" className="space-y-4">
            <AnatomicalTabContent anatomicalMetrics={patientData.metrics.anatomical} />
          </TabsContent>
          
          {/* Mobility Tab */}
          <TabsContent value="mobility" className="space-y-4">
            <MobilityTabContent mobilityMetrics={patientData.metrics.mobility} />
          </TabsContent>
          
          {/* Imaging Tab */}
          <TabsContent value="imaging" className="space-y-4">
            <PlaceholderTabContent 
              title="Imaging Results" 
              description="Imaging results and analysis will be displayed here." 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientAnalysisReport;

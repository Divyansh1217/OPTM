
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Ruler, MoveHorizontal, ImageIcon, User } from 'lucide-react';
import PatientInfoTab from '../patient-info/PatientInfoTab';
import BiomarkersTab from '../biomarkers/BiomarkersTab';
import AnatomicalTab from '../anatomical/AnatomicalTab';
import MobilityTab from '../mobility/MobilityTab';
import ImagingTab from '../imaging/ImagingTab';
import { OptmPatientData, TreatmentStage, MusculoskeletalBiomarkers, AnatomicalMeasurements, MobilityMeasurements, ImagingData } from '@/types/optm-health';

interface TabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  patientData: Partial<OptmPatientData>;
  onPatientInfoChange: (field: string, value: any) => void;
  onBiomarkerChange: (marker: keyof MusculoskeletalBiomarkers, value: string) => void;
  onAnatomicalCtmChange: (value: string) => void;
  onCircumferenceChange: (type: 'ccm' | 'cap' | 'cbp', index: number, field: string, value: any) => void;
  onAddCircumference: (type: 'ccm' | 'cap' | 'cbp') => void;
  onRemoveCircumference: (type: 'ccm' | 'cap' | 'cbp', index: number) => void;
  onMobilityChange: (measurement: keyof MobilityMeasurements, field: string, value: any) => void;
  onAddImage: () => void;
  onRemoveImage: (id: string) => void;
  onUpdateImage: (id: string, field: keyof ImagingData, value: any) => void;
  previousData?: OptmPatientData;
  validationErrors?: Record<string, string[]>;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  setActiveTab,
  patientData,
  onPatientInfoChange,
  onBiomarkerChange,
  onAnatomicalCtmChange,
  onCircumferenceChange,
  onAddCircumference,
  onRemoveCircumference,
  onMobilityChange,
  onAddImage,
  onRemoveImage,
  onUpdateImage,
  previousData,
  validationErrors = {}
}) => {
  // Helper to show error indicators when tabs have validation errors
  const getTabErrorIndicator = (tab: string) => {
    if (validationErrors[tab] && validationErrors[tab].length > 0) {
      return <span className="h-2 w-2 bg-red-500 rounded-full ml-1"></span>;
    }
    return null;
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="patient-info" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Patient Info</span>
          {getTabErrorIndicator('patient-info')}
        </TabsTrigger>
        <TabsTrigger value="biomarkers" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Biomarkers</span>
          {getTabErrorIndicator('biomarkers')}
        </TabsTrigger>
        <TabsTrigger value="anatomical" className="flex items-center gap-2">
          <Ruler className="h-4 w-4" />
          <span className="hidden sm:inline">Anatomical</span>
          {getTabErrorIndicator('anatomical')}
        </TabsTrigger>
        <TabsTrigger value="mobility" className="flex items-center gap-2">
          <MoveHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Mobility</span>
          {getTabErrorIndicator('mobility')}
        </TabsTrigger>
        <TabsTrigger value="imaging" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Imaging</span>
          {getTabErrorIndicator('imaging')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="patient-info">
        <PatientInfoTab
          patientId={patientData.patientId || ''}
          name={patientData.name || ''}
          age={patientData.age}
          gender={patientData.gender}
          treatmentStage={patientData.treatmentStage}
          onPatientInfoChange={onPatientInfoChange}
          errors={validationErrors['patient-info'] || []}
        />
      </TabsContent>
      
      <TabsContent value="biomarkers">
        <BiomarkersTab
          biomarkers={patientData.biomarkers || {}}
          onBiomarkerChange={onBiomarkerChange}
          previousBiomarkers={previousData?.biomarkers}
          errors={validationErrors['biomarkers'] || []}
        />
      </TabsContent>
      
      <TabsContent value="anatomical">
        <AnatomicalTab
          anatomicalMeasurements={patientData.anatomicalMeasurements || {}}
          onAnatomicalCtmChange={onAnatomicalCtmChange}
          onCircumferenceChange={onCircumferenceChange}
          onAddCircumference={onAddCircumference}
          onRemoveCircumference={onRemoveCircumference}
          previousMeasurements={previousData?.anatomicalMeasurements}
          errors={validationErrors['anatomical'] || []}
        />
      </TabsContent>
      
      <TabsContent value="mobility">
        <MobilityTab
          mobilityMeasurements={patientData.mobilityMeasurements || {}}
          onMobilityChange={onMobilityChange}
          previousMobilityMeasurements={previousData?.mobilityMeasurements}
          errors={validationErrors['mobility'] || []}
        />
      </TabsContent>
      
      <TabsContent value="imaging">
        <ImagingTab
          imaging={patientData.imaging || []}
          onAddImage={onAddImage}
          onRemoveImage={onRemoveImage}
          onUpdateImage={onUpdateImage}
          errors={validationErrors['imaging'] || []}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;

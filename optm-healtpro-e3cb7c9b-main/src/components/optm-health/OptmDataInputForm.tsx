
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { 
  Save,
  RefreshCw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import TabContent from './form/TabContent';
import { useOptmFormState } from './hooks/useOptmFormState';
import { OptmPatientData } from '@/types/optm-health';

interface OptmDataInputFormProps {
  initialData?: Partial<OptmPatientData>;
  onSubmit: (data: OptmPatientData) => void;
  isLoading?: boolean;
  previousData?: OptmPatientData;
}

const OptmDataInputForm: React.FC<OptmDataInputFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  previousData
}) => {
  const {
    activeTab,
    setActiveTab,
    patientData,
    handlePatientInfoChange,
    handleBiomarkerChange,
    handleAnatomicalCtmChange,
    handleCircumferenceChange,
    addCircumferenceMeasurement,
    removeCircumferenceMeasurement,
    handleMobilityChange,
    addImage,
    removeImage,
    updateImage,
    prepareDataForSubmission,
    validateTabData
  } = useOptmFormState(initialData);
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  
  const tabs = ['patient-info', 'biomarkers', 'anatomical', 'mobility', 'imaging'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all tabs
    const errors: Record<string, string[]> = {};
    let hasErrors = false;
    
    tabs.forEach(tab => {
      const tabErrors = validateTabData(tab);
      if (tabErrors.length > 0) {
        errors[tab] = tabErrors;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setValidationErrors(errors);
      const firstErrorTab = Object.keys(errors)[0];
      setActiveTab(firstErrorTab);
      
      toast.error("Please fix the validation errors before submitting", {
        description: `There are errors in the ${firstErrorTab.replace('-', ' ')} section.`
      });
      return;
    }
    
    // Clear any existing validation errors
    setValidationErrors({});
    
    const dataToSubmit = prepareDataForSubmission();
    onSubmit(dataToSubmit);
  };
  
  const handleTabNavigation = (direction: 'next' | 'prev') => {
    const currentIndex = tabs.indexOf(activeTab);
    if (direction === 'next' && currentIndex < tabs.length - 1) {
      // Validate current tab before proceeding
      const currentTabErrors = validateTabData(activeTab);
      if (currentTabErrors.length > 0) {
        setValidationErrors({ ...validationErrors, [activeTab]: currentTabErrors });
        toast.error("Please fix the validation errors before proceeding", {
          description: currentTabErrors[0]
        });
        return;
      }
      
      setActiveTab(tabs[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };
  
  // Show error indicators for tabs with validation errors
  const getTabErrorIndicator = (tab: string) => {
    if (validationErrors[tab] && validationErrors[tab].length > 0) {
      return (
        <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
      );
    }
    return null;
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>OPTM Health Patient Data</CardTitle>
          <CardDescription>
            Enter patient data for musculoskeletal assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <TabContent 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            patientData={patientData}
            onPatientInfoChange={handlePatientInfoChange}
            onBiomarkerChange={handleBiomarkerChange}
            onAnatomicalCtmChange={handleAnatomicalCtmChange}
            onCircumferenceChange={handleCircumferenceChange}
            onAddCircumference={addCircumferenceMeasurement}
            onRemoveCircumference={removeCircumferenceMeasurement}
            onMobilityChange={handleMobilityChange}
            onAddImage={addImage}
            onRemoveImage={removeImage}
            onUpdateImage={updateImage}
            previousData={previousData}
            validationErrors={validationErrors}
          />
          
          {/* Tab navigation buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleTabNavigation('prev')}
              disabled={tabs.indexOf(activeTab) === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleTabNavigation('next')}
              disabled={tabs.indexOf(activeTab) === tabs.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Patient Data
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default OptmDataInputForm;

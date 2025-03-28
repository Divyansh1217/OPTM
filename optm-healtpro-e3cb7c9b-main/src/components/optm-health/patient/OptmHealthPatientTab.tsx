
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LineChart, RefreshCw, Activity } from 'lucide-react';
import { OptmPatientData } from '@/types/optm-health';
import OptmHealthDashboard from '@/components/optm-health/OptmHealthDashboard';
import OptmDataInputForm from '@/components/optm-health/OptmDataInputForm';
import { useOptmPatientData } from './useOptmPatientData';

interface OptmHealthPatientTabProps {
  patientId: string;
  patientName: string;
}

const OptmHealthPatientTab: React.FC<OptmHealthPatientTabProps> = ({ patientId, patientName }) => {
  const [isFormMode, setIsFormMode] = useState<boolean>(false);
  const { 
    isLoading, 
    assessments, 
    currentData, 
    previousData, 
    analysisResult,
    submitAssessment,
    refreshAnalysis
  } = useOptmPatientData(patientId, patientName);
  
  const handleFormSubmit = async (data: OptmPatientData) => {
    const success = await submitAssessment(data);
    if (success) {
      setIsFormMode(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">OPTM Health Assessment</h2>
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
          
          {!isFormMode && currentData && previousData && (
            <Button variant="outline" onClick={refreshAnalysis} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
          )}
        </div>
      </div>
      
      {isFormMode ? (
        <OptmDataInputForm 
          initialData={currentData ? { 
            ...currentData,
            patientId: patientId,
            name: patientName
          } : undefined}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      ) : assessments.length > 0 && currentData ? (
        <OptmHealthDashboard
          currentData={currentData}
          previousData={previousData || undefined}
          analysisResult={analysisResult}
          onRefreshAnalysis={refreshAnalysis}
          isLoading={isLoading}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-medium mb-2">No OPTM Health Assessments</h3>
          <p className="text-muted-foreground mb-6">
            This patient doesn't have any OPTM Health assessments yet.
          </p>
          <Button onClick={() => setIsFormMode(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Assessment
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptmHealthPatientTab;

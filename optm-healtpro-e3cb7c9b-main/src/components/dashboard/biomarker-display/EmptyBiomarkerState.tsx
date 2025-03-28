
import React from 'react';
import { AlertCircle } from 'lucide-react';

const EmptyBiomarkerState: React.FC = () => {
  return (
    <div className="text-center py-12 px-4 border border-dashed rounded-lg border-muted-foreground/50">
      <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No biomarker data found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Upload your lab test results or medical reports to see your biomarker data here.
      </p>
    </div>
  );
};

export default EmptyBiomarkerState;

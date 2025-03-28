
import React from 'react';
import { Card } from '@/components/ui/card';
import { Map } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <Card className="p-6 text-center">
      <div className="flex flex-col items-center justify-center py-12">
        <Map className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Anatomical Data</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload medical reports or enter biomarker data to see anatomical mappings here.
        </p>
      </div>
    </Card>
  );
};

export default EmptyState;

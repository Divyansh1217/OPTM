
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center p-8">
      <p className="text-lg font-medium mb-2">No symptom records found</p>
      <p className="text-muted-foreground mb-4">
        Use the Anatomy Map tab to add symptoms to your record.
      </p>
    </div>
  );
};

export default EmptyState;

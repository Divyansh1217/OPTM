
import React from 'react';
import { HelpCircle } from 'lucide-react';

const HelpHeader: React.FC = () => {
  return (
    <div className="mb-6 pl-10 lg:pl-0">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-primary" />
        Help Center
      </h1>
      <p className="text-sm text-muted-foreground">
        Find support, documentation, and answers to your questions
      </p>
    </div>
  );
};

export default HelpHeader;

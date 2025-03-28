
import React from 'react';
import { HelpCircle } from 'lucide-react';

const ExpertAssistance: React.FC = () => {
  return (
    <div className="flex items-start gap-2 p-2 bg-muted/10 rounded-md">
      <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium mb-1">Need Expert Assistance?</p>
        <p className="text-xs text-muted-foreground">
          For immediate medical questions or concerns, please call our healthcare team at +91-9555-9555.
        </p>
      </div>
    </div>
  );
};

export default ExpertAssistance;

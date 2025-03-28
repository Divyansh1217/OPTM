
import React from 'react';
import { AreaChart } from 'lucide-react';

interface PlaceholderTabContentProps {
  title: string;
  description: string;
}

const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ title, description }) => {
  return (
    <div className="p-12 text-center text-muted-foreground">
      <AreaChart className="h-12 w-12 mx-auto mb-4 opacity-30" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="max-w-md mx-auto mt-2">
        {description}
      </p>
    </div>
  );
};

export default PlaceholderTabContent;

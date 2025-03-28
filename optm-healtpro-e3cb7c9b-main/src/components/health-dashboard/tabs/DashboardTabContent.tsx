
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardTabContentProps {
  icon: React.ReactNode;
  title: string;
}

const DashboardTabContent: React.FC<DashboardTabContentProps> = ({ icon, title }) => {
  return (
    <div className="text-center py-12 border rounded-lg">
      <div className="h-10 w-10 mx-auto text-muted-foreground mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mt-2">
        Detailed {title.toLowerCase()} information will be displayed here.
      </p>
    </div>
  );
};

export default DashboardTabContent;

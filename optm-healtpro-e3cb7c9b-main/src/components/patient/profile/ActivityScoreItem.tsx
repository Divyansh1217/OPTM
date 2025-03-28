
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActivityScoreItemProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const ActivityScoreItem: React.FC<ActivityScoreItemProps> = ({ label, value, unit, icon }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="mt-1">
        <span className="font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default ActivityScoreItem;

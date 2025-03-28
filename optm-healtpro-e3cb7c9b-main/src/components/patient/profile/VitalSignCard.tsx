
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VitalSignProps {
  label: string;
  value: string;
  unit: string;
  status: 'warning' | 'normal' | 'critical';
  icon: React.ReactNode;
}

const VitalSignCard: React.FC<VitalSignProps> = ({ label, value, unit, status, icon }) => {
  // Determine background and border colors based on status
  const getStatusClasses = () => {
    switch (status) {
      case 'warning':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800';
      case 'critical':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'normal':
      default:
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
    }
  };

  return (
    <Card className={`overflow-hidden border ${getStatusClasses()}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">{label}</span>
          {icon}
        </div>
        <div className="flex items-baseline mt-1">
          <span className="text-2xl font-bold">{value}</span>
          <span className="ml-1 text-xs text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalSignCard;

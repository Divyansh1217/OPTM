
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@/types/appointment';

interface AppointmentStatusIndicatorProps {
  status: AppointmentStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AppointmentStatusIndicator: React.FC<AppointmentStatusIndicatorProps> = ({
  status,
  size = 'sm',
  className
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle className="h-3.5 w-3.5" />,
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Confirmed'
        };
      case 'scheduled':
        return {
          icon: <Clock className="h-3.5 w-3.5" />,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Scheduled'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Cancelled'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-3.5 w-3.5" />,
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Completed'
        };
      default:
        return {
          icon: <AlertCircle className="h-3.5 w-3.5" />,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Unknown'
        };
    }
  };

  const { icon, color, label } = getStatusConfig();
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3'
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5 font-normal capitalize", 
        color, 
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default AppointmentStatusIndicator;

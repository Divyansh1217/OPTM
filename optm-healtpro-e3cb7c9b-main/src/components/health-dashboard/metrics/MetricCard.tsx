
import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  target?: number;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  status?: 'normal' | 'warning' | 'critical' | 'elevated' | 'low';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  target,
  trend,
  change,
  status
}) => {
  const percentage = target ? Math.min(Math.round((value / target) * 100), 100) : null;
  
  const getStatusColor = () => {
    if (status) {
      if (status === 'normal') return 'text-green-500';
      if (status === 'warning') return 'text-amber-500';
      if (status === 'critical') return 'text-red-500';
      if (status === 'elevated') return 'text-amber-500';
      if (status === 'low') return 'text-blue-500';
    }
    return '';
  };
  
  const getTrendIcon = () => {
    if (trend === 'up') return <span className="text-green-500">↑</span>;
    if (trend === 'down') return <span className="text-red-500">↓</span>;
    if (trend === 'stable') return <span className="text-gray-500">→</span>;
    return null;
  };
  
  return (
    <div className="bg-card border rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">{title}</span>
        <div className="bg-primary/10 p-1.5 rounded-full">{icon}</div>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline">
          <span className={`text-2xl font-bold ${getStatusColor()}`}>{value}</span>
          <span className="text-xs ml-1 text-muted-foreground">{unit}</span>
        </div>
        
        {(target || trend) && (
          <div className="text-xs text-muted-foreground flex items-center mt-1">
            {target && (
              <div className="flex-1">
                <div className="h-1.5 bg-muted rounded-full w-full mt-1 mb-1">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span>{percentage}% of target</span>
              </div>
            )}
            
            {trend && (
              <div className="flex items-center ml-auto">
                {getTrendIcon()}
                {change && <span className="ml-1">{Math.abs(change)}%</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;

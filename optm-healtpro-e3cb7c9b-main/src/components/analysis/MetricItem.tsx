
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricValue {
  value: number;
  change: number;
  unit: string;
  previous: number;
}

interface MetricItemProps {
  name: string;
  metric: MetricValue;
  useProgressBar?: boolean;
  maxValue?: number;
}

const MetricItem: React.FC<MetricItemProps> = ({ 
  name, 
  metric, 
  useProgressBar = true,
  maxValue = 100
}) => {
  return (
    <li className="bg-background rounded-md p-3 border">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 text-sm">{metric.previous} {metric.unit}</span>
          <ArrowRight className="h-3 w-3 text-gray-400" />
          <span className="font-semibold">{metric.value} {metric.unit}</span>
          {metric.change !== 0 && (
            <Badge variant={metric.change > 0 ? "default" : "destructive"} className={`ml-2 text-xs ${metric.change > 0 ? "bg-green-500 hover:bg-green-600" : ""}`}>
              {metric.change > 0 ? '+' : ''}{metric.change} {metric.unit}
            </Badge>
          )}
        </div>
      </div>
      {useProgressBar ? (
        <Progress 
          value={(metric.value / maxValue) * 100} 
          className="h-2"
          indicatorClassName={metric.change > 0 ? "bg-green-500" : 
                             metric.change < 0 ? "bg-red-500" : "bg-amber-500"}
        />
      ) : (
        <div className="flex items-center space-x-2">
          <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${metric.change > 0 ? "bg-green-500" : metric.change < 0 ? "bg-red-500" : "bg-amber-500"}`}
              style={{ width: `${Math.min(100, Math.max(0, (metric.value / maxValue) * 100))}%` }}
            ></div>
          </div>
          {metric.change > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : metric.change < 0 ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : null}
        </div>
      )}
    </li>
  );
};

export default MetricItem;

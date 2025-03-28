
import React from 'react';
import MetricItem from './MetricItem';

interface MetricValue {
  value: number;
  change: number;
  unit: string;
  previous: number;
}

interface MetricsSectionProps {
  title: string;
  metrics: Record<string, MetricValue>;
  useProgressBar?: boolean;
  maxValue?: number;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ 
  title, 
  metrics, 
  useProgressBar = true,
  maxValue = 100 
}) => {
  return (
    <div>
      <h4 className="font-medium mb-2">{title}</h4>
      <ul className="space-y-3">
        {Object.entries(metrics).map(([key, metric]) => (
          <MetricItem 
            key={key} 
            name={key} 
            metric={metric} 
            useProgressBar={useProgressBar}
            maxValue={maxValue}
          />
        ))}
      </ul>
    </div>
  );
};

export default MetricsSection;

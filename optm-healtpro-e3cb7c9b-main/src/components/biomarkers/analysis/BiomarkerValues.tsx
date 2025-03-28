
import React from 'react';
import { Activity, Info } from 'lucide-react';
import { getStatusColor } from '../utils/reportProcessing';

interface BiomarkerValue {
  value: string;
  status: 'normal' | 'abnormal' | 'critical';
}

interface BiomarkerValuesProps {
  values: Record<string, BiomarkerValue>;
}

const BiomarkerValues: React.FC<BiomarkerValuesProps> = ({ values }) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <Activity className="w-5 h-5 mr-2" />
        Your Values
      </h3>
      <div className="space-y-2">
        {Object.entries(values).map(([key, data]) => (
          <div key={key} className="flex justify-between items-center p-2 border-b">
            <span className="font-medium">{key}</span>
            <span className={getStatusColor(data.status)}>
              {data.value}
              {data.status !== 'normal' && (
                <Info className="inline ml-1 h-4 w-4" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiomarkerValues;


import React from 'react';
import { format } from 'date-fns';
import { Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PainTrendProps } from './types';

const PainTrend: React.FC<PainTrendProps> = ({ symptoms, getPainLevelColor }) => {
  return (
    <div className="bg-secondary/50 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Thermometer className="w-4 h-4 text-medical-yellow" />
        <h4 className="font-medium">Pain Trend</h4>
      </div>
      <div className="h-16 flex items-end gap-1">
        {symptoms.slice().reverse().map((symptom, index) => (
          <div 
            key={symptom.id} 
            className="relative flex-1 flex flex-col items-center"
            title={`${symptom.symptomName}: ${symptom.painLevel}/10`}
          >
            <div 
              className={cn(
                "w-full rounded-t",
                getPainLevelColor(symptom.painLevel)
              )}
              style={{ height: `${symptom.painLevel * 10}%` }}
            ></div>
            <span className="text-xs mt-1 text-muted-foreground">
              {format(symptom.date, 'dd')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PainTrend;


import React from 'react';
import { SymptomCardProps } from './types';
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom, index }) => {
  const firstValue = symptom.data[0].value;
  const lastValue = symptom.data[symptom.data.length - 1].value;
  const reduction = (firstValue - lastValue) / firstValue * 100;
  
  // Calculate recent trend (last 3 entries)
  const getRecentTrend = () => {
    if (symptom.data.length < 3) return 0;
    
    const recentEntries = symptom.data.slice(-3);
    const firstRecentValue = recentEntries[0].value;
    const lastRecentValue = recentEntries[recentEntries.length - 1].value;
    
    return lastRecentValue - firstRecentValue;
  };
  
  const recentTrend = getRecentTrend();
  
  // Get the date of the most recent entry
  const lastDate = symptom.data[symptom.data.length - 1].date;
  const formattedDate = format(new Date(lastDate), 'MMM d');
  
  return (
    <div 
      key={index} 
      className="flex-1 min-w-[150px] bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-border hover:shadow-md transition-shadow"
    >
      <div className="text-sm font-medium mb-1">{symptom.symptomName}</div>
      <div className="flex items-baseline gap-1">
        <span 
          className="text-xl font-bold" 
          style={{
            color: symptom.color
          }}
        >
          {lastValue}
        </span>
        <span className="text-xs text-muted-foreground">/10</span>
      </div>
      
      <div className="flex items-center justify-between mt-1">
        <div className={`text-xs ${reduction > 0 ? 'bg-medical-green/20 text-medical-green' : 'bg-medical-red/20 text-medical-red'} px-1.5 py-0.5 rounded-full flex items-center`}>
          {reduction > 0 ? (
            <>
              <TrendingDown className="w-3 h-3 mr-1" />
              {Math.abs(Math.round(reduction))}%
            </>
          ) : (
            <>
              <TrendingUp className="w-3 h-3 mr-1" />
              {Math.abs(Math.round(reduction))}%
            </>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {formattedDate}
        </div>
      </div>
      
      {recentTrend !== 0 && (
        <div className="mt-1 text-xs">
          <span className={recentTrend < 0 ? 'text-medical-green' : 'text-medical-red'}>
            {recentTrend < 0 ? 'Improving' : 'Worsening'}
          </span>
          <span className="text-muted-foreground"> recently</span>
        </div>
      )}
    </div>
  );
};

export default SymptomCard;

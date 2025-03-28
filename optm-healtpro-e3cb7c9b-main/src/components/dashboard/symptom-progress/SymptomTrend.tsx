
import React from 'react';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { SymptomTrendProps } from './types';
import { calculateTrend } from './utils';

const SymptomTrend: React.FC<SymptomTrendProps> = ({ symptom, trend }) => {
  // Use the trend data or calculate it if not provided
  const { weeklyChange, monthlyChange } = trend || calculateTrend(symptom);
  
  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Trend Analysis</h4>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-secondary/30 rounded-md p-2">
          <div className="text-xs text-muted-foreground mb-1 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Weekly
          </div>
          <div className="flex items-center">
            {weeklyChange === 0 ? (
              <span className="text-xs">No change</span>
            ) : weeklyChange < 0 ? (
              <>
                <TrendingDown className="w-3 h-3 mr-1 text-medical-green" />
                <span className="text-xs text-medical-green">{Math.abs(weeklyChange)}% better</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3 mr-1 text-medical-red" />
                <span className="text-xs text-medical-red">{weeklyChange}% worse</span>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-secondary/30 rounded-md p-2">
          <div className="text-xs text-muted-foreground mb-1 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Monthly
          </div>
          <div className="flex items-center">
            {monthlyChange === 0 ? (
              <span className="text-xs">No change</span>
            ) : monthlyChange < 0 ? (
              <>
                <TrendingDown className="w-3 h-3 mr-1 text-medical-green" />
                <span className="text-xs text-medical-green">{Math.abs(monthlyChange)}% better</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3 mr-1 text-medical-red" />
                <span className="text-xs text-medical-red">{monthlyChange}% worse</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTrend;

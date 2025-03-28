
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ActivityTrackerProps {
  title: string;
  data: { day: string; value: number }[];
  unit: string;
  currentValue: number;
  source?: string;
  lastSync?: string;
  className?: string;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  title,
  data,
  unit,
  currentValue,
  source,
  lastSync,
  className,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-medical-green">{`${payload[0].value} ${unit}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className={cn("glass-morphism rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold">{currentValue.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{unit.split('/')[0]}</span>
        </div>
      </div>
      
      <div className="h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="var(--medical-green)" 
              radius={[4, 4, 0, 0]} 
              barSize={24}
              className="fill-medical-green" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <div className="mt-4 pt-2 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
            <span className="text-xs text-muted-foreground">
              {source}
            </span>
          </div>
          {lastSync && (
            <span className="text-xs text-muted-foreground">
              Updated {lastSync}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ActivityTracker;

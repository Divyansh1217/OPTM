
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DailySleep } from './sleepUtils';

interface SleepDurationChartProps {
  dailySleep: DailySleep[];
}

const SleepDurationChart: React.FC<SleepDurationChartProps> = ({ dailySleep }) => {
  // Prepare chart data to use the 'value' field as 'sleepMinutes'
  const chartData = dailySleep.map(sleep => ({
    date: sleep.date,
    sleepMinutes: sleep.value
  }));

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Sleep Duration</h4>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString([], { weekday: 'short' });
              }}
            />
            <YAxis 
              fontSize={12}
              tickFormatter={(value) => `${Math.floor(value / 60)}h`}
            />
            <Tooltip 
              formatter={(value: any) => {
                const hours = Math.floor(value / 60);
                const minutes = value % 60;
                return [`${hours}h ${minutes}m`, 'Sleep Duration'];
              }}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Bar 
              dataKey="sleepMinutes" 
              fill="#3b82f6" 
              name="Sleep Duration"
            />
            <ReferenceLine 
              y={480} // 8 hours
              stroke="#22c55e" 
              strokeDasharray="3 3" 
              label={{ 
                value: 'Recommended (8h)', 
                position: 'insideBottomRight', 
                fontSize: 10 
              }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepDurationChart;

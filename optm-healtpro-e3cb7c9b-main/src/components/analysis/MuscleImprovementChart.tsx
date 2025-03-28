
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface MuscleImprovementChartProps {
  metrics: any;
}

const MuscleImprovementChart: React.FC<MuscleImprovementChartProps> = ({ metrics }) => {
  // Prepare data for the chart
  const prepareData = () => {
    const data = [];
    
    // Add biomarkers
    Object.entries({
      'VCS': metrics.vcs,
      'JHT': metrics.jht,
      'ROM': metrics.rom,
      'Force': metrics.force
    }).forEach(([name, metric]: [string, any]) => {
      data.push({
        name,
        previous: metric.previous,
        current: metric.value,
        unit: metric.unit,
        change: metric.change,
        isPositive: name === 'JHT' ? metric.change < 0 : metric.change > 0 // JHT is better when lower
      });
    });
    
    return data;
  };
  
  const data = prepareData();
  
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 border shadow-sm rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-gray-500">Previous:</span> {item.previous} {item.unit}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Current:</span> {item.current} {item.unit}
          </p>
          <p className={`text-sm font-medium ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            Change: {item.change > 0 ? '+' : ''}{item.change} {item.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={renderCustomTooltip} />
          <Legend />
          <Bar dataKey="previous" name="Previous Assessment" fill="#94a3b8" />
          <Bar dataKey="current" name="Current Assessment" fill="#6366f1">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isPositive ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MuscleImprovementChart;

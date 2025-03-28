
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { MedicationImprovementData } from '@/types/medicationData';

interface MedicationImprovementChartProps {
  improvementData: MedicationImprovementData[];
}

const MedicationImprovementChart: React.FC<MedicationImprovementChartProps> = ({ 
  improvementData 
}) => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };
  
  // Process data for chart - format dates and ensure correct structure
  const chartData = improvementData.map(item => {
    // Get symptom values
    const symptoms = { ...item.symptoms };
    
    return {
      date: formatDate(item.date),
      adherenceRate: item.adherenceRate,
      healthScore: item.healthScore,
      ...symptoms
    };
  });
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border shadow-lg rounded-lg">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <div 
                key={`tooltip-${index}`} 
                className="flex items-center"
                style={{ color: entry.color }}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs">
                  {entry.name}: {entry.value.toFixed(1)}
                  {entry.name === 'adherenceRate' ? '%' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Handle mouse enter on legend
  const handleMouseEnter = (metric: string) => {
    setActiveMetric(metric);
  };
  
  // Handle mouse leave on legend
  const handleMouseLeave = () => {
    setActiveMetric(null);
  };
  
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            domain={[0, 'dataMax']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            onMouseEnter={(item) => handleMouseEnter(item.dataKey as string)}
            onMouseLeave={handleMouseLeave}
            wrapperStyle={{ fontSize: '10px' }}
          />
          <Line
            type="monotone"
            dataKey="adherenceRate"
            name="Adherence"
            stroke="#4f46e5"
            strokeWidth={activeMetric === null || activeMetric === 'adherenceRate' ? 2 : 1}
            opacity={activeMetric === null || activeMetric === 'adherenceRate' ? 1 : 0.3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="healthScore"
            name="Health Score"
            stroke="#10b981"
            strokeWidth={activeMetric === null || activeMetric === 'healthScore' ? 2 : 1}
            opacity={activeMetric === null || activeMetric === 'healthScore' ? 1 : 0.3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="pain"
            name="Pain"
            stroke="#ef4444"
            strokeWidth={activeMetric === null || activeMetric === 'pain' ? 2 : 1}
            opacity={activeMetric === null || activeMetric === 'pain' ? 1 : 0.3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="inflammation"
            name="Inflammation"
            stroke="#f59e0b"
            strokeWidth={activeMetric === null || activeMetric === 'inflammation' ? 2 : 1}
            opacity={activeMetric === null || activeMetric === 'inflammation' ? 1 : 0.3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="stiffness"
            name="Stiffness"
            stroke="#8b5cf6"
            strokeWidth={activeMetric === null || activeMetric === 'stiffness' ? 2 : 1}
            opacity={activeMetric === null || activeMetric === 'stiffness' ? 1 : 0.3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicationImprovementChart;

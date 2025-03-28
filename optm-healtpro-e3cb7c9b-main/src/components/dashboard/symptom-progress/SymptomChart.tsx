
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea } from 'recharts';
import { ChartContainerProps } from './types';

const SymptomChart: React.FC<ChartContainerProps> = ({ symptoms, chartData }) => {
  const [focusedSymptom, setFocusedSymptom] = useState<string | null>(null);
  
  const handleMouseEnter = (symptomName: string) => {
    setFocusedSymptom(symptomName);
  };
  
  const handleMouseLeave = () => {
    setFocusedSymptom(null);
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-2 rounded-md shadow-md">
          <p className="text-xs font-medium">{label}</p>
          <div className="mt-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs">{entry.name}: </span>
                <span className="text-xs font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Determine the range of the y-axis
  const getYAxisDomain = () => {
    let maxValue = 10; // Default for pain scale
    
    symptoms.forEach(symptom => {
      symptom.data.forEach(point => {
        if (point.value > maxValue) {
          maxValue = Math.ceil(point.value);
        }
      });
    });
    
    return [0, Math.max(10, maxValue)];
  };
  
  return (
    <div className="h-60 md:h-80 mb-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{
              fontSize: 12
            }}
          />
          <YAxis 
            domain={getYAxisDomain()} 
            tickCount={6} 
            tick={{
              fontSize: 12
            }}
            label={{ 
              value: 'Pain Level', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: 12, textAnchor: 'middle' },
              offset: 10
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
            onMouseEnter={({ dataKey }: any) => handleMouseEnter(dataKey)}
            onMouseLeave={handleMouseLeave}
          />
          
          {/* Reference areas to highlight pain level ranges */}
          <ReferenceArea y1={0} y2={3} fill="#10b981" fillOpacity={0.1} />
          <ReferenceArea y1={3} y2={7} fill="#eab308" fillOpacity={0.1} />
          <ReferenceArea y1={7} y2={10} fill="#ef4444" fillOpacity={0.1} />
          
          {symptoms.map(symptom => (
            <Line 
              key={symptom.symptomName} 
              type="monotone" 
              dataKey={symptom.symptomName} 
              stroke={symptom.color} 
              strokeWidth={focusedSymptom === symptom.symptomName ? 3 : 2} 
              dot={{
                r: 3,
                strokeWidth: focusedSymptom === symptom.symptomName ? 2 : 0
              }}
              activeDot={{
                r: 5,
                strokeWidth: 0
              }}
              opacity={focusedSymptom === null || focusedSymptom === symptom.symptomName ? 1 : 0.3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="text-xs text-center text-muted-foreground mt-1">
        <span className="inline-block px-2 mr-2 bg-medical-green/10 text-medical-green rounded">0-3 Mild</span>
        <span className="inline-block px-2 mr-2 bg-medical-yellow/10 text-medical-yellow rounded">4-6 Moderate</span>
        <span className="inline-block px-2 bg-medical-red/10 text-medical-red rounded">7-10 Severe</span>
      </div>
    </div>
  );
};

export default SymptomChart;

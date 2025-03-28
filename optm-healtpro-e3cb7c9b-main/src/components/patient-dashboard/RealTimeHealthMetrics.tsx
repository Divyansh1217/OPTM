
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ActivitySquare, Thermometer, Wind } from 'lucide-react';
import { HealthMetric } from '@/types/health';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface RealTimeHealthMetricsProps {
  metrics: HealthMetric[];
}

const RealTimeHealthMetrics: React.FC<RealTimeHealthMetricsProps> = ({ metrics }) => {
  // Mock real-time data for visualization
  const heartRateData = Array(20).fill(0).map((_, i) => ({
    value: 72 + Math.random() * 10 - 5
  }));
  
  const bloodPressureData = Array(20).fill(0).map((_, i) => ({
    systolic: 120 + Math.random() * 8 - 4,
    diastolic: 80 + Math.random() * 6 - 3
  }));
  
  const temperatureData = Array(20).fill(0).map((_, i) => ({
    value: 98.6 + Math.random() * 0.4 - 0.2
  }));
  
  const respiratoryRateData = Array(20).fill(0).map((_, i) => ({
    value: 16 + Math.random() * 2 - 1
  }));
  
  const vitalData = [
    {
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-100",
      data: heartRateData,
      chartColor: "#f43f5e"
    },
    {
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      icon: ActivitySquare,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
      data: bloodPressureData,
      chartColor: "#6366f1"
    },
    {
      name: "Body Temperature",
      value: "98.6",
      unit: "°F",
      icon: Thermometer,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
      data: temperatureData,
      chartColor: "#f59e0b"
    },
    {
      name: "Respiratory Rate",
      value: "16",
      unit: "bpm",
      icon: Wind,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
      data: respiratoryRateData,
      chartColor: "#10b981"
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Vital Signs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalData.map((vital, index) => {
            const IconComponent = vital.icon;
            return (
              <div key={index} className="flex flex-col p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-2 rounded-full", vital.bgColor)}>
                      <IconComponent className={cn("h-4 w-4", vital.color)} />
                    </div>
                    <span className="text-sm font-medium">{vital.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Real-time</span>
                </div>
                
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold">{vital.value}</span>
                  <span className="ml-1 text-sm text-muted-foreground">{vital.unit}</span>
                </div>
                
                <div className="h-16 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vital.data}>
                      <YAxis 
                        hide 
                        domain={vital.name === "Blood Pressure" 
                          ? ['dataMin - 10', 'dataMax + 10'] 
                          : ['dataMin - 5', 'dataMax + 5']} 
                      />
                      
                      {vital.name === "Blood Pressure" ? (
                        <>
                          <Line 
                            type="monotone" 
                            dataKey="systolic" 
                            stroke={vital.chartColor} 
                            strokeWidth={2} 
                            dot={false}
                            isAnimationActive={true}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="diastolic" 
                            stroke="#94a3b8" 
                            strokeWidth={2} 
                            dot={false}
                            isAnimationActive={true}
                          />
                        </>
                      ) : (
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={vital.chartColor} 
                          strokeWidth={2} 
                          dot={false}
                          isAnimationActive={true}
                        />
                      )}
                      
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            if (vital.name === "Blood Pressure") {
                              return (
                                <div className="bg-background p-2 rounded shadow-lg text-xs border">
                                  <p>{`${Math.round(Number(payload[0].value))}/${Math.round(Number(payload[1].value))} ${vital.unit}`}</p>
                                </div>
                              );
                            }
                            return (
                              <div className="bg-background p-2 rounded shadow-lg text-xs border">
                                <p>{`${Number(payload[0].value).toFixed(1)} ${vital.unit}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeHealthMetrics;

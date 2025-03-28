
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const ProgressRadarChart: React.FC = () => {
  // Enhanced mock data for the radar chart with both current and previous values
  const data = [
    { metric: 'VCS', current: 76, previous: 76, fullMark: 100 },
    { metric: 'Knee Extension', current: 88, previous: 73, fullMark: 100 },
    { metric: 'ROM', current: 82, previous: 77, fullMark: 100 },
    { metric: 'Force', current: 70, previous: 60, fullMark: 100 },
    { metric: 'Scapular', current: 65, previous: 60, fullMark: 100 },
    { metric: 'ECF', current: 73, previous: 72, fullMark: 100 },
    { metric: 'Cervical', current: 88, previous: 80, fullMark: 100 },
    { metric: 'Mobility', current: 60, previous: 45, fullMark: 100 },
    { metric: 'Control', current: 75, previous: 60, fullMark: 100 },
    { metric: 'Flexibility', current: 45, previous: 30, fullMark: 100 },
  ];

  const chartConfig = {
    current: {
      label: 'Current',
      theme: {
        light: '#6366f1', // primary indigo color
        dark: '#818cf8',
      },
    },
    previous: {
      label: 'Previous',
      theme: {
        light: '#94a3b8', // slate color
        dark: '#64748b',
      },
    },
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid strokeDasharray="3 3" stroke="var(--border)" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fontSize: 12, fill: 'var(--foreground)' }}
          />
          <PolarRadiusAxis 
            domain={[0, 100]} 
            axisLine={false} 
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          />
          
          <Radar 
            name="previous" 
            dataKey="previous" 
            stroke="var(--color-previous)" 
            fill="var(--color-previous)" 
            fillOpacity={0.2} 
            dot={{ fill: 'var(--color-previous)', r: 3 }}
          />
          
          <Radar 
            name="current" 
            dataKey="current" 
            stroke="var(--color-current)" 
            fill="var(--color-current)" 
            fillOpacity={0.5} 
            dot={{ fill: 'var(--color-current)', r: 4 }}
          />
          
          <ChartTooltip content={<ChartTooltipContent nameKey="name" labelKey="metric" />} />
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ProgressRadarChart;

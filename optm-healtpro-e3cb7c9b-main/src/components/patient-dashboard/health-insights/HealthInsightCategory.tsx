
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar, ReferenceLine } from 'recharts';
import HealthScore from './HealthScore';
import RecommendationCard from './RecommendationCard';

interface TrendDataPoint {
  day?: string;
  time?: string;
  value: number;
}

interface HealthInsightCategoryProps {
  title: string;
  icon: React.ReactNode;
  insight: string;
  recommendation: string;
  trendData: TrendDataPoint[];
  trendLabel: string;
  trendUnit: string;
  trendColor: string;
  score: number;
  invertTrend?: boolean;
}

const HealthInsightCategory: React.FC<HealthInsightCategoryProps> = ({
  title,
  icon,
  insight,
  recommendation,
  trendData,
  trendLabel,
  trendUnit,
  trendColor,
  score,
  invertTrend = false
}) => {
  // Get the xAxis key (day or time)
  const xAxisKey = trendData[0]?.day ? 'day' : 'time';
  
  // Calculate average value for reference line
  const avgValue = trendData.reduce((sum, item) => sum + item.value, 0) / trendData.length;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column: AI Insight */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1.5">{title} Insight</h3>
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Health Score */}
        <div className="md:col-span-1">
          <HealthScore score={score} category={title} />
        </div>
      </div>
      
      {/* Chart and recommendation row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column: Chart */}
        <div>
          <Card className="h-full">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">{trendLabel} Trend</h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  {xAxisKey === 'day' ? (
                    <BarChart data={trendData}>
                      <XAxis dataKey={xAxisKey} />
                      <Tooltip 
                        formatter={(value) => [`${value}${trendUnit}`, trendLabel]}
                        labelFormatter={(label) => `Day: ${label}`}
                      />
                      <ReferenceLine y={avgValue} stroke="#94a3b8" strokeDasharray="3 3" />
                      <Bar 
                        dataKey="value" 
                        fill={trendColor} 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  ) : (
                    <LineChart data={trendData}>
                      <XAxis dataKey={xAxisKey} />
                      <Tooltip 
                        formatter={(value) => [`${value}${trendUnit}`, trendLabel]}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <ReferenceLine y={avgValue} stroke="#94a3b8" strokeDasharray="3 3" />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={trendColor} 
                        strokeWidth={2} 
                        dot={true}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {invertTrend ? 
                  "Lower values indicate improvement" : 
                  "Higher values indicate improvement"
                }
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Recommendation */}
        <div>
          <RecommendationCard recommendation={recommendation} />
        </div>
      </div>
    </div>
  );
};

export default HealthInsightCategory;

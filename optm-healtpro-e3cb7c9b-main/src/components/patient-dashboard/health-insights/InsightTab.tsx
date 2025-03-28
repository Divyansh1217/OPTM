
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import HealthInsightCategory from './HealthInsightCategory';

interface InsightTabProps {
  value: string;
  title: string;
  icon: React.ReactNode;
  insight: string;
  recommendation: string;
  trendData: Array<{ day?: string; time?: string; value: number }>;
  trendLabel: string;
  trendUnit: string;
  trendColor: string;
  score: number;
  invertTrend?: boolean;
}

const InsightTab: React.FC<InsightTabProps> = ({
  value,
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
  return (
    <TabsContent value={value}>
      <HealthInsightCategory 
        title={title} 
        icon={icon}
        insight={insight}
        recommendation={recommendation}
        trendData={trendData}
        trendLabel={trendLabel}
        trendUnit={trendUnit}
        trendColor={trendColor}
        score={score}
        invertTrend={invertTrend}
      />
    </TabsContent>
  );
};

export default InsightTab;

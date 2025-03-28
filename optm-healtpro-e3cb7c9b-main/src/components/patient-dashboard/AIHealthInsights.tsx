
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Zap, Activity, Bed, Dumbbell, Brain } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import useHealthInsights from '@/hooks/dashboard/useHealthInsights';
import { FitnessData } from '@/hooks/useFitnessIntegration';
import InsightHeader from './health-insights/InsightHeader';
import InsightTabsList from './health-insights/InsightTabsList';
import InsightTab from './health-insights/InsightTab';
import {
  getHeartRateTrendData,
  getMobilityTrendData,
  getMuscularTrendData,
  getNervousTrendData,
  getSleepTrendData,
  getOverallTrendData
} from './health-insights/trendDataUtils';

interface AIHealthInsightsProps {
  fitnessData: FitnessData;
}

const AIHealthInsights: React.FC<AIHealthInsightsProps> = ({ fitnessData }) => {
  const { 
    insights, 
    generateInsights, 
    isGenerating,
    lastGenerated 
  } = useHealthInsights(fitnessData);

  return (
    <Card className="h-full">
      <InsightHeader 
        lastGenerated={lastGenerated}
        isGenerating={isGenerating}
        onGenerateInsights={generateInsights}
      />
      <CardContent>
        <Tabs defaultValue="cardiovascular">
          <InsightTabsList />
          
          <InsightTab
            value="cardiovascular"
            title="Cardiovascular Health"
            icon={<Heart className="h-5 w-5 text-rose-500" />}
            insight={insights.cardiovascular.insight}
            recommendation={insights.cardiovascular.recommendation}
            trendData={getHeartRateTrendData(fitnessData)}
            trendLabel="Heart Rate"
            trendUnit="bpm"
            trendColor="#ef4444"
            score={insights.cardiovascular.score}
          />
          
          <InsightTab
            value="muscular"
            title="Muscle & Tissue Recovery"
            icon={<Dumbbell className="h-5 w-5 text-emerald-500" />}
            insight={insights.muscular.insight}
            recommendation={insights.muscular.recommendation}
            trendData={getMuscularTrendData()}
            trendLabel="Recovery Rate"
            trendUnit="%"
            trendColor="#10b981"
            score={insights.muscular.score}
          />
          
          <InsightTab
            value="nervous"
            title="Nerve Health & Pain Sensitivity"
            icon={<Zap className="h-5 w-5 text-amber-500" />}
            insight={insights.nervous.insight}
            recommendation={insights.nervous.recommendation}
            trendData={getNervousTrendData()}
            trendLabel="Pain Level"
            trendUnit="/10"
            trendColor="#f59e0b"
            invertTrend={true}
            score={insights.nervous.score}
          />
          
          <InsightTab
            value="mobility"
            title="Joint & Mobility Improvement"
            icon={<Activity className="h-5 w-5 text-blue-500" />}
            insight={insights.mobility.insight}
            recommendation={insights.mobility.recommendation}
            trendData={getMobilityTrendData(fitnessData)}
            trendLabel="Mobility Score"
            trendUnit="/100"
            trendColor="#3b82f6"
            score={insights.mobility.score}
          />
          
          <InsightTab
            value="sleep"
            title="Sleep & Recovery Insights"
            icon={<Bed className="h-5 w-5 text-indigo-500" />}
            insight={insights.sleep.insight}
            recommendation={insights.sleep.recommendation}
            trendData={getSleepTrendData()}
            trendLabel="Sleep Hours"
            trendUnit="hrs"
            trendColor="#6366f1"
            score={insights.sleep.score}
          />
          
          <InsightTab
            value="overall"
            title="Overall Health Analysis"
            icon={<Brain className="h-5 w-5 text-purple-500" />}
            insight={insights.overall.insight}
            recommendation={insights.overall.recommendation}
            trendData={getOverallTrendData()}
            trendLabel="Health Score"
            trendUnit="/100"
            trendColor="#8b5cf6"
            score={insights.overall.score}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIHealthInsights;

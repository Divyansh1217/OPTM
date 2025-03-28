import { useState, useEffect } from 'react';
import { FitnessData } from '@/hooks/useFitnessIntegration';
import { analyzeHealthData } from '@/services/ai/healthInsightsService';

export interface HealthInsight {
  insight: string;
  recommendation: string;
  score: number;
}

export interface HealthInsightsData {
  cardiovascular: HealthInsight;
  muscular: HealthInsight;
  nervous: HealthInsight;
  mobility: HealthInsight;
  sleep: HealthInsight;
  overall: HealthInsight;
}

const defaultInsights: HealthInsightsData = {
  cardiovascular: {
    insight: "Your resting heart rate has been stable at around 72 bpm, which is within the normal range. Your heart rate variability shows healthy patterns, indicating good autonomic nervous system function.",
    recommendation: "To further improve your cardiovascular health, consider adding 2-3 short (5-minute) brisk walks throughout your day to prevent long periods of inactivity.",
    score: 82
  },
  muscular: {
    insight: "Your muscle recovery patterns indicate good adaptation to your recent activities. The decreased inflammation markers suggest your tissues are healing properly between workout sessions.",
    recommendation: "Your protein intake appears sufficient, but consider adding foods rich in omega-3 fatty acids like salmon or walnuts to further reduce inflammation and aid recovery.",
    score: 78
  },
  nervous: {
    insight: "Your pain sensitivity has decreased by 15% in the last month, suggesting reduced inflammation and improved pain management. Your nerve conduction indicators show positive trends.",
    recommendation: "Continue your current pain management routine. Adding 5 minutes of deep breathing exercises before sleep could help further reduce nervous system sensitivity.",
    score: 75
  },
  mobility: {
    insight: "Your knee mobility has improved by 12% this month. Your gait analysis shows more balanced weight distribution and improved coordination during movement.",
    recommendation: "To further enhance joint mobility, add gentle hip mobility exercises to your routine, as your data suggests limited range of motion in the hip flexors.",
    score: 80
  },
  sleep: {
    insight: "Your deep sleep duration has increased by 8% this week, contributing to better muscle recovery. Your sleep onset time has become more consistent, supporting your circadian rhythm.",
    recommendation: "Your evening screen time is affecting your sleep quality. Try reducing screen exposure 30 minutes before bed to improve your deep sleep phases further.",
    score: 85
  },
  overall: {
    insight: "Your overall health score has improved by 10% in the past month. The most significant improvements are in your cardiovascular health and sleep quality, which are positively affecting other health metrics.",
    recommendation: "Given your progress, consider gradually increasing your daily step goal by 500 steps each week to continue building on your cardiovascular improvements.",
    score: 81
  }
};

const useHealthInsights = (fitnessData: FitnessData) => {
  const [insights, setInsights] = useState<HealthInsightsData>(defaultInsights);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  
  // Generate insights on mount and when fitness data changes significantly
  useEffect(() => {
    // In a real app, we might want to check if the data has changed enough to warrant regenerating insights
    // For demo purposes, we'll use the default insights initially
  }, [fitnessData]);
  
  const generateInsights = async () => {
    setIsGenerating(true);
    try {
      // Call the AI service to analyze health data
      const newInsights = await analyzeHealthData(fitnessData);
      setInsights(newInsights);
      setLastGenerated(new Date().toISOString());
    } catch (error) {
      console.error("Failed to generate health insights:", error);
      // Keep using the existing insights if generation fails
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    insights,
    generateInsights,
    isGenerating,
    lastGenerated
  };
};

export default useHealthInsights;

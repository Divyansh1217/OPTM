
import { ReactNode } from 'react';

export interface TrendDataPoint {
  day?: string;
  time?: string;
  value: number;
}

export interface HealthInsightCategoryData {
  insight: string;
  recommendation: string;
  score: number;
}

export type IconType = ReactNode;

export interface HealthInsightProps {
  cardiovascular: HealthInsightCategoryData;
  muscular: HealthInsightCategoryData;
  nervous: HealthInsightCategoryData;
  mobility: HealthInsightCategoryData;
  sleep: HealthInsightCategoryData;
  overall: HealthInsightCategoryData;
}

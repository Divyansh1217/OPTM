
export interface SymptomData {
  name: string;
  date: string;
  value: number;
}

export interface ChartData {
  symptomName: string;
  color: string;
  data: SymptomData[];
}

export interface SymptomProgressChartProps {
  className?: string;
}

export interface SymptomCardProps {
  symptom: ChartData;
  index: number;
}

export interface ChartContainerProps {
  symptoms: ChartData[];
  chartData: any[];
}

export interface PainReductionProps {
  painReduction: number;
}

export interface TrendData {
  weeklyChange: number;
  monthlyChange: number;
}

export interface SymptomTrendProps {
  symptom: ChartData;
  trend: TrendData;
}


export interface FitnessProvider {
  id: string;
  name: string;
  logo?: string;
  isConnected: boolean;
  lastSynced?: string;
  metrics?: {
    steps: number;
    calories: number;
    heartRate: number;
    distance: number;
  };
}

export interface FitnessData {
  steps: {
    data: Array<{ timestamp: string; value: number }>;
    summary: { total: number; average: number };
  };
  heartRate: {
    data: Array<{ timestamp: string; value: number }>;
    summary: { average: number; min: number; max: number };
  };
  calories: {
    data: Array<{ timestamp: string; value: number }>;
    summary: { total: number; average: number };
  };
}


export interface PostureArea {
  name: string;
  score: number;
  status: 'good' | 'moderate' | 'poor';
  recommendation: string;
}

export interface ProgressSnapshot {
  id: number;
  date: string;
  posture: string;
  improvement: string;
}

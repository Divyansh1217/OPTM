
export interface HealthIssue {
  id: string;
  name: string;
  location: { x: number; y: number };
  severity: 'low' | 'medium' | 'high';
  description: string;
  muscleGroup?: string;
  symptoms?: string[];
  recommendedActions?: string[];
}

export interface MuscleFlexion {
  muscle: string;
  flexionPercentage: number;
  status: 'healthy' | 'weak' | 'overworked';
  lastReading: string;
  relatedIssues?: string[]; // IDs of related health issues
}

export interface AnatomicalMapPosition {
  x: number;
  y: number;
}

export interface HotspotInteractionState {
  isHovered: boolean;
  isSelected: boolean;
}

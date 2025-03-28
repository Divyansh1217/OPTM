
export interface BodyRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  svgPathId?: string;
  description?: string;
}

export interface PainSymptom {
  id: string;
  bodyRegionId: string;
  severity: 'mild' | 'moderate' | 'severe';
  painType: string;
  description: string;
  triggers?: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export const painSeverityOptions = [
  { value: 'mild', label: 'Mild', color: 'bg-yellow-500' },
  { value: 'moderate', label: 'Moderate', color: 'bg-orange-500' },
  { value: 'severe', label: 'Severe', color: 'bg-red-500' }
];

export const painTypeOptions = [
  { value: 'aching', label: 'Aching' },
  { value: 'burning', label: 'Burning' },
  { value: 'cramping', label: 'Cramping' },
  { value: 'dull', label: 'Dull' },
  { value: 'numbing', label: 'Numbing' },
  { value: 'sharp', label: 'Sharp' },
  { value: 'shooting', label: 'Shooting' },
  { value: 'stabbing', label: 'Stabbing' },
  { value: 'throbbing', label: 'Throbbing' },
  { value: 'tingling', label: 'Tingling' }
];

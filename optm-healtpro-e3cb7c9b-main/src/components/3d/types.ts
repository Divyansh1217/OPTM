
import { ReactNode } from 'react';

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  label: string;
  description: string;
  status: 'normal' | 'warning' | 'critical';
  icon?: ReactNode;
}

export interface AnatomyModelProps {
  className?: string;
  image?: string;
  modelUrl?: string;
  hotspots: Hotspot[];
  onAddHotspot?: (hotspot: Hotspot) => void;
  onDeleteHotspot?: (id: string) => void;
  readOnly?: boolean;
}

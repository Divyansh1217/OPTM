
import { ReactNode } from 'react';

export interface Hotspot {
  id: string;
  position: [number, number, number];
  label: string;
  description: string;
  severity: string;
  color: string;
  size: number;
  region?: string;
}

export interface HotspotProps {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  description?: string;
  severity?: string;
  onClick: () => void;
  isEditMode?: boolean;
}

export interface BodySystem {
  id: string;
  label: string;
}

export interface HumanModelProps {
  activeSystem: string;
  hotspots: Hotspot[];
  onHotspotClick: (id: string) => void;
  isEditMode?: boolean;
}

export interface DetailsPanelProps {
  activeHotspotDetails: Hotspot | null;
  isEditMode?: boolean;
}

export interface HeaderProps {
  systems: BodySystem[];
  activeSystem: string;
  onSystemChange: (value: string) => void;
  isEditMode?: boolean;
}

export interface AnatomicalViewProps {
  selectedRegion?: string;
  onSelectRegion?: (region: string) => void;
  patientId?: number;
  isEditMode?: boolean;
}

export interface ModelImageProps {
  activeSystem: string;
}

export interface HotspotsGroupProps {
  hotspots: Hotspot[];
  onHotspotClick: (id: string) => void;
}

export interface AutoRotateProps {
  isRotating: boolean;
}

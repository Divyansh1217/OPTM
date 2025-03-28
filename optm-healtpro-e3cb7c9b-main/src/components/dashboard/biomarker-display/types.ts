
export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  timestamp: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  possibleCauses?: string[];
  recommendations?: string[];
}

export interface BiomarkerCardProps {
  biomarker: Biomarker;
  onSelectBiomarker: (biomarker: Biomarker) => void;
}

export interface BiomarkerDetailDialogProps {
  biomarker: Biomarker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

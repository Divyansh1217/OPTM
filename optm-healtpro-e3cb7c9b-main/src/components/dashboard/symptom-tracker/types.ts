
import { SymptomEntry } from '@/contexts/SymptomContext';

export interface SymptomTrackerProps {
  className?: string;
}

export interface PainLevelSelectorProps {
  painLevel: number;
  onChange: (level: number) => void;
}

export interface BodyRegionSelectProps {
  location: string | undefined;
  onChange: (value: string) => void;
}

export interface SymptomFormProps {
  newSymptom: Partial<SymptomEntry>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string) => void;
  handlePainLevelChange: (level: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setOpen: (open: boolean) => void;
}

export interface SymptomListProps {
  symptoms: SymptomEntry[];
  getLocationLabel: (locationValue: string) => string;
  getPainLevelColor: (level: number) => string;
}

export interface PainTrendProps {
  symptoms: SymptomEntry[];
  getPainLevelColor: (level: number) => string;
}

export const bodyRegions = [
  { value: 'head', label: 'Head' },
  { value: 'neck', label: 'Neck' },
  { value: 'rightShoulder', label: 'Right Shoulder' },
  { value: 'leftShoulder', label: 'Left Shoulder' },
  { value: 'chest', label: 'Chest' },
  { value: 'upperBack', label: 'Upper Back' },
  { value: 'rightElbow', label: 'Right Elbow' },
  { value: 'leftElbow', label: 'Left Elbow' },
  { value: 'abdomen', label: 'Abdomen' },
  { value: 'lowerBack', label: 'Lower Back' },
  { value: 'rightWrist', label: 'Right Wrist' },
  { value: 'leftWrist', label: 'Left Wrist' },
  { value: 'rightHip', label: 'Right Hip' },
  { value: 'leftHip', label: 'Left Hip' },
  { value: 'rightKnee', label: 'Right Knee' },
  { value: 'leftKnee', label: 'Left Knee' },
  { value: 'rightAnkle', label: 'Right Ankle' },
  { value: 'leftAnkle', label: 'Left Ankle' },
  { value: 'rightFoot', label: 'Right Foot' },
  { value: 'leftFoot', label: 'Left Foot' },
  { value: 'rightHand', label: 'Right Hand' },
  { value: 'leftHand', label: 'Left Hand' },
  { value: 'rightFinger', label: 'Right Finger' },
  { value: 'leftFinger', label: 'Left Finger' },
];


import { HotSpot } from './types';
import { SymptomEntry } from '@/contexts/SymptomContext';
import { anatomicalRegions } from './regions';

// Convert symptoms from context to hotspots for visualization
export const symptomsToHotspots = (symptoms: SymptomEntry[]): HotSpot[] => {
  return symptoms
    .filter(symptom => symptom.painLevel > 0) // Only convert active symptoms
    .map(symptom => {
      // Find the region for this symptom
      const region = anatomicalRegions.find(r => r.id === symptom.location) || anatomicalRegions[0];
      
      return {
        id: symptom.id,
        region: symptom.location || 'head',
        x: region.x,
        y: region.y,
        size: getSizeFromPainLevel(symptom.painLevel || 0),
        color: getColorFromPainLevel(symptom.painLevel || 0),
        label: symptom.symptomName || 'Unknown symptom',
        description: symptom.notes || 'No description provided',
        severity: symptom.painLevel || 0
      };
    });
};

// Helper functions for styling hotspots
const getSizeFromPainLevel = (painLevel: number): number => {
  if (painLevel >= 7) return 14;
  if (painLevel >= 4) return 12;
  return 10;
};

const getColorFromPainLevel = (painLevel: number): string => {
  if (painLevel >= 7) return '#ef4444'; // Red
  if (painLevel >= 4) return '#f97316'; // Orange
  return '#eab308'; // Yellow
};

// Function to get appropriate image for anatomical system
export const getSystemImage = (system: string): string => {
  switch (system.toLowerCase()) {
    case 'skeletal':
      return '/lovable-uploads/skeletal-system.png';
    case 'nervous':
      return '/lovable-uploads/nervous-system.png';
    case 'cardiovascular':
      return '/lovable-uploads/cardiovascular-system.png';
    case 'respiratory':
      return '/lovable-uploads/respiratory-system.png';
    case 'digestive':
      return '/lovable-uploads/digestive-system.png';
    case 'muscular':
    default:
      return '/lovable-uploads/cc5c1cf4-bddf-4fc8-bc1a-6a1387ebbdf8.png'; // Default to muscular
  }
};

// System options for the tabs
export const systemOptions = [
  { value: 'muscular', label: 'Muscular' },
  { value: 'skeletal', label: 'Skeletal' },
  { value: 'nervous', label: 'Nervous' },
  { value: 'cardiovascular', label: 'Cardiovascular' },
  { value: 'respiratory', label: 'Respiratory' },
  { value: 'digestive', label: 'Digestive' }
];

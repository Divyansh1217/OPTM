
import { AnatomicalMapping } from '@/types/medicalData';

/**
 * Returns default coordinates for anatomical mapping
 */
export const getDefaultCoordinates = (bodyPart: string): { x: number; y: number } => {
  const lowerPart = bodyPart.toLowerCase();
  
  // These coordinates are simplified for demo purposes
  // In a real implementation, these would be more precise mappings
  switch (lowerPart) {
    case 'heart':
      return { x: 50, y: 30 };
    case 'liver':
      return { x: 45, y: 40 };
    case 'kidneys':
      return { x: 50, y: 45 };
    case 'pancreas':
      return { x: 52, y: 42 };
    case 'thyroid':
      return { x: 50, y: 20 };
    case 'brain':
      return { x: 50, y: 10 };
    case 'bones':
      return { x: 50, y: 60 };
    case 'muscles':
      return { x: 70, y: 40 };
    case 'blood vessels':
      return { x: 60, y: 35 };
    case 'blood':
      return { x: 55, y: 50 };
    case 'bone marrow':
      return { x: 40, y: 65 };
    default:
      return { x: 50, y: 50 }; // Default center position
  }
};

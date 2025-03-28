
// Helper function to get position for hotspots based on body location
export const getHotspotPosition = (location: string): [number, number, number] => {
  // Map body locations to 3D positions - more precise coordinates for better alignment
  const positionMap: Record<string, [number, number, number]> = {
    // Head region
    'head': [0, 1.1, 0.1],
    'forehead': [0, 1.15, 0.15],
    'temple-left': [0.12, 1.08, 0.1],
    'temple-right': [-0.12, 1.08, 0.1],
    'eye-left': [0.1, 1.05, 0.2],
    'eye-right': [-0.1, 1.05, 0.2],
    'ear-left': [0.18, 1.0, 0.05],
    'ear-right': [-0.18, 1.0, 0.05],
    'nose': [0, 1.0, 0.25],
    'jaw': [0, 0.9, 0.15],
    
    // Neck region
    'neck': [0, 0.8, 0.1],
    'throat': [0, 0.8, 0.15],
    'neck-back': [0, 0.8, -0.05],
    
    // Shoulder region
    'shoulder': [0.35, 0.6, 0.1],
    'shoulder-left': [0.35, 0.6, 0.1],
    'shoulder-right': [-0.35, 0.6, 0.1],
    'collarbone-left': [0.2, 0.7, 0.15],
    'collarbone-right': [-0.2, 0.7, 0.15],
    
    // Arm region
    'arm': [0.5, 0.3, 0.1],
    'arm-left': [0.5, 0.3, 0.1],
    'arm-right': [-0.5, 0.3, 0.1],
    'upper-arm-left': [0.45, 0.4, 0.1],
    'upper-arm-right': [-0.45, 0.4, 0.1],
    'bicep-left': [0.45, 0.45, 0.15],
    'bicep-right': [-0.45, 0.45, 0.15],
    'tricep-left': [0.45, 0.4, 0.05],
    'tricep-right': [-0.45, 0.4, 0.05],
    
    // Elbow region
    'elbow': [0.55, 0.1, 0.1],
    'elbow-left': [0.55, 0.1, 0.1],
    'elbow-right': [-0.55, 0.1, 0.1],
    
    // Forearm region
    'forearm-left': [0.58, 0, 0.1],
    'forearm-right': [-0.58, 0, 0.1],
    
    // Wrist region
    'wrist': [0.6, -0.1, 0.1],
    'wrist-left': [0.6, -0.1, 0.1],
    'wrist-right': [-0.6, -0.1, 0.1],
    
    // Hand region
    'hand': [0.65, -0.3, 0.1],
    'hand-left': [0.65, -0.3, 0.1],
    'hand-right': [-0.65, -0.3, 0.1],
    'palm-left': [0.65, -0.25, 0.15],
    'palm-right': [-0.65, -0.25, 0.15],
    'thumb-left': [0.7, -0.2, 0.15],
    'thumb-right': [-0.7, -0.2, 0.15],
    'fingers-left': [0.67, -0.35, 0.15],
    'fingers-right': [-0.67, -0.35, 0.15],
    
    // Torso region
    'chest': [0, 0.4, 0.1],
    'upper-chest': [0, 0.5, 0.15],
    'sternum': [0, 0.45, 0.2],
    'pectoral-left': [0.15, 0.45, 0.15],
    'pectoral-right': [-0.15, 0.45, 0.15],
    'ribs-left': [0.2, 0.3, 0.15],
    'ribs-right': [-0.2, 0.3, 0.15],
    
    // Back region
    'back': [0, 0.4, -0.2],
    'upper-back': [0, 0.5, -0.15],
    'mid-back': [0, 0.3, -0.15],
    'lower-back': [0, 0.1, -0.15],
    'shoulder-blade-left': [0.2, 0.5, -0.15],
    'shoulder-blade-right': [-0.2, 0.5, -0.15],
    
    // Abdomen region
    'abdomen': [0, 0.1, 0.1],
    'upper-abdomen': [0, 0.2, 0.15],
    'navel': [0, 0, 0.15],
    'lower-abdomen': [0, -0.1, 0.15],
    
    // Hip region
    'hip': [0.2, -0.2, 0.1],
    'hip-left': [0.2, -0.2, 0.1],
    'hip-right': [-0.2, -0.2, 0.1],
    'pelvis': [0, -0.25, 0.1],
    'groin': [0, -0.3, 0.15],
    'buttock-left': [0.2, -0.2, -0.15],
    'buttock-right': [-0.2, -0.2, -0.15],
    
    // Thigh region
    'thigh-left': [0.2, -0.4, 0.1],
    'thigh-right': [-0.2, -0.4, 0.1],
    'quad-left': [0.2, -0.45, 0.15],
    'quad-right': [-0.2, -0.45, 0.15],
    'hamstring-left': [0.2, -0.45, -0.1],
    'hamstring-right': [-0.2, -0.45, -0.1],
    
    // Leg region
    'leg': [0.2, -0.6, 0.1],
    'leg-left': [0.2, -0.6, 0.1],
    'leg-right': [-0.2, -0.6, 0.1],
    
    // Knee region
    'knee': [0.2, -0.8, 0.1],
    'knee-left': [0.2, -0.8, 0.1],
    'knee-right': [-0.2, -0.8, 0.1],
    'kneecap-left': [0.2, -0.8, 0.15],
    'kneecap-right': [-0.2, -0.8, 0.15],
    
    // Calf region
    'calf-left': [0.2, -0.95, 0.05],
    'calf-right': [-0.2, -0.95, 0.05],
    'shin-left': [0.2, -0.95, 0.15],
    'shin-right': [-0.2, -0.95, 0.15],
    
    // Ankle region
    'ankle': [0.2, -1.1, 0.1],
    'ankle-left': [0.2, -1.1, 0.1],
    'ankle-right': [-0.2, -1.1, 0.1],
    'inner-ankle-left': [0.15, -1.1, 0.1],
    'inner-ankle-right': [-0.15, -1.1, 0.1],
    'outer-ankle-left': [0.25, -1.1, 0.05],
    'outer-ankle-right': [-0.25, -1.1, 0.05],
    
    // Foot region
    'foot': [0.2, -1.2, 0.2],
    'foot-left': [0.2, -1.2, 0.2],
    'foot-right': [-0.2, -1.2, 0.2],
    'heel-left': [0.2, -1.15, 0.05],
    'heel-right': [-0.2, -1.15, 0.05],
    'arch-left': [0.2, -1.25, 0.15],
    'arch-right': [-0.2, -1.25, 0.15],
    'toes-left': [0.2, -1.3, 0.25],
    'toes-right': [-0.2, -1.3, 0.25],
    
    // Internal organs (approximate positions)
    'heart': [0, 0.4, 0.1],
    'lung-left': [0.15, 0.4, 0.05],
    'lung-right': [-0.15, 0.4, 0.05],
    'liver': [-0.1, 0.2, 0.05],
    'stomach': [0.1, 0.2, 0.05],
    'kidney-left': [0.15, 0.1, -0.05],
    'kidney-right': [-0.15, 0.1, -0.05],
    'intestine': [0, 0, 0.05],
    
    // Default position if no match
    'default': [0, 0, 0.1]
  };

  return positionMap[location.toLowerCase()] || positionMap.default;
};

// Get color based on severity/pain level
export const getSeverityColor = (painLevel: number): string => {
  if (painLevel >= 7) return '#ff4d4f'; // red for high pain
  if (painLevel >= 4) return '#faad14'; // yellow for medium pain
  return '#52c41a'; // green for low pain
};

// Get severity text based on pain level
export const getSeverityLevel = (painLevel: number): string => {
  if (painLevel >= 7) return 'Severe';
  if (painLevel >= 4) return 'Moderate';
  return 'Mild';
};

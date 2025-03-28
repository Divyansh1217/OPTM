
export const anatomicalRegions = [
  { id: 'head', name: 'Head', x: 50, y: 10 },
  { id: 'neck', name: 'Neck', x: 50, y: 18 },
  { id: 'chest', name: 'Chest', x: 50, y: 30 },
  { id: 'abdomen', name: 'Abdomen', x: 50, y: 42 },
  { id: 'back', name: 'Back', x: 25, y: 35 },
  { id: 'arms', name: 'Arms', x: 75, y: 35 },
  { id: 'legs', name: 'Legs', x: 50, y: 65 },
  { id: 'shoulders', name: 'Shoulders', x: 50, y: 25 },
  { id: 'hips', name: 'Hips', x: 50, y: 58 },
  { id: 'knees', name: 'Knees', x: 50, y: 75 },
  { id: 'ankles', name: 'Ankles', x: 50, y: 92 },
  { id: 'feet', name: 'Feet', x: 50, y: 97 },
];

export const getRegionById = (id: string) => {
  return anatomicalRegions.find(region => region.id === id);
};

export const getRegionByName = (name: string) => {
  return anatomicalRegions.find(region => region.name.toLowerCase() === name.toLowerCase());
};

export const getAllRegions = () => {
  return anatomicalRegions;
};

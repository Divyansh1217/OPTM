
import { BodyRegion } from '../types';

// Define body regions with detailed descriptions
export const bodyRegions: BodyRegion[] = [
  {
    id: '1',
    name: 'Head',
    x: 50,
    y: 10,
    svgPathId: 'head',
    description: 'The uppermost part of the body containing the brain and the centers of sight, hearing, taste, and smell.'
  },
  {
    id: '2',
    name: 'Neck',
    x: 50,
    y: 18,
    svgPathId: 'neck',
    description: 'The part of the body connecting the head to the torso, containing the cervical spine and various muscles.'
  },
  {
    id: '3',
    name: 'Chest',
    x: 50,
    y: 30,
    svgPathId: 'chest',
    description: 'The upper torso containing the heart, lungs, and rib cage.'
  },
  {
    id: '4',
    name: 'Abdomen',
    x: 50,
    y: 42,
    svgPathId: 'abdomen',
    description: 'The region between the chest and pelvis containing the digestive organs.'
  },
  {
    id: '5',
    name: 'Lower Back',
    x: 50,
    y: 50,
    svgPathId: 'lower-back',
    description: 'The area of the back below the ribcage including the lumbar spine.'
  },
  {
    id: '6',
    name: 'Left Arm',
    x: 30,
    y: 35,
    svgPathId: 'left-arm',
    description: 'The left upper limb from the shoulder to the wrist.'
  },
  {
    id: '7',
    name: 'Right Arm',
    x: 70,
    y: 35,
    svgPathId: 'right-arm',
    description: 'The right upper limb from the shoulder to the wrist.'
  },
  {
    id: '8',
    name: 'Left Hand',
    x: 25,
    y: 48,
    svgPathId: 'left-hand',
    description: 'The left terminal part of the arm containing fingers and palm.'
  },
  {
    id: '9',
    name: 'Right Hand',
    x: 75,
    y: 48,
    svgPathId: 'right-hand',
    description: 'The right terminal part of the arm containing fingers and palm.'
  },
  {
    id: '10',
    name: 'Pelvis',
    x: 50,
    y: 58,
    svgPathId: 'pelvis',
    description: 'The lower part of the trunk connecting the spine to the legs.'
  },
  {
    id: '11',
    name: 'Left Thigh',
    x: 40,
    y: 65,
    svgPathId: 'left-thigh',
    description: 'The left upper part of the leg between the hip and knee.'
  },
  {
    id: '12',
    name: 'Right Thigh',
    x: 60,
    y: 65,
    svgPathId: 'right-thigh',
    description: 'The right upper part of the leg between the hip and knee.'
  },
  {
    id: '13',
    name: 'Left Knee',
    x: 40,
    y: 75,
    svgPathId: 'left-knee',
    description: 'The left joint connecting the thigh with the lower leg.'
  },
  {
    id: '14',
    name: 'Right Knee',
    x: 60,
    y: 75,
    svgPathId: 'right-knee',
    description: 'The right joint connecting the thigh with the lower leg.'
  },
  {
    id: '15',
    name: 'Left Calf',
    x: 40,
    y: 85,
    svgPathId: 'left-calf',
    description: 'The left back part of the leg below the knee.'
  },
  {
    id: '16',
    name: 'Right Calf',
    x: 60,
    y: 85,
    svgPathId: 'right-calf',
    description: 'The right back part of the leg below the knee.'
  },
  {
    id: '17',
    name: 'Left Ankle',
    x: 40,
    y: 92,
    svgPathId: 'left-ankle',
    description: 'The left joint connecting the leg to the foot.'
  },
  {
    id: '18',
    name: 'Right Ankle',
    x: 60,
    y: 92,
    svgPathId: 'right-ankle',
    description: 'The right joint connecting the leg to the foot.'
  },
  {
    id: '19',
    name: 'Left Foot',
    x: 40,
    y: 97,
    svgPathId: 'left-foot',
    description: 'The left terminal part of the leg used for standing and walking.'
  },
  {
    id: '20',
    name: 'Right Foot',
    x: 60,
    y: 97,
    svgPathId: 'right-foot',
    description: 'The right terminal part of the leg used for standing and walking.'
  },
  {
    id: '21',
    name: 'Left Shoulder',
    x: 35,
    y: 25,
    svgPathId: 'left-shoulder',
    description: 'The left joint connecting the arm to the torso.'
  },
  {
    id: '22',
    name: 'Right Shoulder',
    x: 65,
    y: 25,
    svgPathId: 'right-shoulder',
    description: 'The right joint connecting the arm to the torso.'
  },
  {
    id: '23',
    name: 'Upper Back',
    x: 50,
    y: 25,
    svgPathId: 'upper-back',
    description: 'The area of the back between the shoulders and above the lumbar spine.'
  },
  {
    id: '24',
    name: 'Left Hip',
    x: 40,
    y: 58,
    svgPathId: 'left-hip',
    description: 'The left joint connecting the leg to the torso.'
  },
  {
    id: '25',
    name: 'Right Hip',
    x: 60,
    y: 58,
    svgPathId: 'right-hip',
    description: 'The right joint connecting the leg to the torso.'
  }
];

// Helper function to retrieve body regions
export const getBodyRegions = (): BodyRegion[] => {
  return bodyRegions;
};

// Helper function to find a specific body region by ID
export const getBodyRegionById = (id: string): BodyRegion | undefined => {
  return bodyRegions.find(region => region.id === id);
};

// Helper function to find a specific body region by name
export const getBodyRegionByName = (name: string): BodyRegion | undefined => {
  return bodyRegions.find(region => region.name.toLowerCase() === name.toLowerCase());
};


import { useState, useCallback, useEffect } from 'react';
import { HealthIssue, MuscleFlexion } from '../types';

export const useAnatomicalMap = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState<HealthIssue | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mark the map as loaded
  useEffect(() => {
    const img = new Image();
    img.src = '/lovable-uploads/cc5c1cf4-bddf-4fc8-bc1a-6a1387ebbdf8.png';
    img.onload = () => setIsLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);
  
  // Properly memoized functions for zoom
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  }, []);
  
  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.1, 0.7));
  }, []);
  
  const handleIssueClick = useCallback((issue: HealthIssue) => {
    setSelectedIssue(prev => prev?.id === issue.id ? null : issue);
  }, []);
  
  // Updated hotspot positions based on anatomical accuracy
  const healthIssues: HealthIssue[] = [
    {
      id: '1',
      name: 'Rotator Cuff Tear',
      location: { x: 22, y: 18 },
      severity: 'medium',
      description: 'Partial tear in the right rotator cuff showing inflammation and reduced strength.',
      muscleGroup: 'Shoulder Muscles',
      symptoms: [
        'Pain when lifting arm',
        'Weakness in the shoulder',
        'Difficulty reaching behind back'
      ],
      recommendedActions: [
        'Physical therapy exercises',
        'Rest and ice',
        'Anti-inflammatory medication'
      ]
    },
    {
      id: '2',
      name: 'Lower Back Strain',
      location: { x: 50, y: 39 },
      severity: 'high',
      description: 'Muscle strain in the erector spinae muscles, causing restricted movement and acute pain.',
      muscleGroup: 'Erector Spinae',
      symptoms: [
        'Acute lower back pain',
        'Muscle spasms',
        'Limited mobility'
      ],
      recommendedActions: [
        'Rest with proper support',
        'Heat therapy',
        'Gentle stretching exercises'
      ]
    },
    {
      id: '3',
      name: 'Hamstring Strain',
      location: { x: 49, y: 58 },
      severity: 'low',
      description: 'Mild pull in the hamstring muscle fibers with some discomfort during flexion.',
      muscleGroup: 'Hamstrings',
      symptoms: [
        'Pain in back of thigh',
        'Discomfort when bending knee',
        'Tenderness when pressing on muscle'
      ],
      recommendedActions: [
        'Rest from high-impact activities',
        'Ice therapy',
        'Gentle stretching'
      ]
    },
    {
      id: '4',
      name: 'Biceps Tendonitis',
      location: { x: 76, y: 29 },
      severity: 'medium',
      description: 'Inflammation in the long head of the biceps tendon causing pain during flexion.',
      muscleGroup: 'Biceps Brachii',
      symptoms: [
        'Pain in the front of the shoulder',
        'Tenderness when touching the biceps tendon',
        'Pain when lifting or pulling'
      ],
      recommendedActions: [
        'Rest from activities that aggravate pain',
        'Ice therapy',
        'Gentle stretching'
      ]
    },
    {
      id: '5',
      name: 'Quadriceps Tendinitis',
      location: { x: 51, y: 65 },
      severity: 'low',
      description: 'Mild inflammation of the quadriceps tendon with some discomfort during extension.',
      muscleGroup: 'Quadriceps',
      symptoms: [
        'Pain above the kneecap',
        'Discomfort when straightening leg',
        'Tenderness when pressing on tendon'
      ],
      recommendedActions: [
        'Rest from high-impact activities',
        'Ice therapy',
        'Strengthening exercises'
      ]
    },
    {
      id: '6',
      name: 'Neck Muscle Tension',
      location: { x: 50, y: 9 },
      severity: 'medium',
      description: 'Tension in the trapezius and levator scapulae muscles causing neck stiffness.',
      muscleGroup: 'Neck Muscles',
      symptoms: [
        'Stiffness in neck',
        'Limited range of motion',
        'Headaches originating from neck'
      ],
      recommendedActions: [
        'Gentle neck stretches',
        'Heat therapy',
        'Improve desk ergonomics'
      ]
    },
    {
      id: '7',
      name: 'Calf Strain',
      location: { x: 51, y: 78 },
      severity: 'low',
      description: 'Mild strain in the gastrocnemius muscle with some discomfort during walking.',
      muscleGroup: 'Calf Muscles',
      symptoms: [
        'Tightness in calf',
        'Mild pain when walking',
        'Tenderness to touch'
      ],
      recommendedActions: [
        'Rest and elevation',
        'Gentle stretching',
        'Compression wrap if swollen'
      ]
    },
    {
      id: '8',
      name: 'Shoulder Impingement',
      location: { x: 78, y: 18 },
      severity: 'medium',
      description: 'Pinching of tendons in the shoulder joint causing inflammation and restricted movement.',
      muscleGroup: 'Rotator Cuff',
      symptoms: [
        'Pain with overhead movements',
        'Weakness in shoulder',
        'Pain when sleeping on affected side'
      ],
      recommendedActions: [
        'Physical therapy',
        'Posture correction',
        'Anti-inflammatory medication'
      ]
    },
    {
      id: '9',
      name: 'Abdominal Strain',
      location: { x: 50, y: 32 },
      severity: 'low',
      description: 'Minor tear in the rectus abdominis muscle causing discomfort during trunk flexion.',
      muscleGroup: 'Abdominal Muscles',
      symptoms: [
        'Pain during sit-ups',
        'Tenderness to touch',
        'Pain when coughing or sneezing'
      ],
      recommendedActions: [
        'Rest from core exercises',
        'Gradual return to activity',
        'Proper warm-up techniques'
      ]
    }
  ];
  
  // Muscle flexion data that corresponds to the hotspots
  const muscleFlexionData: MuscleFlexion[] = [
    {
      muscle: 'Rotator Cuff',
      flexionPercentage: 45,
      status: 'weak',
      lastReading: '2 hours ago',
      relatedIssues: ['1', '8']
    },
    {
      muscle: 'Erector Spinae',
      flexionPercentage: 30,
      status: 'overworked',
      lastReading: '2 hours ago',
      relatedIssues: ['2']
    },
    {
      muscle: 'Quadriceps',
      flexionPercentage: 65,
      status: 'weak',
      lastReading: '2 hours ago',
      relatedIssues: ['5']
    },
    {
      muscle: 'Biceps',
      flexionPercentage: 82,
      status: 'healthy',
      lastReading: '2 hours ago',
      relatedIssues: ['4']
    },
    {
      muscle: 'Hamstrings',
      flexionPercentage: 55,
      status: 'weak',
      lastReading: '2 hours ago',
      relatedIssues: ['3']
    },
    {
      muscle: 'Neck Muscles',
      flexionPercentage: 40,
      status: 'weak',
      lastReading: '2 hours ago',
      relatedIssues: ['6']
    },
    {
      muscle: 'Calf Muscles',
      flexionPercentage: 70,
      status: 'healthy',
      lastReading: '2 hours ago',
      relatedIssues: ['7']
    },
    {
      muscle: 'Abdominal Muscles',
      flexionPercentage: 60,
      status: 'weak',
      lastReading: '2 hours ago',
      relatedIssues: ['9']
    }
  ];
  
  return {
    zoom,
    isLoaded,
    selectedIssue,
    healthIssues,
    muscleFlexionData,
    handleZoomIn,
    handleZoomOut,
    handleIssueClick
  };
};

export default useAnatomicalMap;

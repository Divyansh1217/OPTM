
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostureAnalysisTabs from './posture-analysis/PostureAnalysisTabs';
import { PostureArea, ProgressSnapshot } from './posture-analysis/types';

const PostureAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posture');
  
  // Sample posture analysis data
  const postureAnalysis = {
    overallScore: 72,
    areas: [
      {
        name: 'Neck Alignment',
        score: 65,
        status: 'moderate' as const,
        recommendation: 'Consider neck strengthening exercises and proper ergonomics.'
      },
      {
        name: 'Shoulder Balance',
        score: 80,
        status: 'good' as const,
        recommendation: 'Continue shoulder stretching and mobility exercises.'
      },
      {
        name: 'Spine Curvature',
        score: 70,
        status: 'moderate' as const,
        recommendation: 'Core strengthening and lumbar support recommended.'
      },
      {
        name: 'Pelvic Tilt',
        score: 75,
        status: 'moderate' as const,
        recommendation: 'Hip flexor stretches and glute activation exercises.'
      }
    ]
  };
  
  // Sample progress snapshots
  const progressSnapshots: ProgressSnapshot[] = [
    { id: 1, date: '2023-05-15', posture: 'Forward Head', improvement: '+5%' },
    { id: 2, date: '2023-05-30', posture: 'Rounded Shoulders', improvement: '+8%' },
    { id: 3, date: '2023-06-15', posture: 'Overall Alignment', improvement: '+10%' }
  ];
  
  return (
    <Card className="glass-morphism overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Posture Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <PostureAnalysisTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          postureAnalysis={postureAnalysis}
          progressSnapshots={progressSnapshots}
        />
      </CardContent>
    </Card>
  );
};

export default PostureAnalysis;

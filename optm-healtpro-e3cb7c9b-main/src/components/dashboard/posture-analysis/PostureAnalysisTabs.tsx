
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Move, Image } from 'lucide-react';
import PostureScore from './PostureScore';
import MobilityCheck from './MobilityCheck';
import ProgressHistory from './ProgressHistory';
import { PostureArea, ProgressSnapshot } from './types';

interface PostureAnalysisTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  postureAnalysis: {
    overallScore: number;
    areas: PostureArea[];
  };
  progressSnapshots: ProgressSnapshot[];
}

const PostureAnalysisTabs: React.FC<PostureAnalysisTabsProps> = ({
  activeTab,
  setActiveTab,
  postureAnalysis,
  progressSnapshots
}) => {
  return (
    <>
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
        <Button 
          variant={activeTab === 'posture' ? "default" : "outline"} 
          size="sm"
          className="flex items-center gap-1 whitespace-nowrap"
          onClick={() => setActiveTab('posture')}
        >
          <Camera className="h-4 w-4" />
          <span>Posture</span>
        </Button>
        <Button 
          variant={activeTab === 'mobility' ? "default" : "outline"} 
          size="sm"
          className="flex items-center gap-1 whitespace-nowrap"
          onClick={() => setActiveTab('mobility')}
        >
          <Move className="h-4 w-4" />
          <span>Mobility</span>
        </Button>
        <Button 
          variant={activeTab === 'history' ? "default" : "outline"} 
          size="sm"
          className="flex items-center gap-1 whitespace-nowrap"
          onClick={() => setActiveTab('history')}
        >
          <Image className="h-4 w-4" />
          <span>History</span>
        </Button>
      </div>
      
      {activeTab === 'posture' && (
        <div className="space-y-4">
          <PostureScore postureAnalysis={postureAnalysis} />
        </div>
      )}
      
      {activeTab === 'mobility' && (
        <MobilityCheck />
      )}
      
      {activeTab === 'history' && (
        <ProgressHistory progressSnapshots={progressSnapshots} />
      )}
    </>
  );
};

export default PostureAnalysisTabs;

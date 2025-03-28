
import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Camera, InfoIcon } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PostureArea } from './types';

interface PostureScoreProps {
  postureAnalysis: {
    overallScore: number;
    areas: PostureArea[];
  };
}

const PostureScore: React.FC<PostureScoreProps> = ({ postureAnalysis }) => {
  return (
    <div className="bg-muted/30 rounded-lg p-4 text-center border border-border/50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Your Posture Score</h4>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Last scan: Today</span>
      </div>
      
      <div className="relative pt-1 mb-3">
        <Progress value={postureAnalysis.overallScore} className="h-3 rounded-full bg-secondary/50" />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Poor</span>
          <span className="text-xs text-muted-foreground">Excellent</span>
        </div>
      </div>
      
      <div className="bg-background/50 rounded-lg p-3 border border-border/40 mb-4">
        <div className="text-2xl font-bold">{postureAnalysis.overallScore}/100</div>
        <div className="text-xs text-muted-foreground">Your overall posture rating</div>
      </div>
      
      <div className="space-y-3">
        {postureAnalysis.areas.map((area, index) => (
          <div key={index} className="flex items-center justify-between bg-background/30 rounded-lg p-2.5 border border-border/20">
            <div className="flex items-center gap-2">
              {area.status === 'good' ? (
                <CheckCircle className="w-4 h-4 text-medical-green" />
              ) : area.status === 'moderate' ? (
                <AlertTriangle className="w-4 h-4 text-medical-yellow" />
              ) : (
                <HelpCircle className="w-4 h-4 text-medical-red" />
              )}
              <div className="text-sm font-medium">{area.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{area.score}</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{area.recommendation}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4" size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Start New Posture Scan
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Camera-based Posture Scan</DialogTitle>
            <DialogDescription>
              Use your device's camera to analyze posture metrics
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 h-48 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <Camera className="h-10 w-10 mb-2 opacity-50" />
                <p className="text-sm text-center">Camera access required to perform posture scan</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded p-2 text-center">
                <h4 className="text-sm font-medium">Knee Angle</h4>
                <p className="text-xs text-muted-foreground">Stand sideways to measure</p>
              </div>
              <div className="border rounded p-2 text-center">
                <h4 className="text-sm font-medium">Spinal Curvature</h4>
                <p className="text-xs text-muted-foreground">Stand with back to camera</p>
              </div>
              <div className="border rounded p-2 text-center">
                <h4 className="text-sm font-medium">Shoulder Alignment</h4>
                <p className="text-xs text-muted-foreground">Stand facing camera</p>
              </div>
              <div className="border rounded p-2 text-center">
                <h4 className="text-sm font-medium">Foot Alignment</h4>
                <p className="text-xs text-muted-foreground">Stand on flat surface</p>
              </div>
            </div>
            
            <Button className="w-full" disabled>
              Start Camera Scan
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Note: Camera access is required for this feature
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostureScore;

import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

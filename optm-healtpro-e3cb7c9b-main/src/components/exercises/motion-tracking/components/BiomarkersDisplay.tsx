
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp } from 'lucide-react';

interface Biomarkers {
  postureScore: number;
  movementQuality: number;
  rangeOfMotion: number;
  stabilityScore: number;
}

interface BiomarkersDisplayProps {
  biomarkers: Biomarkers;
}

const BiomarkersDisplay: React.FC<BiomarkersDisplayProps> = ({ biomarkers }) => {
  return (
    <Card>
      <CardHeader className="py-3 px-4 bg-slate-50 dark:bg-slate-800/50">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          Performance Biomarkers
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid grid-cols-2 gap-4 biomarker-grid">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Posture Score</div>
            <div className="text-xl font-semibold">
              {biomarkers.postureScore ? Math.round(biomarkers.postureScore) : 0}
              <span className="text-sm text-muted-foreground ml-1">/100</span>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Movement Quality</div>
            <div className="text-xl font-semibold">
              {biomarkers.movementQuality ? Math.round(biomarkers.movementQuality) : 0}
              <span className="text-sm text-muted-foreground ml-1">/100</span>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Range of Motion</div>
            <div className="text-xl font-semibold">
              {biomarkers.rangeOfMotion ? Math.round(biomarkers.rangeOfMotion) : 0}
              <span className="text-sm text-muted-foreground ml-1">/100</span>
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Stability Score</div>
            <div className="text-xl font-semibold">
              {biomarkers.stabilityScore ? Math.round(biomarkers.stabilityScore) : 0}
              <span className="text-sm text-muted-foreground ml-1">/100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomarkersDisplay;

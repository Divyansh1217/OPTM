
import React from 'react';
import { Button } from '@/components/ui/button';
import { Move, ArrowUpDown, ChevronRight } from 'lucide-react';

const RecommendedExercises: React.FC = () => {
  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm">Recommended Exercises</h4>
        <Button variant="link" size="sm" className="text-xs p-0 h-auto">View All</Button>
      </div>
      
      <div className="space-y-2">
        <div className="rounded-lg border p-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Move className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="text-sm font-medium">Scapular Retraction</h5>
              <p className="text-xs text-muted-foreground">Improves shoulder balance</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="rounded-lg border p-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="text-sm font-medium">Child's Pose</h5>
              <p className="text-xs text-muted-foreground">Reduces spinal tension</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default RecommendedExercises;

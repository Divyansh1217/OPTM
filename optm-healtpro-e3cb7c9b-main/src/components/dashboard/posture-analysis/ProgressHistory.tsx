
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Image, ArrowLeftRight } from 'lucide-react';
import { ProgressSnapshot } from './types';

interface ProgressHistoryProps {
  progressSnapshots: ProgressSnapshot[];
}

const ProgressHistory: React.FC<ProgressHistoryProps> = ({ progressSnapshots }) => {
  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-24 p-2 bg-primary/5 hover:bg-primary/10 w-full"
          >
            <Image className="h-6 w-6 text-primary" />
            <span className="text-xs text-center">Progress Snapshots</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Progress Snapshots</DialogTitle>
            <DialogDescription>
              Compare posture improvements over time
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 rounded-lg bg-muted/50 p-2 h-32 flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Image className="h-6 w-6 mb-1 opacity-50" />
                  <p className="text-xs text-center">Before</p>
                </div>
              </div>
              <ArrowLeftRight className="h-6 w-6 opacity-70" />
              <div className="flex-1 rounded-lg bg-muted/50 p-2 h-32 flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Image className="h-6 w-6 mb-1 opacity-50" />
                  <p className="text-xs text-center">After</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Snapshot History</h4>
              {progressSnapshots.map(snapshot => (
                <div key={snapshot.id} className="flex justify-between items-center p-2 border rounded-lg text-sm">
                  <div>
                    <p className="font-medium">{snapshot.date}</p>
                    <p className="text-xs text-muted-foreground">{snapshot.posture}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-medium">{snapshot.improvement}</p>
                    <p className="text-xs text-muted-foreground">Improvement</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full">
              Capture New Snapshot
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 space-y-3">
        <h4 className="font-medium">Posture Improvement Timeline</h4>
        
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border/50"></div>
          {progressSnapshots.map((snapshot, index) => (
            <div key={snapshot.id} className="relative pl-12 pb-4">
              <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <span className="text-xs text-primary">{index + 1}</span>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-border/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-medium">{snapshot.posture}</h5>
                    <p className="text-xs text-muted-foreground">{snapshot.date}</p>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {snapshot.improvement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full text-sm" size="sm">
          View Full History
        </Button>
      </div>
    </div>
  );
};

export default ProgressHistory;

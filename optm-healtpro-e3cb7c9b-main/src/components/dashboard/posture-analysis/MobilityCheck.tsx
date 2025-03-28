
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
import { Progress } from '@/components/ui/progress';
import { Move, ArrowLeftRight, Ruler } from 'lucide-react';

const MobilityCheck: React.FC = () => {
  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-24 p-2 bg-primary/5 hover:bg-primary/10 w-full"
          >
            <Move className="h-6 w-6 text-primary" />
            <span className="text-xs text-center">Range-of-Motion Check</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Range-of-Motion Check</DialogTitle>
            <DialogDescription>
              Follow guided tests to measure your mobility
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <h4 className="font-medium text-sm mb-1">Knee Flexion Test</h4>
              <div className="flex gap-3 text-xs">
                <div className="flex-1 p-2 bg-muted/20 rounded text-center">
                  <p>Supine</p>
                  <ArrowLeftRight className="mx-auto my-2 h-5 w-5 opacity-70" />
                  <p>0-135°</p>
                </div>
                <div className="flex-1 p-2 bg-muted/20 rounded text-center">
                  <p>Prone</p>
                  <ArrowLeftRight className="mx-auto my-2 h-5 w-5 opacity-70" />
                  <p>0-120°</p>
                </div>
                <div className="flex-1 p-2 bg-muted/20 rounded text-center">
                  <p>Standing</p>
                  <ArrowLeftRight className="mx-auto my-2 h-5 w-5 opacity-70" />
                  <p>0-90°</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted/50 p-4 h-36 flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <Ruler className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm text-center">Follow on-screen instructions to measure range of motion</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">Previous Test</Button>
              <Button>Next Test</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 gap-3">
        <div className="border rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Shoulder Flexion</h4>
          <div className="flex items-end justify-between">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">142°</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">180°</div>
              <div className="text-xs text-muted-foreground">Normal</div>
            </div>
          </div>
          <Progress value={78} className="h-2 mt-2" />
        </div>
        
        <div className="border rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Hip Rotation</h4>
          <div className="flex items-end justify-between">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">32°</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">45°</div>
              <div className="text-xs text-muted-foreground">Normal</div>
            </div>
          </div>
          <Progress value={71} className="h-2 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default MobilityCheck;

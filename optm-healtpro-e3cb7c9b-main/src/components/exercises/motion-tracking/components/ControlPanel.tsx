
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RefreshCcw, CheckSquare } from 'lucide-react';

interface ControlPanelProps {
  isTracking: boolean;
  isModelLoaded: boolean;
  onStartTracking: () => void;
  onStopTracking: () => void;
  onResetSession: () => void;
  onFinish?: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isTracking,
  isModelLoaded,
  onStartTracking,
  onStopTracking,
  onResetSession,
  onFinish
}) => {
  return (
    <Card>
      <CardHeader className="py-3 px-4 bg-slate-50 dark:bg-slate-800/50">
        <CardTitle className="text-lg font-medium">Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col gap-3">
          <Button
            variant={isTracking ? "destructive" : "default"}
            className="w-full flex justify-center items-center gap-2"
            onClick={isTracking ? onStopTracking : onStartTracking}
            disabled={!isModelLoaded}
          >
            {isTracking ? (
              <>
                <Pause className="h-4 w-4" />
                Pause Tracking
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Tracking
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="w-full flex justify-center items-center gap-2"
            onClick={onResetSession}
          >
            <RefreshCcw className="h-4 w-4" />
            Reset Session
          </Button>
          
          {onFinish && (
            <Button
              variant="secondary"
              className="w-full flex justify-center items-center gap-2 mt-4"
              onClick={onFinish}
            >
              <CheckSquare className="h-4 w-4" />
              Finish Exercise
            </Button>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 space-y-2 border-t pt-3">
          <p>• Face the camera directly</p>
          <p>• Ensure your full body is visible</p>
          <p>• Move slowly for better tracking</p>
          <p>• Keep good lighting conditions</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;

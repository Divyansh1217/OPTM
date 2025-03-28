
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Check, Info } from 'lucide-react';
import { SquatState } from '@/lib/human/types';

interface SquatGuideProps {
  squatCount: number;
  goodSquats: number;
  badSquats: number;
  currentSquatState: SquatState;
  kneeAngle: number | null;
  hipAngle: number | null;
}

const SquatGuide: React.FC<SquatGuideProps> = ({
  squatCount,
  goodSquats,
  badSquats,
  currentSquatState,
  kneeAngle,
  hipAngle
}) => {
  const getStateIcon = () => {
    switch (currentSquatState) {
      case SquatState.DESCENDING:
        return <ArrowDown className="h-5 w-5 text-blue-500" />;
      case SquatState.ASCENDING:
        return <ArrowUp className="h-5 w-5 text-green-500" />;
      case SquatState.BOTTOM:
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getStateText = () => {
    switch (currentSquatState) {
      case SquatState.DESCENDING:
        return "Going Down";
      case SquatState.ASCENDING:
        return "Going Up";
      case SquatState.BOTTOM:
        return "Holding Squat";
      default:
        return "Standing";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Squat Guide</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted p-2 rounded-md">
              <div className="text-2xl font-bold">{squatCount}</div>
              <div className="text-xs text-muted-foreground">Total Squats</div>
            </div>
            <div className="bg-muted p-2 rounded-md">
              <div className="text-2xl font-bold text-green-500">{goodSquats}</div>
              <div className="text-xs text-muted-foreground">Good Form</div>
            </div>
            <div className="bg-muted p-2 rounded-md">
              <div className="text-2xl font-bold text-amber-500">{badSquats}</div>
              <div className="text-xs text-muted-foreground">Needs Work</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              {getStateIcon()}
              <span className="font-medium">{getStateText()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {kneeAngle !== null ? `Knee: ${kneeAngle.toFixed(0)}°` : ''}
              {hipAngle !== null ? ` Hip: ${hipAngle.toFixed(0)}°` : ''}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Proper Squat Form:</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Keep your back straight</li>
              <li>• Knees should align with toes</li>
              <li>• Go as low as comfortable</li>
              <li>• Keep weight in your heels</li>
              <li>• Look straight ahead</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SquatGuide;

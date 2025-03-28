
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface BiologicalAgeMeterProps {
  biologicalAge: number;
  chronologicalAge: number;
  className?: string;
}

const BiologicalAgeMeter: React.FC<BiologicalAgeMeterProps> = ({ 
  biologicalAge, 
  chronologicalAge,
  className = "" 
}) => {
  // Calculate difference and determine status
  const ageDifference = chronologicalAge - biologicalAge;
  const statusColor = ageDifference >= 0 ? 'text-green-500' : 'text-orange-500';
  const statusText = ageDifference >= 0 
    ? `${Math.abs(ageDifference)} years younger`
    : `${Math.abs(ageDifference)} years older`;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary/80" />
          Biological Age
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-2">
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold">{biologicalAge}</div>
          <div className="text-muted-foreground text-sm mt-1">years</div>
        </div>
        
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs">
            <span>Biological</span>
            <span>Chronological</span>
          </div>
          
          <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="relative">
              <div 
                className="absolute top-0 h-2 rounded-full bg-primary" 
                style={{ 
                  left: '0%', 
                  width: `${(biologicalAge / Math.max(chronologicalAge, biologicalAge)) * 100}%` 
                }}
              ></div>
              
              <div 
                className="absolute top-0 h-2 rounded-full bg-gray-400"
                style={{ 
                  left: `${(biologicalAge / Math.max(chronologicalAge, biologicalAge)) * 100}%`, 
                  width: `${(Math.max(0, chronologicalAge - biologicalAge) / Math.max(chronologicalAge, biologicalAge)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs">
            <span>{biologicalAge} yrs</span>
            <span>{chronologicalAge} yrs</span>
          </div>
        </div>
        
        <div className={`mt-4 text-sm font-medium ${statusColor}`}>
          {statusText}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiologicalAgeMeter;


import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InsightHeaderProps {
  lastGenerated: string | null;
  isGenerating: boolean;
  onGenerateInsights: () => void;
}

const InsightHeader: React.FC<InsightHeaderProps> = ({ 
  lastGenerated, 
  isGenerating, 
  onGenerateInsights 
}) => {
  return (
    <CardHeader className="pb-3 flex items-center justify-between flex-row">
      <div>
        <CardTitle className="text-lg">AI Health Insights</CardTitle>
        <div className="text-sm text-muted-foreground mt-0.5">
          {lastGenerated ? (
            <>Last updated: {new Date(lastGenerated).toLocaleTimeString()}</>
          ) : (
            <>Real-time health interpretations</>
          )}
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onGenerateInsights} 
        disabled={isGenerating}
      >
        {isGenerating ? 'Analyzing...' : 'Refresh Insights'}
      </Button>
    </CardHeader>
  );
};

export default InsightHeader;

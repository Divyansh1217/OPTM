
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <Card className="h-full border-2 border-blue-100 dark:border-blue-950 bg-blue-50 dark:bg-blue-950">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="mt-0.5 bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
            <Lightbulb className="h-4 w-4 text-blue-700 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-base font-medium mb-1.5 text-blue-800 dark:text-blue-200">AI Recommendation</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">{recommendation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;

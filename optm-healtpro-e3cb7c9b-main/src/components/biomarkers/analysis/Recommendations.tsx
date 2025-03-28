
import React from 'react';
import { ListChecks } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <ListChecks className="w-5 h-5 mr-2" />
        Recommendations
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-muted-foreground">{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;

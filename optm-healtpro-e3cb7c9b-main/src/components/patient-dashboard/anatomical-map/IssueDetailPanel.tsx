
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { HealthIssue } from './types';
import { getSeverityColor, getSeverityLabel } from './utils';

interface IssueDetailPanelProps {
  issue: HealthIssue;
}

const IssueDetailPanel: React.FC<IssueDetailPanelProps> = ({ issue }) => {
  return (
    <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-in slide-in-from-bottom-2">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{issue.name}</h3>
          {issue.muscleGroup && (
            <p className="text-sm text-muted-foreground">Muscle Group: {issue.muscleGroup}</p>
          )}
        </div>
        <Badge className={`${getSeverityColor(issue.severity)} text-white`}>
          {getSeverityLabel(issue.severity)}
        </Badge>
      </div>
      
      <p className="text-sm mb-3">{issue.description}</p>
      
      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        {issue.symptoms && issue.symptoms.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Common Symptoms</h4>
            <ul className="text-sm list-disc pl-4 space-y-1">
              {issue.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}
        
        {issue.recommendedActions && issue.recommendedActions.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Recommended Actions</h4>
            <ul className="text-sm list-disc pl-4 space-y-1">
              {issue.recommendedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetailPanel;

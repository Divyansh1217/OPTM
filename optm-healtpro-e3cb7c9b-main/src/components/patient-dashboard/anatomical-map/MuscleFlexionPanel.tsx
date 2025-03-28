
import React from 'react';
import { MuscleFlexion, HealthIssue } from './types';
import { getFlexionStatusColor, getFlexionProgressColor } from './utils';

interface MuscleFlexionPanelProps {
  flexionData: MuscleFlexion[];
  healthIssues?: HealthIssue[];
  onMuscleClick?: (muscle: string) => void;
}

const MuscleFlexionPanel: React.FC<MuscleFlexionPanelProps> = ({ 
  flexionData,
  healthIssues = [],
  onMuscleClick
}) => {
  // Find related health issues for a muscle
  const getRelatedIssues = (muscle: MuscleFlexion) => {
    if (!muscle.relatedIssues) return [];
    
    return healthIssues.filter(issue => 
      muscle.relatedIssues?.includes(issue.id)
    );
  };
  
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {flexionData.map((item) => {
        const relatedIssues = getRelatedIssues(item);
        
        return (
          <div 
            key={item.muscle}
            className="bg-background p-2 rounded-md border border-muted hover:border-muted-foreground transition-colors"
            onClick={() => onMuscleClick?.(item.muscle)}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-medium">{item.muscle}</h4>
              <span className={`text-xs font-medium ${getFlexionStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getFlexionProgressColor(item.status)}`}
                style={{ width: `${item.flexionPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">{item.flexionPercentage}% strength</span>
              <span className="text-xs text-muted-foreground">{item.lastReading}</span>
            </div>
            
            {relatedIssues.length > 0 && (
              <div className="mt-1.5 text-xs text-muted-foreground">
                <span className="text-xs font-medium">Related issues:</span>
                <ul className="mt-0.5 text-xs list-disc pl-4">
                  {relatedIssues.map(issue => (
                    <li key={issue.id} className="text-xs">{issue.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MuscleFlexionPanel;

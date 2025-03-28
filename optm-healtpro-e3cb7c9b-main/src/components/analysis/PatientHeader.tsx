
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PatientHeaderProps {
  name: string;
  age: number;
  gender: string;
  treatmentStage: string;
  assessments: {
    current: { date: string },
    previous: { date: string }
  };
  overallProgress: {
    status: string;
    percentChange: number;
    description: string;
  };
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ 
  name, 
  age, 
  gender, 
  treatmentStage,
  assessments,
  overallProgress
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            {name}
            <span className="text-sm font-normal text-muted-foreground">
              {age} years, {gender}, {treatmentStage} treatment stage
            </span>
          </h2>
          <h3 className="text-lg font-semibold mt-2">Overall Progress</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          <div>Last Updated: <span className="font-medium">{assessments.current.date}</span></div>
          <div>Previous assessment: <span className="font-medium">{assessments.previous.date}</span></div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={overallProgress.status === 'minimal-improvement' ? 'secondary' : 'default'} className="py-1">
            {overallProgress.status === 'minimal-improvement' ? 'No change/ improvement' : 'Improvement'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{overallProgress.description}</p>
      </div>
    </div>
  );
};

export default PatientHeader;

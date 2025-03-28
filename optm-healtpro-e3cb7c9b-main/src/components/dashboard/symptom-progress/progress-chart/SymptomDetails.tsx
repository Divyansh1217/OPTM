
import React from 'react';
import SymptomCardsContainer from '../SymptomCardsContainer';
import { ChartData } from '../types';

interface SymptomDetailsProps {
  symptoms: ChartData[];
}

const SymptomDetails: React.FC<SymptomDetailsProps> = ({ symptoms }) => {
  if (!symptoms || symptoms.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No symptom data available. Track your symptoms to see your progress here.
      </div>
    );
  }
  
  return <SymptomCardsContainer symptoms={symptoms} />;
};

export default SymptomDetails;

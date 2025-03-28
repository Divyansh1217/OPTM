
import React from 'react';
import PainReductionCard from '../PainReductionCard';
import { PainReductionProps } from '../types';

export interface PainReductionSummaryProps {
  painReduction: number;
}

const PainReductionSummary: React.FC<PainReductionSummaryProps> = ({ painReduction }) => {
  return <PainReductionCard painReduction={painReduction} />;
};

export default PainReductionSummary;

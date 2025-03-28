
import React from 'react';
import BiomarkerDisplayContainer from './biomarker-display';
import { Biomarker } from './biomarker-display/types';

interface BiomarkerDisplayProps {
  biomarkers: Biomarker[];
}

const BiomarkerDisplay: React.FC<BiomarkerDisplayProps> = ({ biomarkers }) => {
  return <BiomarkerDisplayContainer biomarkers={biomarkers} />;
};

export default BiomarkerDisplay;


import React from 'react';
import { motion } from 'framer-motion';
import { BiomarkerCardProps } from './types';
import BiomarkerCardHeader from './cards/BiomarkerCardHeader';
import BiomarkerValueDisplay from './cards/BiomarkerValueDisplay';
import BiomarkerCardFooter from './cards/BiomarkerCardFooter';

const BiomarkerCard: React.FC<BiomarkerCardProps> = ({ biomarker, onSelectBiomarker }) => {
  return (
    <motion.div
      key={biomarker.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="biomarker-card p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
    >
      <BiomarkerCardHeader biomarker={biomarker} />
      <BiomarkerValueDisplay biomarker={biomarker} />
      <BiomarkerCardFooter 
        biomarker={biomarker} 
        onSelectBiomarker={onSelectBiomarker} 
      />
    </motion.div>
  );
};

export default BiomarkerCard;

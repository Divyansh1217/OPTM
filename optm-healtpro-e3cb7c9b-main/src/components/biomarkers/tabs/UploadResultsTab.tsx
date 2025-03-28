
import React from 'react';
import { motion } from 'framer-motion';
import { Biomarker } from '@/data/mockBiomarkerData';
import BiomarkerUpload from '@/components/biomarkers/BiomarkerUpload';
import BiomarkerHowItWorks from '@/components/biomarkers/BiomarkerHowItWorks';

interface UploadResultsTabProps {
  onProcessComplete: (newBiomarker: Biomarker) => void;
}

const UploadResultsTab: React.FC<UploadResultsTabProps> = ({ onProcessComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BiomarkerUpload onProcessComplete={onProcessComplete} />
        <BiomarkerHowItWorks />
      </div>
    </motion.div>
  );
};

export default UploadResultsTab;

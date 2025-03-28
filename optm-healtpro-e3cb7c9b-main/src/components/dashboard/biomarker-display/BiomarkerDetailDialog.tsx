
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BiomarkerDetailDialogProps } from './types';
import DialogHeader from './dialog/DialogHeader';
import BiomarkerBasicInfo from './dialog/BiomarkerBasicInfo';
import BiomarkerExplanation from './dialog/BiomarkerExplanation';
import MusclesAffected from './dialog/MusclesAffected';
import PossibleCauses from './dialog/PossibleCauses';
import Recommendations from './dialog/Recommendations';
import DisclaimerFooter from './dialog/DisclaimerFooter';

const BiomarkerDetailDialog: React.FC<BiomarkerDetailDialogProps> = ({ 
  biomarker, 
  open, 
  onOpenChange 
}) => {
  if (!biomarker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6 biomarker-dialog-content">
        <DialogHeader biomarker={biomarker} />
        
        <div className="space-y-4 md:space-y-6 py-4 md:py-6 biomarker-dialog-section overflow-container">
          <BiomarkerBasicInfo biomarker={biomarker} />
          <BiomarkerExplanation biomarker={biomarker} />
          <MusclesAffected biomarker={biomarker} />
          <PossibleCauses biomarker={biomarker} />
          <Recommendations biomarker={biomarker} />
          <DisclaimerFooter />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BiomarkerDetailDialog;

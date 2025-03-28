
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Biomarker } from '../types';

interface BiomarkerCardFooterProps {
  biomarker: Biomarker;
  onSelectBiomarker: (biomarker: Biomarker) => void;
}

const BiomarkerCardFooter: React.FC<BiomarkerCardFooterProps> = ({ 
  biomarker, 
  onSelectBiomarker 
}) => {
  return (
    <CardFooter className="px-0 mt-3 pt-3 border-t">
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between"
        onClick={() => onSelectBiomarker(biomarker)}
      >
        View Details
        <ChevronRight className="h-4 w-4" />
      </Button>
    </CardFooter>
  );
};

export default BiomarkerCardFooter;

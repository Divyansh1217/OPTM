
import React, { useState } from 'react';
import BiomarkerCard from './BiomarkerCard';
import BiomarkerDetailDialog from './BiomarkerDetailDialog';
import EmptyBiomarkerState from './EmptyBiomarkerState';
import { Biomarker } from './types';
import { CardGrid } from '@/components/ui/card-grid';

interface BiomarkerDisplayContainerProps {
  biomarkers: Biomarker[];
}

const BiomarkerDisplayContainer: React.FC<BiomarkerDisplayContainerProps> = ({ biomarkers }) => {
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);

  if (!biomarkers || biomarkers.length === 0) {
    return <EmptyBiomarkerState />;
  }

  return (
    <>
      <CardGrid columns="responsive" gap="md">
        {biomarkers.map((biomarker) => (
          <BiomarkerCard 
            key={biomarker.id}
            biomarker={biomarker} 
            onSelectBiomarker={setSelectedBiomarker} 
          />
        ))}
      </CardGrid>

      <BiomarkerDetailDialog 
        biomarker={selectedBiomarker} 
        open={!!selectedBiomarker} 
        onOpenChange={(open) => !open && setSelectedBiomarker(null)} 
      />
    </>
  );
};

export default BiomarkerDisplayContainer;

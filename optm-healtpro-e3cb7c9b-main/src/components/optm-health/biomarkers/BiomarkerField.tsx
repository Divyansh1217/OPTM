
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MusculoskeletalBiomarkers, BIOMARKER_REFERENCE_RANGES } from '@/types/optm-health';

interface BiomarkerFieldProps {
  biomarker: keyof MusculoskeletalBiomarkers;
  value?: number;
  previousValue?: number;
  onChange: (biomarker: keyof MusculoskeletalBiomarkers, value: string) => void;
}

const BiomarkerField: React.FC<BiomarkerFieldProps> = ({ 
  biomarker, 
  value, 
  previousValue,
  onChange 
}) => {
  const getBiomarkerLabel = (key: keyof MusculoskeletalBiomarkers): string => {
    const labels: Record<keyof MusculoskeletalBiomarkers, string> = {
      crp: 'C-Reactive Protein (CRP)',
      il6: 'Interleukin-6 (IL-6)',
      tnfAlpha: 'Tumor Necrosis Factor Alpha (TNF-α)',
      mda: 'Malondialdehyde (MDA)',
      vegf: 'Vascular Endothelial Growth Factor (VEGF)',
      tgfBeta: 'Transforming Growth Factor Beta (TGF-β)',
      comp: 'Cartilage Oligomeric Matrix Protein (COMP)',
      mmp9: 'Matrix Metalloproteinase-9 (MMP-9)',
      mmp13: 'Matrix Metalloproteinase-13 (MMP-13)',
      ckMm: 'Creatine Kinase MM (CK-MM)',
      bdnf: 'Brain-Derived Neurotrophic Factor (BDNF)',
      substanceP: 'Substance P',
      dDimer: 'D-Dimer',
      fourHyp: '4-Hydroxyproline',
      aldolase: 'Aldolase',
      calciumPhosphorusRatio: 'Calcium to Phosphorus Ratio'
    };
    
    return labels[key];
  };
  
  const getUnit = (biomarker: keyof MusculoskeletalBiomarkers): string => {
    return BIOMARKER_REFERENCE_RANGES[biomarker]?.unit || '';
  };
  
  const getReferenceRange = (biomarker: keyof MusculoskeletalBiomarkers): string => {
    const range = BIOMARKER_REFERENCE_RANGES[biomarker];
    if (range) {
      return `${range.min} - ${range.max} ${range.unit}`;
    }
    return '';
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(biomarker, e.target.value);
  };

  // Calculate improvement percentage if both values exist
  const getImprovementPercentage = (): string | null => {
    if (value !== undefined && previousValue !== undefined && previousValue !== 0) {
      // Determine if decrease or increase indicates improvement
      const decreaseImprovement = ['crp', 'il6', 'tnfAlpha', 'mda', 'comp', 'mmp9', 'mmp13', 'substanceP', 'dDimer'];
      const increaseImprovement = ['vegf', 'tgfBeta', 'bdnf'];
      
      let percentage: number = 0;
      
      if (decreaseImprovement.includes(biomarker)) {
        // For markers where a decrease is an improvement
        percentage = ((previousValue - value) / previousValue) * 100;
      } else if (increaseImprovement.includes(biomarker)) {
        // For markers where an increase is an improvement
        percentage = ((value - previousValue) / previousValue) * 100;
      }
      
      if (percentage > 0) {
        return `+${percentage.toFixed(1)}%`;
      } else {
        return `${percentage.toFixed(1)}%`;
      }
    }
    return null;
  };
  
  const improvementPercentage = getImprovementPercentage();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={`biomarker-${biomarker}`}>{getBiomarkerLabel(biomarker)}</Label>
        {improvementPercentage && (
          <span className={`text-sm font-medium px-2 py-1 rounded ${parseFloat(improvementPercentage) > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
            {improvementPercentage}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <Input
          id={`biomarker-${biomarker}`}
          type="number"
          step="0.01" 
          value={value ?? ''}
          onChange={handleChange}
          placeholder={`Enter value (${getUnit(biomarker)})`}
        />
        <p className="text-xs text-muted-foreground">
          Reference range: {getReferenceRange(biomarker)}
        </p>
      </div>
    </div>
  );
};

export default BiomarkerField;

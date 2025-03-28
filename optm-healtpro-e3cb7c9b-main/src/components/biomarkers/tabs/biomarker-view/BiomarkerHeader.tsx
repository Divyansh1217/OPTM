
import React from 'react';
import { TestTube, Calendar } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import BiomarkerFilter from './BiomarkerFilter';

interface BiomarkerHeaderProps {
  latestUpdate: string;
  totalBiomarkers: number;
  normalCount: number;
  elevatedCount: number;
  lowCount: number;
  criticalCount: number;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const BiomarkerHeader: React.FC<BiomarkerHeaderProps> = ({
  latestUpdate,
  totalBiomarkers,
  normalCount,
  elevatedCount,
  lowCount,
  criticalCount,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-primary" />
          Your Biomarker Data
        </CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Calendar className="h-3 w-3" />
          Last updated: {latestUpdate}
        </CardDescription>
      </div>
      
      <BiomarkerFilter
        totalBiomarkers={totalBiomarkers}
        normalCount={normalCount}
        elevatedCount={elevatedCount}
        lowCount={lowCount}
        criticalCount={criticalCount}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  );
};

export default BiomarkerHeader;

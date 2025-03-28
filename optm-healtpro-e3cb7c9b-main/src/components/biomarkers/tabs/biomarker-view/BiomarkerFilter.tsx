
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BiomarkerFilterProps {
  totalBiomarkers: number;
  normalCount: number;
  elevatedCount: number;
  lowCount: number;
  criticalCount: number;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const BiomarkerFilter: React.FC<BiomarkerFilterProps> = ({
  totalBiomarkers,
  normalCount,
  elevatedCount,
  lowCount,
  criticalCount,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge 
        variant={filterStatus === 'all' ? "default" : "outline"} 
        className="cursor-pointer" 
        onClick={() => setFilterStatus('all')}
      >
        All ({totalBiomarkers})
      </Badge>
      
      <Badge 
        variant={filterStatus === 'normal' ? "default" : "outline"} 
        className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200" 
        onClick={() => setFilterStatus('normal')}
      >
        Normal ({normalCount})
      </Badge>
      
      <Badge 
        variant={filterStatus === 'elevated' ? "default" : "outline"} 
        className="cursor-pointer bg-yellow-100 text-yellow-800 hover:bg-yellow-200" 
        onClick={() => setFilterStatus('elevated')}
      >
        Elevated ({elevatedCount})
      </Badge>
      
      <Badge 
        variant={filterStatus === 'low' ? "default" : "outline"} 
        className="cursor-pointer bg-blue-100 text-blue-800 hover:bg-blue-200" 
        onClick={() => setFilterStatus('low')}
      >
        Low ({lowCount})
      </Badge>
      
      {criticalCount > 0 && (
        <Badge 
          variant={filterStatus === 'critical' ? "default" : "outline"} 
          className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200" 
          onClick={() => setFilterStatus('critical')}
        >
          Critical ({criticalCount})
        </Badge>
      )}
    </div>
  );
};

export default BiomarkerFilter;

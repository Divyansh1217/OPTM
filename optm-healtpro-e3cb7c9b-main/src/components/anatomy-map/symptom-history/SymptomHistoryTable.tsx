
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { BodyRegion, PainSymptom } from '../types';
import SymptomTableRow from './SymptomTableRow';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

interface SymptomHistoryTableProps {
  symptoms: PainSymptom[];
  bodyRegions: BodyRegion[];
  onToggleActive: (symptomId: string, isActive: boolean) => void;
  loading: boolean;
  onViewDetails: (symptom: PainSymptom) => void;
  onEditClick: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
}

const SymptomHistoryTable: React.FC<SymptomHistoryTableProps> = ({
  symptoms,
  bodyRegions,
  onToggleActive,
  loading,
  onViewDetails,
  onEditClick,
  onDeleteSymptom
}) => {
  const getRegionName = (regionId: string): string => {
    return bodyRegions.find(region => region.id === regionId)?.name || regionId;
  };
  
  const handleToggleActive = (symptom: PainSymptom) => {
    onToggleActive(symptom.id, !symptom.isActive);
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (symptoms.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Active</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Added</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {symptoms.map((symptom) => (
            <SymptomTableRow
              key={symptom.id}
              symptom={symptom}
              getRegionName={getRegionName}
              onToggleActive={handleToggleActive}
              onViewDetails={onViewDetails}
              onEditClick={onEditClick}
              onDeleteSymptom={onDeleteSymptom}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SymptomHistoryTable;

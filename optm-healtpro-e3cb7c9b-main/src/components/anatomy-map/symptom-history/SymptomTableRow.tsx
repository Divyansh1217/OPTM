
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { BodyRegion, PainSymptom, painSeverityOptions } from '../types';
import { format } from 'date-fns';
import SymptomActionsMenu from './SymptomActionsMenu';

interface SymptomTableRowProps {
  symptom: PainSymptom;
  getRegionName: (regionId: string) => string;
  onToggleActive: (symptom: PainSymptom) => void;
  onViewDetails: (symptom: PainSymptom) => void;
  onEditClick: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
}

const SymptomTableRow: React.FC<SymptomTableRowProps> = ({
  symptom,
  getRegionName,
  onToggleActive,
  onViewDetails,
  onEditClick,
  onDeleteSymptom
}) => {
  const getSeverityBadge = (severity: 'mild' | 'moderate' | 'severe') => {
    const severityOption = painSeverityOptions.find(option => option.value === severity);
    
    const colorClass = 
      severity === 'severe' ? 'bg-red-500 hover:bg-red-600' : 
      severity === 'moderate' ? 'bg-orange-500 hover:bg-orange-600' : 
      'bg-yellow-500 hover:bg-yellow-600';
    
    return (
      <Badge className={colorClass}>
        {severityOption?.label || severity}
      </Badge>
    );
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <TableRow key={symptom.id} className="symptom-table-row">
      <TableCell className="symptom-table-cell">
        <Switch 
          checked={symptom.isActive} 
          onCheckedChange={() => onToggleActive(symptom)}
          className="symptom-switch"
        />
      </TableCell>
      <TableCell className="font-medium symptom-table-cell">{getRegionName(symptom.bodyRegionId)}</TableCell>
      <TableCell className="symptom-table-cell">{getSeverityBadge(symptom.severity)}</TableCell>
      <TableCell className="symptom-table-cell">{symptom.painType}</TableCell>
      <TableCell className="symptom-table-cell">{formatDate(symptom.createdAt)}</TableCell>
      <TableCell className="symptom-table-cell">{formatDate(symptom.updatedAt)}</TableCell>
      <TableCell className="text-right symptom-table-cell">
        <SymptomActionsMenu
          symptom={symptom}
          onViewDetails={onViewDetails}
          onEditClick={onEditClick}
          onDeleteSymptom={onDeleteSymptom}
        />
      </TableCell>
    </TableRow>
  );
};

export default SymptomTableRow;

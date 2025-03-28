
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Search 
} from 'lucide-react';
import { PainSymptom } from '../types';

interface SymptomActionsMenuProps {
  symptom: PainSymptom;
  onViewDetails: (symptom: PainSymptom) => void;
  onEditClick: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
}

const SymptomActionsMenu: React.FC<SymptomActionsMenuProps> = ({
  symptom,
  onViewDetails,
  onEditClick,
  onDeleteSymptom
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="symptom-action-button">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(symptom)}>
          <Search className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditClick(symptom)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDeleteSymptom(symptom.id)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SymptomActionsMenu;

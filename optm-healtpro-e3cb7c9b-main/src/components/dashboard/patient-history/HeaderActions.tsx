
import React from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderActionsProps {
  onClose: () => void;
  onDelete: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ onClose, onDelete }) => {
  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" onClick={onClose} className="flex items-center p-2">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Patients
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 className="h-4 w-4 mr-1" />
        Delete Record
      </Button>
    </div>
  );
};

export default HeaderActions;

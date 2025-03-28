
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface AppointmentDialogActionsProps {
  isLoading: boolean;
  onClose: () => void;
  submitLabel: string;
}

const AppointmentDialogActions: React.FC<AppointmentDialogActionsProps> = ({
  isLoading,
  onClose,
  submitLabel
}) => {
  return (
    <DialogFooter className="pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : submitLabel}
      </Button>
    </DialogFooter>
  );
};

export default AppointmentDialogActions;


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { BodyRegion, PainSymptom, painSeverityOptions, painTypeOptions } from './types';

interface SymptomDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  symptom: PainSymptom;
  region: BodyRegion;
}

const SymptomDetailsDialog: React.FC<SymptomDetailsDialogProps> = ({
  open,
  onClose,
  symptom,
  region
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP p');
    } catch (e) {
      return dateString;
    }
  };

  const getSeverityLabel = (severity: string) => {
    const option = painSeverityOptions.find(opt => opt.value === severity);
    return option?.label || severity;
  };

  const getPainTypeLabel = (painType: string) => {
    const option = painTypeOptions.find(opt => opt.value === painType);
    return option?.label || painType;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-500 text-white';
      case 'moderate': return 'bg-orange-500 text-white';
      default: return 'bg-yellow-500 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            {region.name} - {getPainTypeLabel(symptom.painType)} Pain
          </DialogTitle>
          <DialogClose className="h-8 w-8 rounded-full" onClick={onClose}>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={getSeverityColor(symptom.severity)}>
              {getSeverityLabel(symptom.severity)} Pain
            </Badge>
            <Badge variant="outline">
              {symptom.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
            <p className="text-sm">{symptom.description || 'No description provided.'}</p>
          </div>

          {symptom.triggers && symptom.triggers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Triggers</h4>
              <div className="flex flex-wrap gap-1.5">
                {symptom.triggers.map((trigger, index) => (
                  <Badge key={index} variant="secondary">{trigger}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
              <p className="text-sm">{formatDate(symptom.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
              <p className="text-sm">{formatDate(symptom.updatedAt)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SymptomDetailsDialog;

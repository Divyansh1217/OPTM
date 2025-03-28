
export interface PatientHistoryProps {
  patient: any;
  onClose: () => void;
  onUpdate: (patient: any) => void;
}

export interface RecordFormData {
  name: string;
  date: string;
  type: string;
  notes: string;
  file: File | null;
}

export interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export interface AddRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recordType: string;
  recordForm: RecordFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  onSubmit: () => void;
}


import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AddRecordDialogProps } from './types';

const AddRecordDialog: React.FC<AddRecordDialogProps> = ({
  open,
  onOpenChange,
  recordType,
  recordForm,
  onInputChange,
  onFileChange,
  onSelectChange,
  onSubmit
}) => {
  const getDialogTitle = () => {
    switch (recordType) {
      case 'xray': return 'X-Ray or Scan';
      case 'bloodTest': return 'Blood Test';
      case 'medication': return 'Medication';
      case 'clinicalNote': return 'Clinical Note';
      default: return 'Biomarker';
    }
  };

  const getNamePlaceholder = () => {
    switch (recordType) {
      case 'xray': return 'e.g., Left Shoulder X-Ray';
      case 'bloodTest': return 'e.g., Complete Blood Count';
      case 'medication': return 'e.g., Ibuprofen';
      case 'clinicalNote': return 'e.g., Initial Assessment';
      default: return 'e.g., Cholesterol';
    }
  };

  const handleSubmitButtonClick = () => {
    // Validate required fields before submission
    if (!recordForm.name || !recordForm.date) {
      // You could add more specific validation here
      alert('Please fill in all required fields');
      return;
    }
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add {getDialogTitle()}</DialogTitle>
          <DialogDescription>
            Enter details for the new medical record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Record Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={recordForm.name}
              onChange={onInputChange}
              placeholder={getNamePlaceholder()}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <Input
              id="date"
              name="date"
              type="date"
              value={recordForm.date}
              onChange={onInputChange}
              required
            />
          </div>

          {(recordType === 'xray' || recordType === 'bloodTest') && (
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Record Type
              </label>
              <Select value={recordForm.type} onValueChange={onSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {recordType === 'xray' ? (
                    <>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ct">CT Scan</SelectItem>
                      <SelectItem value="ultrasound">Ultrasound</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="cbc">Complete Blood Count</SelectItem>
                      <SelectItem value="lipid">Lipid Panel</SelectItem>
                      <SelectItem value="metabolic">Metabolic Panel</SelectItem>
                      <SelectItem value="thyroid">Thyroid Function</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notes
            </label>
            <Textarea
              id="notes"
              name="notes"
              value={recordForm.notes}
              onChange={onInputChange}
              rows={3}
              placeholder="Add any relevant notes here..."
            />
          </div>

          {(recordType === 'xray' || recordType === 'bloodTest') && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload File
              </label>
              <div className="border-2 border-dashed rounded-md p-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {recordForm.file ? recordForm.file.name : 'Click to browse or drag and drop'}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Plus className="h-4 w-4 mr-1" />
                    {recordForm.file ? 'Change File' : 'Select File'}
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={onFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitButtonClick}>
            Add Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordDialog;

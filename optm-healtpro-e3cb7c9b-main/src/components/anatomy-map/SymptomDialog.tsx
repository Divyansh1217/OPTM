
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BodyRegion, PainSymptom, painSeverityOptions, painTypeOptions } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';

interface SymptomDialogProps {
  open: boolean;
  onClose: () => void;
  selectedRegion: BodyRegion | null;
  existingSymptom?: PainSymptom | null;
  isEditMode?: boolean;
  bodyRegions: BodyRegion[];
  existingSymptoms: PainSymptom[];
  onAddSymptom: (symptom: PainSymptom) => void;
  onUpdateSymptom: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
  loading: boolean;
}

const formSchema = z.object({
  severity: z.enum(['mild', 'moderate', 'severe']),
  painType: z.string().min(1, { message: 'Pain type is required' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }).max(500),
  triggers: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SymptomDialog: React.FC<SymptomDialogProps> = ({
  open,
  onClose,
  selectedRegion,
  existingSymptom = null,
  isEditMode = false,
  onAddSymptom,
  onUpdateSymptom,
  onDeleteSymptom,
  loading,
  bodyRegions,
  existingSymptoms
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      severity: 'mild',
      painType: '',
      description: '',
      triggers: '',
    }
  });

  // Reset form when dialog opens with existing data or new form
  useEffect(() => {
    if (open) {
      if (existingSymptom && isEditMode) {
        form.reset({
          severity: existingSymptom.severity,
          painType: existingSymptom.painType,
          description: existingSymptom.description,
          triggers: existingSymptom.triggers?.join(', ') || '',
        });
      } else {
        form.reset({
          severity: 'mild',
          painType: '',
          description: '',
          triggers: '',
        });
      }
    }
  }, [open, existingSymptom, isEditMode, form]);

  const onSubmit = (values: FormValues) => {
    const triggers = values.triggers ? values.triggers.split(',').map(t => t.trim()).filter(Boolean) : [];
    
    if (isEditMode && existingSymptom) {
      // Update existing symptom
      const updatedSymptom: PainSymptom = {
        ...existingSymptom,
        severity: values.severity,
        painType: values.painType,
        description: values.description,
        triggers,
        updatedAt: new Date().toISOString(),
      };
      onUpdateSymptom(updatedSymptom);
    } else if (selectedRegion) {
      // Add new symptom
      const newSymptom: PainSymptom = {
        id: uuidv4(),
        bodyRegionId: selectedRegion.id,
        severity: values.severity,
        painType: values.painType,
        description: values.description,
        triggers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };
      onAddSymptom(newSymptom);
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (existingSymptom) {
      onDeleteSymptom(existingSymptom.id);
      onClose();
    }
  };

  if (!selectedRegion) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="p-6 pb-2">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <div className="flex items-center">
                {isEditMode ? 'Edit Symptom' : 'Add New Symptom'}
                <span className="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                  {selectedRegion.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className="h-7 w-7 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                        Pain Severity
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[60]">
                          {painSeverityOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                <span className={`h-2 w-2 rounded-full ${option.color} mr-2`}></span>
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="painType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                        Pain Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select pain type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[60]">
                          {painTypeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your pain or discomfort..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="triggers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                      Triggers (Comma separated)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Walking, Sitting, After exercise"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2 pt-4 mt-4">
                {isEditMode && (
                  <Button 
                    variant="destructive" 
                    type="button" 
                    onClick={handleDelete}
                    className="mr-auto"
                  >
                    Delete
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={loading}
                >
                  {isEditMode ? 'Update' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SymptomDialog;

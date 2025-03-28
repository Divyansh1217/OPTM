
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Hotspot } from './types';

interface HotspotFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hotspot: Partial<Hotspot>) => void;
  position: { x: number; y: number } | null;
}

const HotspotForm: React.FC<HotspotFormProps> = ({
  isOpen,
  onClose,
  onSave,
  position
}) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'normal' | 'warning' | 'critical'>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!position) return;
    
    const hotspotData: Partial<Hotspot> = {
      x: position.x,
      y: position.y,
      z: 0,
      label,
      description,
      status,
      color: status === 'critical' ? '#FF4D4F' : 
             status === 'warning' ? '#FAAD14' : '#52C41A',
    };
    
    onSave(hotspotData);
    
    // Reset form
    setLabel('');
    setDescription('');
    setStatus('normal');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Add New Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="label" className="font-medium text-gray-800 dark:text-gray-200">Area/Muscle Name</Label>
            <Input 
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Deltoid Muscle"
              required
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 h-10"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description" className="font-medium text-gray-800 dark:text-gray-200">Description</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue or condition"
              required
              className="min-h-[100px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 resize-none"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status" className="font-medium text-gray-800 dark:text-gray-200">Severity</Label>
            <Select 
              value={status} 
              onValueChange={(value: 'normal' | 'warning' | 'critical') => setStatus(value)}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 h-10">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <SelectItem value="normal" className="hover:bg-gray-100 dark:hover:bg-gray-800">Normal</SelectItem>
                <SelectItem value="warning" className="hover:bg-gray-100 dark:hover:bg-gray-800">Warning</SelectItem>
                <SelectItem value="critical" className="hover:bg-gray-100 dark:hover:bg-gray-800">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="sm:justify-end pt-4 mt-2 border-t dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600 dark:text-gray-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HotspotForm;

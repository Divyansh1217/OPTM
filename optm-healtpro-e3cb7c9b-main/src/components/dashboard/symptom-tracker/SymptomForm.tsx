
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PainLevelSelector from './PainLevelSelector';
import BodyRegionSelect from './BodyRegionSelect';
import { SymptomFormProps } from './types';

const SymptomForm: React.FC<SymptomFormProps> = ({
  newSymptom,
  handleInputChange,
  handleSelectChange,
  handlePainLevelChange,
  handleSubmit,
  setOpen
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="symptomName">Symptom Name</Label>
        <Input 
          id="symptomName" 
          name="symptomName" 
          value={newSymptom.symptomName || ''} 
          onChange={handleInputChange} 
          placeholder="E.g., Headache, Back Pain, etc."
        />
      </div>
      
      <div className="space-y-2">
        <Label>Pain Level (1-10)</Label>
        <PainLevelSelector 
          painLevel={newSymptom.painLevel || 1} 
          onChange={handlePainLevelChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <BodyRegionSelect 
          location={newSymptom.location} 
          onChange={handleSelectChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={newSymptom.notes || ''} 
          onChange={handleInputChange} 
          placeholder="Additional details about your symptoms..."
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">
          Save Symptom
        </Button>
      </div>
    </form>
  );
};

export default SymptomForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { ImagingData } from '@/types/optm-health';

interface ImagingTabProps {
  imaging: ImagingData[];
  onAddImage: () => void;
  onRemoveImage: (id: string) => void;
  onUpdateImage: (id: string, field: keyof ImagingData, value: any) => void;
  errors?: string[]; // Added errors prop
}

const ImagingTab: React.FC<ImagingTabProps> = ({
  imaging,
  onAddImage,
  onRemoveImage,
  onUpdateImage,
  errors = [] // Default to empty array
}) => {
  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Imaging Data</h3>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onAddImage}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>
      
      {imaging.length === 0 && (
        <div className="text-center p-6 border rounded-md">
          <p className="text-muted-foreground">No imaging data added yet. Click "Add Image" to get started.</p>
        </div>
      )}
      
      {imaging.map((image) => (
        <div key={image.id} className="border rounded-md p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Image Details</h4>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              onClick={() => onRemoveImage(image.id)}
            >
              <Trash className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`image-type-${image.id}`}>Image Type</Label>
              <Select
                value={image.type}
                onValueChange={(value: 'x-ray' | 'mri' | 'ct' | 'ultrasound') => 
                  onUpdateImage(image.id, 'type', value)
                }
              >
                <SelectTrigger id={`image-type-${image.id}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="ct">CT Scan</SelectItem>
                  <SelectItem value="ultrasound">Ultrasound</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`body-part-${image.id}`}>Body Part</Label>
              <Input 
                id={`body-part-${image.id}`}
                value={image.bodyPart} 
                onChange={(e) => onUpdateImage(image.id, 'bodyPart', e.target.value)}
                placeholder="e.g., Knee, Spine, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`image-url-${image.id}`}>Image URL</Label>
              <Input 
                id={`image-url-${image.id}`}
                value={image.imageUrl} 
                onChange={(e) => onUpdateImage(image.id, 'imageUrl', e.target.value)}
                placeholder="Enter image URL or path"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`image-date-${image.id}`}>Date</Label>
              <Input 
                id={`image-date-${image.id}`}
                type="date"
                value={image.date.split('T')[0]} 
                onChange={(e) => onUpdateImage(image.id, 'date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`image-stage-${image.id}`}>Stage</Label>
              <Select
                value={image.stage}
                onValueChange={(value: 'pre-treatment' | 'post-treatment' | 'follow-up') => 
                  onUpdateImage(image.id, 'stage', value)
                }
              >
                <SelectTrigger id={`image-stage-${image.id}`}>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-treatment">Pre-Treatment</SelectItem>
                  <SelectItem value="post-treatment">Post-Treatment</SelectItem>
                  <SelectItem value="follow-up">Follow-Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`image-notes-${image.id}`}>Notes</Label>
              <Textarea 
                id={`image-notes-${image.id}`}
                value={image.notes || ''} 
                onChange={(e) => onUpdateImage(image.id, 'notes', e.target.value)}
                placeholder="Enter notes about the image findings"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagingTab;

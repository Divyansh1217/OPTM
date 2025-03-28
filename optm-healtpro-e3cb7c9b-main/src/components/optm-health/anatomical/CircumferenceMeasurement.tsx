
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash } from 'lucide-react';

interface MeasurementBase {
  value: number;
  unit: 'cm' | 'mm';
  location: string;
}

interface SidedMeasurement extends MeasurementBase {
  side: 'left' | 'right' | 'bilateral';
}

type CircumferenceMeasurementType = 'ccm' | 'cap' | 'cbp';

interface CircumferenceMeasurementProps {
  type: CircumferenceMeasurementType;
  index: number;
  measurement: MeasurementBase | SidedMeasurement;
  onChange: (type: CircumferenceMeasurementType, index: number, field: string, value: any) => void;
  onRemove: (type: CircumferenceMeasurementType, index: number) => void;
  hasSide?: boolean;
}

const CircumferenceMeasurement: React.FC<CircumferenceMeasurementProps> = ({
  type,
  index,
  measurement,
  onChange,
  onRemove,
  hasSide = false
}) => {
  return (
    <div className={`grid grid-cols-1 ${hasSide ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 mb-4 border-b pb-4`}>
      <div className="space-y-2">
        <Label htmlFor={`${type}-value-${index}`}>Value</Label>
        <div className="flex gap-2">
          <Input 
            id={`${type}-value-${index}`}
            type="number"
            step="0.1"
            value={measurement.value} 
            onChange={(e) => onChange(type, index, 'value', e.target.value)}
            placeholder="Value"
          />
          <Select
            value={measurement.unit}
            onValueChange={(value: 'cm' | 'mm') => 
              onChange(type, index, 'unit', value)
            }
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="mm">mm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasSide && 'side' in measurement && (
        <div className="space-y-2">
          <Label htmlFor={`${type}-side-${index}`}>Side</Label>
          <Select
            value={measurement.side}
            onValueChange={(value: 'left' | 'right' | 'bilateral') => 
              onChange(type, index, 'side', value)
            }
          >
            <SelectTrigger id={`${type}-side-${index}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="bilateral">Bilateral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor={`${type}-location-${index}`}>Location</Label>
        <Input 
          id={`${type}-location-${index}`}
          value={measurement.location} 
          onChange={(e) => onChange(type, index, 'location', e.target.value)}
          placeholder={type === 'ccm' ? 'e.g., C3-C4' : type === 'cap' ? 'e.g., Mid-arm' : 'e.g., Upper brachial'}
        />
      </div>
      
      <div className="flex items-end">
        <Button 
          type="button" 
          variant="destructive" 
          size="sm" 
          onClick={() => onRemove(type, index)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CircumferenceMeasurement;

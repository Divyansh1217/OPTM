
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
import { Plus, Trash } from 'lucide-react';
import { AnatomicalMeasurements } from '@/types/optm-health';

type CircumferenceType = 'ccm' | 'cap' | 'cbp';

type Measurement = {
  value: number;
  unit: 'cm' | 'mm';
  location: string;
  side?: 'left' | 'right' | 'bilateral';
};

interface CircumferenceMeasurementSectionProps {
  type: CircumferenceType;
  title: string;
  measurements: Measurement[];
  previousMeasurements?: Measurement[];
  onChange: (type: CircumferenceType, index: number, field: string, value: any) => void;
  onRemove: (type: CircumferenceType, index: number) => void;
  onAdd: (type: CircumferenceType) => void;
  hasSide?: boolean;
}

const CircumferenceMeasurementSection: React.FC<CircumferenceMeasurementSectionProps> = ({
  type,
  title,
  measurements,
  previousMeasurements,
  onChange,
  onRemove,
  onAdd,
  hasSide = false
}) => {
  // Helper function to find matching previous measurement
  const findPreviousMeasurement = (current: Measurement, index: number): Measurement | undefined => {
    if (!previousMeasurements) return undefined;
    
    // First try to match by location and side
    if (hasSide && current.side) {
      const match = previousMeasurements.find(
        prev => prev.location === current.location && prev.side === current.side
      );
      if (match) return match;
    }
    
    // Then try to match by location only
    const locationMatch = previousMeasurements.find(
      prev => prev.location === current.location
    );
    if (locationMatch) return locationMatch;
    
    // Finally, fall back to same index if available
    return previousMeasurements[index];
  };
  
  // Calculate improvement percentage
  const getImprovement = (current: Measurement, index: number): string | null => {
    const previous = findPreviousMeasurement(current, index);
    
    if (current.value !== undefined && previous?.value !== undefined && previous.value !== 0) {
      // For arm/muscle measurements (cap), an increase typically indicates improvement
      // For other measurements (ccm, cbp), a decrease may indicate improvement (reduced inflammation)
      const isGrowthPositive = type === 'cap';
      
      let percentage: number;
      if (isGrowthPositive) {
        // For muscle measurements, growth is good
        percentage = ((current.value - previous.value) / previous.value) * 100;
      } else {
        // For other measurements, reduction is good
        percentage = ((previous.value - current.value) / previous.value) * 100;
      }
      
      if (percentage > 0) {
        return `+${percentage.toFixed(1)}%`;
      } else {
        return `${percentage.toFixed(1)}%`;
      }
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => onAdd(type)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Measurement
        </Button>
      </div>
      
      {measurements.length === 0 ? (
        <p className="text-muted-foreground text-sm">No measurements added yet.</p>
      ) : (
        measurements.map((measurement, index) => {
          const improvement = getImprovement(measurement, index);
          
          return (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Measurement {index + 1}</h4>
                {improvement && (
                  <span className={`text-sm font-medium px-2 py-1 rounded ${parseFloat(improvement) > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                    {improvement}
                  </span>
                )}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemove(type, index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value</Label>
                  <div className="flex space-x-2">
                    <Input 
                      type="number"
                      step="0.1"
                      value={measurement.value || ''} 
                      onChange={(e) => onChange(type, index, 'value', parseFloat(e.target.value) || 0)}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Select
                      value={measurement.unit}
                      onValueChange={(value: 'cm' | 'mm') => 
                        onChange(type, index, 'unit', value)
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    value={measurement.location || ''} 
                    onChange={(e) => onChange(type, index, 'location', e.target.value)}
                    placeholder="E.g., C3-C4"
                  />
                </div>
                
                {hasSide && (
                  <div className="space-y-2">
                    <Label>Side</Label>
                    <Select
                      value={measurement.side}
                      onValueChange={(value: 'left' | 'right' | 'bilateral') => 
                        onChange(type, index, 'side', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select side" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="bilateral">Bilateral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CircumferenceMeasurementSection;

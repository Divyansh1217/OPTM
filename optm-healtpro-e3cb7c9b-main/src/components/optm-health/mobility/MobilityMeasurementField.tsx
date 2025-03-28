
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MobilityMeasurements } from '@/types/optm-health';

interface MobilityMeasurementFieldProps {
  label: string;
  measurement: keyof MobilityMeasurements;
  value?: any;
  previousValue?: any;
  normalRange: string;
  onChange: (measurement: keyof MobilityMeasurements, field: string, value: any) => void;
  hasSide?: boolean;
  hasDirection?: boolean;
  isIncreaseImprovement?: boolean;
}

const MobilityMeasurementField: React.FC<MobilityMeasurementFieldProps> = ({
  label,
  measurement,
  value,
  previousValue,
  normalRange,
  onChange,
  hasSide = false,
  hasDirection = false,
  isIncreaseImprovement = true
}) => {
  // Calculate improvement percentage
  const getImprovement = (): string | null => {
    if (value?.value !== undefined && previousValue?.value !== undefined && previousValue.value !== 0) {
      let percentage: number;
      
      if (isIncreaseImprovement) {
        // For measurements where increase is improvement (e.g., range of motion)
        percentage = ((value.value - previousValue.value) / previousValue.value) * 100;
      } else {
        // For measurements where decrease is improvement (e.g., pelvic tilt)
        percentage = ((previousValue.value - value.value) / previousValue.value) * 100;
      }
      
      if (percentage > 0) {
        return `+${percentage.toFixed(1)}%`;
      } else {
        return `${percentage.toFixed(1)}%`;
      }
    }
    return null;
  };
  
  const improvementPercentage = getImprovement();
  
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {improvementPercentage && (
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            parseFloat(improvementPercentage) > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
          }`}>
            {improvementPercentage}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Value (degrees)</Label>
          <Input 
            type="number"
            step="1"
            value={value?.value || ''} 
            onChange={(e) => onChange(measurement, 'value', parseInt(e.target.value) || undefined)}
            placeholder="Enter value in degrees"
          />
          <p className="text-xs text-muted-foreground">Normal range: {normalRange}</p>
        </div>
        
        {hasSide && (
          <div className="space-y-2">
            <Label>Side</Label>
            <Select
              value={value?.side}
              onValueChange={(selectedValue: 'left' | 'right' | 'bilateral') => 
                onChange(measurement, 'side', selectedValue)
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
        
        {hasDirection && (
          <div className="space-y-2">
            <Label>Direction</Label>
            <Select
              value={value?.direction}
              onValueChange={(selectedValue: 'left' | 'right') => 
                onChange(measurement, 'direction', selectedValue)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilityMeasurementField;

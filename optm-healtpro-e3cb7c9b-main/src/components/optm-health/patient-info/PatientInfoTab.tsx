
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
import { TreatmentStage } from '@/types/optm-health';

interface PatientInfoTabProps {
  patientId: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  treatmentStage?: TreatmentStage;
  onPatientInfoChange: (field: string, value: any) => void;
  errors?: string[]; // Added errors prop
}

const PatientInfoTab: React.FC<PatientInfoTabProps> = ({
  patientId,
  name,
  age,
  gender,
  treatmentStage,
  onPatientInfoChange,
  errors = [] // Default to empty array
}) => {
  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient ID</Label>
          <Input 
            id="patientId" 
            value={patientId} 
            onChange={(e) => onPatientInfoChange('patientId', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => onPatientInfoChange('name', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age" 
            type="number"
            value={age || ''} 
            onChange={(e) => onPatientInfoChange('age', parseInt(e.target.value) || undefined)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={gender}
            onValueChange={(value: 'male' | 'female' | 'other') => 
              onPatientInfoChange('gender', value)
            }
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="treatmentStage">Treatment Stage</Label>
          <Select
            value={treatmentStage}
            onValueChange={(value: TreatmentStage) => 
              onPatientInfoChange('treatmentStage', value)
            }
          >
            <SelectTrigger id="treatmentStage">
              <SelectValue placeholder="Select treatment stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initial">Initial</SelectItem>
              <SelectItem value="early">Early</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoTab;

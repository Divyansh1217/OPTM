
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  condition: string;
  icdCode?: string;
}

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPatient: (patient: Partial<Patient>) => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ open, onOpenChange, onAddPatient }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [condition, setCondition] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Optional validation
    if (age && (isNaN(Number(age)) || Number(age) <= 0)) {
      newErrors.age = 'Age must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPatient = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    const newPatient: Partial<Patient> = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      age: age ? parseInt(age) : 0,
      gender,
      address,
      condition: condition || 'Unknown',
      icdCode: icdCode || 'N/A'
    };
    
    onAddPatient(newPatient);
    
    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setAge('');
    setGender('');
    setAddress('');
    setCondition('');
    setIcdCode('');
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name *</label>
                <Input 
                  className={`w-full ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="Enter first name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
              </div>
              <div>
                <label className="text-sm font-medium">Last Name *</label>
                <Input 
                  className={`w-full ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Enter last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input 
                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                placeholder="patient@example.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>
            
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input 
                className="w-full" 
                placeholder="(123) 456-7890" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Age</label>
                <Input 
                  className={`w-full ${errors.age ? 'border-red-500' : ''}`}
                  placeholder="Age" 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && <span className="text-xs text-red-500">{errors.age}</span>}
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input 
                className="w-full" 
                placeholder="Patient address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Medical Condition</label>
              <Input 
                className="w-full" 
                placeholder="Primary diagnosis" 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">ICD Code</label>
              <Input 
                className="w-full" 
                placeholder="ICD-10 code (if applicable)" 
                value={icdCode}
                onChange={(e) => setIcdCode(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;

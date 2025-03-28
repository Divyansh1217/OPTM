
import React from 'react';
import { Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  userType: 'doctor' | 'patient' | 'receptionist';
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, userType }) => {
  const getPlaceholder = () => {
    switch (userType) {
      case 'doctor':
        return 'doctor@example.com';
      case 'patient':
        return 'patient@example.com';
      case 'receptionist':
        return 'receptionist@example.com';
      default:
        return 'email@example.com';
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Email Address
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-11 rounded-lg transition-all border-gray-300 dark:border-gray-600 focus:border-primary/70 focus:ring focus:ring-primary/20"
          placeholder={getPlaceholder()}
          required
          autoComplete="email"
        />
      </div>
    </div>
  );
};

export default EmailInput;


import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PatientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const PatientSearch: React.FC<PatientSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="mb-4 relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 rounded-lg"
        placeholder="Search patients by name, condition, or ICD code..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

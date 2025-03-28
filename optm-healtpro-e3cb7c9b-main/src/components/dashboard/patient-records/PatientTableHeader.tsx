
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const PatientTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1">
            Patient
            <ArrowUpDown className="h-3 w-3" />
          </div>
        </th>
        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1">
            Diagnosis
            <ArrowUpDown className="h-3 w-3" />
          </div>
        </th>
        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ICD Code</th>
        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Visit</th>
        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Next Appointment</th>
        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
      </tr>
    </thead>
  );
};

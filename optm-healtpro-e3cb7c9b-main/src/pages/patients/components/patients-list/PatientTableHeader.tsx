
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PatientTableHeaderProps {
  handleSort?: (column: 'name' | 'lastVisit' | 'condition') => void;
  sortBy?: 'name' | 'lastVisit' | 'condition';
  sortDirection?: 'asc' | 'desc';
}

export const PatientTableHeader: React.FC<PatientTableHeaderProps> = ({ 
  handleSort,
  sortBy,
  sortDirection
}) => {
  const renderSortIcon = (column: 'name' | 'lastVisit' | 'condition') => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };
  
  const getSortableHeaderClass = (column: 'name' | 'lastVisit' | 'condition') => {
    return `px-4 py-3 text-left font-medium text-sm ${handleSort ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}`;
  };

  return (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <tr>
        <th 
          className={getSortableHeaderClass('name')}
          onClick={() => handleSort && handleSort('name')}
        >
          <span className="flex items-center">
            Patient {renderSortIcon('name')}
          </span>
        </th>
        <th 
          className={getSortableHeaderClass('condition')}
          onClick={() => handleSort && handleSort('condition')}
        >
          <span className="flex items-center">
            Condition {renderSortIcon('condition')}
          </span>
        </th>
        <th className="px-4 py-3 text-left font-medium text-sm">
          ICD Code
        </th>
        <th 
          className={getSortableHeaderClass('lastVisit')}
          onClick={() => handleSort && handleSort('lastVisit')}
        >
          <span className="flex items-center">
            Last Visit {renderSortIcon('lastVisit')}
          </span>
        </th>
        <th className="px-4 py-3 text-left font-medium text-sm">
          Next Visit
        </th>
        <th className="px-4 py-3 text-right font-medium text-sm">
          Actions
        </th>
      </tr>
    </thead>
  );
};

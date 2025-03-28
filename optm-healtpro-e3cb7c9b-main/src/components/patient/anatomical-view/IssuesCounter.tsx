
import React from 'react';
import { Info } from 'lucide-react';

interface IssuesCounterProps {
  count: number;
}

const IssuesCounter: React.FC<IssuesCounterProps> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full py-1 px-3 text-xs font-medium shadow-md border z-10 flex items-center gap-1.5">
      <Info className="h-3 w-3 text-muted-foreground" />
      <span>{count} issue{count !== 1 ? 's' : ''} detected</span>
    </div>
  );
};

export default IssuesCounter;

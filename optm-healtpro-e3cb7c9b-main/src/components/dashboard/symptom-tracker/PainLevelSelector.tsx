
import React from 'react';
import { cn } from '@/lib/utils';
import { PainLevelSelectorProps } from './types';
import { getPainLevelColor } from './utils';

const PainLevelSelector: React.FC<PainLevelSelectorProps> = ({ painLevel, onChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
        <button
          key={level}
          type="button"
          className={cn(
            "w-8 h-8 rounded-full text-sm font-medium transition-colors",
            painLevel === level
              ? getPainLevelColor(level)
              : "bg-secondary hover:bg-secondary/80"
          )}
          onClick={() => onChange(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default PainLevelSelector;


import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BodySystem } from './types';

interface SystemSelectorProps {
  systems: BodySystem[];
  activeSystem: string;
  onSystemChange: (value: string) => void;
}

const SystemSelector: React.FC<SystemSelectorProps> = ({ 
  systems, 
  activeSystem, 
  onSystemChange 
}) => {
  return (
    <Tabs defaultValue={activeSystem} onValueChange={onSystemChange} className="w-full max-w-[500px]">
      <TabsList className="bg-gray-100 dark:bg-gray-700 grid grid-flow-col auto-cols-fr w-full overflow-x-auto scrollbar-none p-1 rounded-md">
        {systems.map(system => (
          <TabsTrigger 
            key={system.id} 
            value={system.id}
            className="whitespace-nowrap text-sm py-2 px-3 font-medium transition-all hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            {system.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default SystemSelector;

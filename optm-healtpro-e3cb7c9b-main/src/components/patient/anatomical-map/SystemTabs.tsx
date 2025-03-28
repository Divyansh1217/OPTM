
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SystemTabsProps {
  activeSystem: string;
  onSystemChange: (value: string) => void;
}

const SystemTabs: React.FC<SystemTabsProps> = ({
  activeSystem,
  onSystemChange
}) => {
  return (
    <Tabs value={activeSystem} onValueChange={onSystemChange} className="mb-4">
      <TabsList className="grid grid-cols-7">
        <TabsTrigger value="full-body">Full Body</TabsTrigger>
        <TabsTrigger value="muscular">Muscular</TabsTrigger>
        <TabsTrigger value="skeletal">Skeletal</TabsTrigger>
        <TabsTrigger value="organs">Organs</TabsTrigger>
        <TabsTrigger value="vascular">Vascular</TabsTrigger>
        <TabsTrigger value="nervous">Nervous</TabsTrigger>
        <TabsTrigger value="skin">Skin</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SystemTabs;

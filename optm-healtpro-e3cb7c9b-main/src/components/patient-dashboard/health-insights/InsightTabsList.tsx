
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Dumbbell, Zap, Activity, Bed, Brain } from 'lucide-react';

const InsightTabsList: React.FC = () => {
  return (
    <TabsList className="grid grid-cols-6 mb-6">
      <TabsTrigger value="cardiovascular" className="flex gap-1 items-center">
        <Heart className="h-4 w-4" />
        <span className="hidden sm:inline">Heart</span>
      </TabsTrigger>
      <TabsTrigger value="muscular" className="flex gap-1 items-center">
        <Dumbbell className="h-4 w-4" />
        <span className="hidden sm:inline">Muscles</span>
      </TabsTrigger>
      <TabsTrigger value="nervous" className="flex gap-1 items-center">
        <Zap className="h-4 w-4" />
        <span className="hidden sm:inline">Nerves</span>
      </TabsTrigger>
      <TabsTrigger value="mobility" className="flex gap-1 items-center">
        <Activity className="h-4 w-4" />
        <span className="hidden sm:inline">Mobility</span>
      </TabsTrigger>
      <TabsTrigger value="sleep" className="flex gap-1 items-center">
        <Bed className="h-4 w-4" />
        <span className="hidden sm:inline">Sleep</span>
      </TabsTrigger>
      <TabsTrigger value="overall" className="flex gap-1 items-center">
        <Brain className="h-4 w-4" />
        <span className="hidden sm:inline">Overall</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default InsightTabsList;

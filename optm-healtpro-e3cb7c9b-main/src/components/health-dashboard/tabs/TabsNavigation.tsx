
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Footprints, Heart, Flame, Clock } from 'lucide-react';

interface TabsNavigationProps {
  activeTab: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid grid-cols-5 mb-6">
      <TabsTrigger value="overview" className="flex items-center gap-2">
        <Activity className="h-4 w-4" />
        <span className="hidden sm:inline">Overview</span>
      </TabsTrigger>
      <TabsTrigger value="activity" className="flex items-center gap-2">
        <Footprints className="h-4 w-4" />
        <span className="hidden sm:inline">Activity</span>
      </TabsTrigger>
      <TabsTrigger value="heart" className="flex items-center gap-2">
        <Heart className="h-4 w-4" />
        <span className="hidden sm:inline">Heart</span>
      </TabsTrigger>
      <TabsTrigger value="calories" className="flex items-center gap-2">
        <Flame className="h-4 w-4" />
        <span className="hidden sm:inline">Calories</span>
      </TabsTrigger>
      <TabsTrigger value="sleep" className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="hidden sm:inline">Sleep</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsNavigation;

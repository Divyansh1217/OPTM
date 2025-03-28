
import React from 'react';
import { Activity, BarChart2, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  activeCategory: string | null;
  onCategoryFilter: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryFilter
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={activeCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter(null)}
        className="gap-1"
      >
        <Activity className="h-4 w-4" />
        <span>All Exercises</span>
      </Button>
      <Button
        variant={activeCategory === 'squat' ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter('squat')}
        className="gap-1"
      >
        <BarChart2 className="h-4 w-4" />
        <span>Squat Analysis</span>
      </Button>
      <Button
        variant={activeCategory === 'rehabilitation' ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter('rehabilitation')}
        className="gap-1"
      >
        <Dumbbell className="h-4 w-4" />
        <span>Rehabilitation</span>
      </Button>
      <Button
        variant={activeCategory === 'strength' ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter('strength')}
        className="gap-1"
      >
        <Dumbbell className="h-4 w-4" />
        <span>Strength</span>
      </Button>
      <Button
        variant={activeCategory === 'flexibility' ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter('flexibility')}
        className="gap-1"
      >
        <Activity className="h-4 w-4" />
        <span>Flexibility</span>
      </Button>
      <Button
        variant={activeCategory === 'cardio' ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryFilter('cardio')}
        className="gap-1"
      >
        <Activity className="h-4 w-4" />
        <span>Cardio</span>
      </Button>
    </div>
  );
};

export default CategoryFilter;

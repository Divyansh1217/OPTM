
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Map } from 'lucide-react';

interface PainLocationMapProps {
  className?: string;
}

const PainLocationMap: React.FC<PainLocationMapProps> = ({
  className
}) => {
  return (
    <div className={cn("glass-morphism rounded-2xl p-4 md:p-6", className)}>
      <h3 className="text-lg font-semibold mb-2">Pain Location Map</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Track and visualize pain locations and intensity
      </p>
      
      <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border border-border/50 h-[250px]">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <Map className="h-12 w-12 mb-2 opacity-50" />
          <p className="text-sm">Pain location mapping coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default PainLocationMap;

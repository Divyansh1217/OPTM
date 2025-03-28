
import React from 'react';
import { motion } from 'framer-motion';
import { InfoIcon, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface BiologicalAgeProps {
  biologicalAge: number;
  chronologicalAge: number;
}

const BiologicalAge: React.FC<BiologicalAgeProps> = ({ 
  biologicalAge, 
  chronologicalAge 
}) => {
  // Calculate the percentage for the gauge (mapping 0-100 years to 0-180 degrees)
  const maxAge = 100;
  const gaugePercentage = (biologicalAge / maxAge) * 180;
  const ageDifference = chronologicalAge - biologicalAge;
  const isYounger = ageDifference > 0;
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Biological age</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Biological age is a measure of how well your body is functioning compared to your actual age. It's determined by various biomarkers in your blood.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>Your overall health</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/90 dark:bg-gray-900/90 rounded-xl text-white p-4 sm:p-5 relative"
        >
          <div className="flex flex-col items-center">
            {/* Gauge Visualization */}
            <div className="relative w-full h-24 sm:h-28 mb-4 flex items-center justify-center">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 sm:w-32 h-14 sm:h-16 overflow-hidden">
                {/* Background arc */}
                <div className="absolute top-0 left-0 w-full h-full rounded-tl-full rounded-tr-full border-6 sm:border-8 border-gray-700 border-b-0"></div>
                
                {/* Colored arc based on biological age */}
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-tl-full rounded-tr-full border-6 sm:border-8 border-green-500 border-b-0"
                  style={{ 
                    clipPath: `polygon(50% 100%, 50% 0%, 100% 0%, 100% 100%)`,
                    width: `${biologicalAge <= 30 ? 100 : 50 + (biologicalAge / maxAge) * 50}%` 
                  }}
                ></div>
                
                {/* Age marker */}
                <div 
                  className="absolute top-0 left-1/2 h-14 sm:h-16 w-1 bg-white transform origin-bottom"
                  style={{ 
                    transform: `translateX(-50%) rotate(${gaugePercentage - 90}deg)` 
                  }}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
              
              {/* Age number - Updated for better visibility */}
              <div className="absolute bottom-0 flex flex-col items-center w-full text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {biologicalAge}
                </div>
                <div className="text-xs sm:text-sm text-white/90 mt-0.5">
                  Years
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`text-xs sm:text-sm text-center ${isMobile ? 'mt-4' : 'mt-6'} mb-3`}>
              <p className="font-semibold mb-1">Good news! Your biological age is</p>
              <p>{Math.abs(ageDifference)} years {isYounger ? 'younger' : 'older'} than your chronological age of {chronologicalAge}.</p>
              <p className="mt-1 text-green-400">
                A lower blood age will help you live healthier longer.
              </p>
            </div>

            {/* Learn more button */}
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 mt-1 flex items-center text-xs sm:text-sm">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default BiologicalAge;

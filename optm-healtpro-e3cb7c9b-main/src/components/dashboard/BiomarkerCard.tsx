
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InfoIcon, TrendingDown, TrendingUp, Minus, ChevronDown, ChevronUp, Calendar, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface BiomarkerCardProps {
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  timestamp: string; // Changed from lastUpdated to timestamp
  className?: string;
  history?: Array<{date: string; value: number}>;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  recommendations?: string[];
  percentage?: number;
}

const BiomarkerCard: React.FC<BiomarkerCardProps> = ({
  name,
  value,
  unit,
  normalRange,
  status,
  timestamp, // Changed from lastUpdated to timestamp
  className,
  history = [],
  trend = 'stable',
  description = "",
  recommendations = [],
  percentage: initialPercentage
}) => {
  const pathRef = useRef<SVGCircleElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [percentage, setPercentage] = useState(initialPercentage || 0);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate the percentage based on status if not provided
  useEffect(() => {
    if (initialPercentage !== undefined) {
      setPercentage(initialPercentage);
      return;
    }
    
    let percent = 0;
    switch (status) {
      case 'normal':
        percent = 85;
        break;
      case 'elevated':
        percent = 60;
        break;
      case 'low':
        percent = 40;
        break;
      case 'critical':
        percent = 20;
        break;
    }
    setPercentage(percent);
  }, [status, initialPercentage]);
  
  useEffect(() => {
    if (pathRef.current) {
      const radius = pathRef.current.r.baseVal.value;
      const calculatedCircumference = 2 * Math.PI * radius;
      setCircumference(calculatedCircumference);
    }
  }, []);
  
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'text-medical-green stroke-medical-green';
      case 'elevated':
        return 'text-medical-yellow stroke-medical-yellow';
      case 'low':
        return 'text-medical-blue stroke-medical-blue';
      case 'critical':
        return 'text-medical-red stroke-medical-red';
      default:
        return 'text-medical-green stroke-medical-green';
    }
  };
  
  const getStatusLabel = () => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'elevated':
        return 'Elevated';
      case 'low':
        return 'Low';
      case 'critical':
        return 'Critical';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className={cn(
          "w-4 h-4 mr-1",
          status === 'normal' ? "text-medical-green" : 
          status === 'elevated' || status === 'critical' ? "text-medical-red" : 
          "text-medical-blue"
        )} />;
      case 'down':
        return <TrendingDown className={cn(
          "w-4 h-4 mr-1",
          status === 'normal' ? "text-medical-green" : 
          status === 'low' ? "text-medical-red" : 
          "text-medical-blue"
        )} />;
      case 'stable':
      default:
        return <Minus className="w-4 h-4 mr-1 text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      className={cn("biomarker-card p-4 md:p-6 rounded-xl border border-border/40", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base md:text-lg font-semibold">{name}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Normal range: {normalRange} {unit}</p>
                  {description && <p className="mt-1">{description}</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Last updated: {timestamp}</span>
          </div>
        </div>
        <span className={cn(
          "px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium",
          status === 'normal' && "bg-medical-green/20 text-medical-green",
          status === 'elevated' && "bg-medical-yellow/20 text-medical-yellow",
          status === 'low' && "bg-medical-blue/20 text-medical-blue",
          status === 'critical' && "bg-medical-red/20 text-medical-red",
        )}>
          {getStatusLabel()}
        </span>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative w-14 h-14 md:w-20 md:h-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              className="stroke-muted/20"
              strokeWidth="8"
            />
            <circle
              ref={pathRef}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              className={getStatusColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (percentage / 100) * circumference}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm md:text-lg font-bold">{percentage}%</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-xl md:text-3xl font-bold mb-0 md:mb-1 flex items-center gap-1 md:gap-2">
            {value} <span className="text-sm md:text-base font-normal text-muted-foreground">{unit}</span>
            <div className="flex items-center ml-auto text-xs font-normal">
              {getTrendIcon()}
              <span className={cn(
                trend === 'up' && (status === 'elevated' || status === 'critical') && "text-medical-red",
                trend === 'up' && status === 'normal' && "text-medical-green",
                trend === 'down' && status === 'low' && "text-medical-red",
                trend === 'down' && status === 'normal' && "text-medical-green",
                trend === 'stable' && "text-muted-foreground"
              )}>
                {trend === 'stable' ? 'Stable' : trend === 'up' ? 'Increasing' : 'Decreasing'}
              </span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Range: {normalRange} {unit}
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="w-full mt-4 pt-3 border-t border-border/40 flex items-center justify-center text-xs text-muted-foreground"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{name} Details</DialogTitle>
            <DialogDescription>
              Current value: {value} {unit} ({getStatusLabel()})
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {description && (
              <div>
                <h4 className="text-sm font-medium mb-1">About this biomarker:</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            )}
            
            {history.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">History:</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {history.map((entry, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
                      <span>{format(new Date(entry.date), 'MMM d, yyyy')}</span>
                      <span className="font-medium">{entry.value} {unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {recommendations.map((recommendation, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="rounded-full bg-primary/20 p-1 flex items-center justify-center mt-0.5">
                        <ChevronRight className="w-3 h-3 text-primary" />
                      </span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BiomarkerCard;

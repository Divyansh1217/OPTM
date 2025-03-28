
import React, { useState } from 'react';
import { Search, Info, ChevronDown, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  description?: string;
  lastUpdated: string;
  percentage: number;
  trend?: 'up' | 'down' | 'stable';
}

interface PatientBiomarkersProps {
  biomarkers: Biomarker[];
  onAddBiomarker?: () => void;
  patientId?: number | string;
}

const PatientBiomarkers: React.FC<PatientBiomarkersProps> = ({ 
  biomarkers,
  onAddBiomarker,
  patientId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedBiomarker, setExpandedBiomarker] = useState<string | null>(null);
  
  const filteredBiomarkers = biomarkers.filter(biomarker => {
    const matchesSearch = biomarker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || biomarker.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleDetails = (biomarkerId: string) => {
    if (expandedBiomarker === biomarkerId) {
      setExpandedBiomarker(null);
    } else {
      setExpandedBiomarker(biomarkerId);
    }
  };
  
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Biomarkers</h2>
          <p className="text-muted-foreground">Track and analyze patient biomarkers and inflammation indicators</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search biomarkers..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={onAddBiomarker} className="whitespace-nowrap">
            <span className="mr-1">+</span> Add Biomarker
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Biomarkers</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
          <TabsTrigger value="elevated">Elevated</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBiomarkers.map((biomarker) => (
          <Card key={biomarker.id} className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{biomarker.name}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Normal range: {biomarker.normalRange} {biomarker.unit}</p>
                        {biomarker.description && <p>{biomarker.description}</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Last updated: {biomarker.lastUpdated}
                </div>
              </div>
              
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                biomarker.status === 'normal' && "bg-green-100 text-green-700",
                biomarker.status === 'elevated' && "bg-yellow-100 text-yellow-700",
                biomarker.status === 'critical' && "bg-red-100 text-red-700",
                biomarker.status === 'low' && "bg-blue-100 text-blue-700"
              )}>
                {biomarker.status.charAt(0).toUpperCase() + biomarker.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={
                      biomarker.status === 'normal' ? "#10b981" :
                      biomarker.status === 'elevated' ? "#f59e0b" :
                      biomarker.status === 'critical' ? "#ef4444" : "#3b82f6"
                    }
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - biomarker.percentage / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold">
                  {biomarker.percentage}%
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{biomarker.value}</span>
                  <span className="text-sm text-muted-foreground">{biomarker.unit}</span>
                  <span className="ml-3 text-muted-foreground text-sm">—</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {biomarker.trend === 'stable' ? 'Stable' : 
                     biomarker.trend === 'up' ? 'Increasing' : 'Decreasing'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Range: {biomarker.normalRange} {biomarker.unit}
                </div>
              </div>
            </div>
            
            <button
              className="w-full mt-3 pt-2 border-t border-gray-200 flex items-center justify-center text-xs text-muted-foreground"
              onClick={() => toggleDetails(biomarker.id)}
            >
              <ChevronDown className={cn("h-4 w-4 mr-1", expandedBiomarker === biomarker.id && "rotate-180")} />
              {expandedBiomarker === biomarker.id ? "Hide Details" : "View Details"}
            </button>
            
            {expandedBiomarker === biomarker.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                <p className="mb-2">{biomarker.description || "No additional details available."}</p>
                <div className="text-xs text-muted-foreground">
                  {biomarker.status === 'normal' ? (
                    <p>This biomarker is within normal range.</p>
                  ) : biomarker.status === 'elevated' ? (
                    <p>This biomarker is elevated above the normal range.</p>
                  ) : biomarker.status === 'critical' ? (
                    <p>This biomarker is critically elevated and requires attention.</p>
                  ) : (
                    <p>This biomarker is below the normal range.</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
        
        {filteredBiomarkers.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No biomarkers found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBiomarkers;

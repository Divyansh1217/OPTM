
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSymptoms, SymptomEntry } from '@/contexts/SymptomContext';
import { 
  SymptomForm, 
  SymptomList, 
  PainTrend, 
  bodyRegions,
  SymptomTrackerProps as BaseSymptomTrackerProps,
} from './symptom-tracker';
import { getPainLevelColor } from './symptom-tracker/utils';

interface SymptomTrackerProps extends BaseSymptomTrackerProps {
  patientId?: number | string;
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({ className, patientId }) => {
  const { symptoms, addSymptom } = useSymptoms();
  
  const [newSymptom, setNewSymptom] = useState<Partial<SymptomEntry>>({
    date: new Date(),
    painLevel: 1
  });
  
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSymptom(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewSymptom(prev => ({ ...prev, location: value }));
  };

  const handlePainLevelChange = (level: number) => {
    setNewSymptom(prev => ({ ...prev, painLevel: level }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSymptom.symptomName || !newSymptom.location) {
      toast({
        title: "Missing Information",
        description: "Please provide symptom name and location",
        variant: "destructive",
      });
      return;
    }
    
    const symptomEntry: SymptomEntry = {
      id: Date.now().toString(),
      date: newSymptom.date || new Date(),
      symptomName: newSymptom.symptomName || '',
      painLevel: newSymptom.painLevel || 1,
      location: newSymptom.location || '',
      notes: newSymptom.notes || ''
    };
    
    addSymptom(symptomEntry);
    setNewSymptom({
      date: new Date(),
      painLevel: 1
    });
    setOpen(false);
    
    toast({
      title: "Symptom Logged",
      description: "Your symptom has been recorded successfully",
    });
  };

  // Get the location label for display purposes
  const getLocationLabel = (locationValue: string) => {
    const region = bodyRegions.find(r => r.value === locationValue);
    return region ? region.label : locationValue;
  };

  return (
    <motion.div
      className={cn("glass-morphism rounded-2xl p-4 md:p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg font-semibold">Symptom & Pain Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Track your symptoms and pain levels over time
          </p>
        </div>
        <Activity className="w-5 h-5 text-primary" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Log New Symptom
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log a New Symptom</DialogTitle>
            <DialogDescription>
              Record your symptoms to track your health over time
            </DialogDescription>
          </DialogHeader>
          <SymptomForm
            newSymptom={newSymptom}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handlePainLevelChange={handlePainLevelChange}
            handleSubmit={handleSubmit}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
      
      <SymptomList
        symptoms={symptoms}
        getLocationLabel={getLocationLabel}
        getPainLevelColor={getPainLevelColor}
      />
      
      {symptoms.length > 0 && (
        <PainTrend
          symptoms={symptoms}
          getPainLevelColor={getPainLevelColor}
        />
      )}
    </motion.div>
  );
};

export default SymptomTracker;

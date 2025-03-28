
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { LineChart, CheckCircle, Calendar } from 'lucide-react';
import { MedicationWithSummary } from '@/types/medicationData';
import { getStatusColor } from './helpers';

interface MedicationStatsProps {
  medication: MedicationWithSummary;
}

const MedicationStats: React.FC<MedicationStatsProps> = ({ medication }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Adherence Card */}
      <div className={`p-4 rounded-lg border ${getStatusColor(medication.summary.adherenceRate)}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">Adherence Rate</h3>
            <p className="text-2xl font-bold">{Math.round(medication.summary.adherenceRate)}%</p>
          </div>
          <LineChart className="h-5 w-5 text-primary" />
        </div>
        <Progress value={medication.summary.adherenceRate} className="h-2 mt-2" />
      </div>
      
      {/* Doses Card */}
      <div className="p-4 rounded-lg border">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Doses Taken</h3>
            <p className="text-2xl font-bold">
              {medication.summary.dosesTaken} <span className="text-sm text-muted-foreground font-normal">of {medication.summary.dosesScheduled}</span>
            </p>
          </div>
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
        <div className="flex gap-4 mt-3 text-sm">
          <div>
            <span className="text-green-500 font-medium">{medication.summary.dosesTaken}</span>
            <p className="text-xs text-muted-foreground">Taken</p>
          </div>
          <div>
            <span className="text-red-500 font-medium">{medication.summary.dosesMissed}</span>
            <p className="text-xs text-muted-foreground">Missed</p>
          </div>
          <div>
            <span className="text-amber-500 font-medium">
              {medication.summary.dosesScheduled - medication.summary.dosesTaken - medication.summary.dosesMissed}
            </span>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>
      
      {/* Schedule Card */}
      <div className="p-4 rounded-lg border">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-medium">Schedule</h3>
            <p className="text-muted-foreground text-sm">
              {medication.frequency}x daily
            </p>
          </div>
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-2">
          <p className="text-sm">
            <span className="font-medium">Started:</span> {new Date(medication.startDate).toLocaleDateString()}
          </p>
          {medication.endDate && (
            <p className="text-sm">
              <span className="font-medium">Ends:</span> {new Date(medication.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationStats;

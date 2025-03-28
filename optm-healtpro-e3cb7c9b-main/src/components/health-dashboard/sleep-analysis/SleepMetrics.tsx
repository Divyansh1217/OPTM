
import React from 'react';

interface SleepMetricsProps {
  averageSleepHours: number;
  averageSleepMinutesRemainder: number;
  qualityText: { text: string; color: string };
  sleepQualityScore: number;
}

const SleepMetrics: React.FC<SleepMetricsProps> = ({
  averageSleepHours,
  averageSleepMinutesRemainder,
  qualityText,
  sleepQualityScore
}) => {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Avg. Sleep Duration</p>
        <p className="text-2xl font-bold">
          {averageSleepHours}h {averageSleepMinutesRemainder}m
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Sleep Quality</p>
        <p className={`text-2xl font-bold ${qualityText.color}`}>
          {qualityText.text}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Quality Score</p>
        <p className="text-2xl font-bold">
          {sleepQualityScore}/100
        </p>
      </div>
    </div>
  );
};

export default SleepMetrics;

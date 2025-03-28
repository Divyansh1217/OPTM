
import { 
  Medication,
  MedicationDose,
  MedicationSummary,
  MedicationWithSummary
} from '@/types/medicationData';

// Default medications to track
export const DEFAULT_MEDICATIONS = [
  { name: 'PH3-BHT', description: 'Take with water, 3 times daily', frequency: 3 },
  { name: 'PH3-JP', description: 'Take after meals, 3 times daily', frequency: 3 },
  { name: 'Foot Batch Crystal', description: 'Dissolve in warm water, 3 times daily', frequency: 3 },
  { name: 'Mornblooso', description: 'Take on empty stomach, 3 times daily', frequency: 3 }
];

// Calculate medication summary from medication data
export const calculateMedicationSummary = (medication: Medication): MedicationSummary => {
  const doses = medication.doses || [];
  const dosesTaken = doses.filter(dose => dose.status === 'taken').length;
  const dosesMissed = doses.filter(dose => dose.status === 'missed').length;
  const dosesScheduled = doses.length;
  const adherenceRate = dosesScheduled > 0 ? (dosesTaken / dosesScheduled) * 100 : 0;
  
  const sortedDoses = [...doses].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const lastTakenDose = sortedDoses.find(dose => dose.status === 'taken');
  
  return {
    adherenceRate,
    dosesScheduled,
    dosesTaken,
    dosesMissed,
    lastTaken: lastTakenDose?.timestamp
  };
};

// Calculate overall adherence and generate improvement data
export const generateImprovementData = (medications: MedicationWithSummary[]) => {
  // Calculate overall adherence rate
  const overallAdherence = medications.reduce((sum, med) => {
    return sum + med.summary.adherenceRate;
  }, 0) / Math.max(1, medications.length);
  
  // Generate improvement data based on adherence rate
  return {
    adherenceRate: overallAdherence,
    healthScore: Math.min(100, 60 + (overallAdherence / 5)),
    symptoms: {
      pain: Math.max(1, 8 - (overallAdherence / 20)),
      inflammation: Math.max(1, 7 - (overallAdherence / 25)),
      stiffness: Math.max(1, 8 - (overallAdherence / 20))
    }
  };
};

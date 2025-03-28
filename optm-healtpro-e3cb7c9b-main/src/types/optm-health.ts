
/**
 * OPTM Health Care Musculoskeletal Types
 */

export type TreatmentStage = 'initial' | 'early' | 'intermediate' | 'advanced' | 'maintenance';

export type ImprovementCategory = 'significant' | 'moderate' | 'minimal' | 'no-change' | 'deterioration';

export interface MusculoskeletalBiomarkers {
  // Inflammatory markers
  crp?: number; // C-reactive protein (mg/L)
  il6?: number; // Interleukin-6 (pg/mL)
  tnfAlpha?: number; // Tumor Necrosis Factor Alpha (pg/mL)
  mda?: number; // Malondialdehyde (μmol/L)
  
  // Tissue repair markers
  vegf?: number; // Vascular Endothelial Growth Factor (pg/mL)
  tgfBeta?: number; // Transforming Growth Factor Beta (ng/mL)
  
  // Cartilage degradation markers
  comp?: number; // Cartilage Oligomeric Matrix Protein (U/L)
  mmp9?: number; // Matrix Metalloproteinase-9 (ng/mL)
  mmp13?: number; // Matrix Metalloproteinase-13 (pg/mL)
  
  // Muscle damage markers
  ckMm?: number; // Creatine Kinase MM (U/L)
  
  // Neurological markers
  bdnf?: number; // Brain-Derived Neurotrophic Factor (pg/mL)
  substanceP?: number; // Substance P (pg/mL)
  
  // Additional markers
  dDimer?: number; // D-Dimer (μg/mL)
  fourHyp?: number; // 4-Hydroxyproline (μg/mL)
  aldolase?: number; // Aldolase (U/L)
  calciumPhosphorusRatio?: number; // Calcium to Phosphorus ratio
}

export interface AnatomicalMeasurements {
  // Cervical measurements
  ctm?: number; // Cervical Translational Measurement (mm)
  
  // Circumference measurements
  ccm?: { // Cervical Circumference Measurement
    value: number;
    unit: 'cm' | 'mm';
    location: string;
  }[];
  
  cap?: { // Circumference Arm Posterior
    value: number;
    unit: 'cm' | 'mm';
    side: 'left' | 'right' | 'bilateral';
    location: string;
  }[];
  
  cbp?: { // Circumference Brachial Posterior
    value: number;
    unit: 'cm' | 'mm';
    side: 'left' | 'right' | 'bilateral';
    location: string;
  }[];
}

export interface MobilityMeasurements {
  kneeFlexion?: {
    value: number;
    unit: 'degrees';
    side: 'left' | 'right' | 'bilateral';
  };
  
  kneeExtension?: {
    value: number;
    unit: 'degrees';
    side: 'left' | 'right' | 'bilateral';
  };
  
  pelvicTilt?: {
    value: number;
    unit: 'degrees';
  };
  
  // Additional mobility measurements
  cervicalRotation?: {
    value: number;
    unit: 'degrees';
    direction: 'left' | 'right';
  };
  
  shoulderFlexion?: {
    value: number;
    unit: 'degrees';
    side: 'left' | 'right' | 'bilateral';
  };
}

export interface ImagingData {
  id: string;
  type: 'x-ray' | 'mri' | 'ct' | 'ultrasound';
  bodyPart: string;
  imageUrl: string;
  date: string;
  notes?: string;
  stage: 'pre-treatment' | 'post-treatment' | 'follow-up';
}

export interface OptmPatientData {
  patientId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  treatmentStage: TreatmentStage;
  biomarkers: MusculoskeletalBiomarkers;
  anatomicalMeasurements: AnatomicalMeasurements;
  mobilityMeasurements: MobilityMeasurements;
  imaging: ImagingData[];
  lastUpdated: string;
}

export interface OptmAnalysisResult {
  patientId: string;
  overallProgress: {
    status: ImprovementCategory;
    summary: string;
  };
  biomarkerAnalysis: {
    marker: keyof MusculoskeletalBiomarkers;
    value: number;
    referenceRange: string;
    status: 'normal' | 'elevated' | 'low';
    improvement: ImprovementCategory;
    improvementPercentage: number;
    notes: string;
  }[];
  anatomicalAnalysis: {
    measurement: string;
    current: number;
    previous: number;
    improvement: ImprovementCategory;
    improvementPercentage: number;
    notes: string;
  }[];
  mobilityAnalysis: {
    movement: string;
    current: number;
    previous: number;
    improvement: ImprovementCategory;
    improvementPercentage: number;
    notes: string;
    target?: number; // Added target property for ideal/normal range value
  }[];
  imagingAnalysis: {
    type: string;
    findings: string;
    comparison: string;
    improvement: ImprovementCategory;
  }[];
  recommendations: {
    category: 'exercise' | 'medication' | 'lifestyle' | 'follow-up';
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  createdAt: string;
}

// Reference ranges for biomarkers based on OPTM Health Care protocols
export const BIOMARKER_REFERENCE_RANGES = {
  crp: { min: 0, max: 3, unit: 'mg/L' },
  il6: { min: 0, max: 4.3, unit: 'pg/mL' },
  tnfAlpha: { min: 0, max: 15.6, unit: 'pg/mL' },
  mda: { min: 1.0, max: 4.0, unit: 'μmol/L' },
  vegf: { min: 10, max: 300, unit: 'pg/mL' },
  tgfBeta: { min: 0.5, max: 5.5, unit: 'ng/mL' },
  comp: { min: 5, max: 15, unit: 'U/L' },
  mmp9: { min: 200, max: 700, unit: 'ng/mL' },
  mmp13: { min: 0, max: 50, unit: 'pg/mL' },
  ckMm: { min: 22, max: 198, unit: 'U/L' },
  bdnf: { min: 8000, max: 46000, unit: 'pg/mL' },
  substanceP: { min: 100, max: 400, unit: 'pg/mL' },
  dDimer: { min: 0, max: 0.5, unit: 'μg/mL' },
  fourHyp: { min: 5, max: 30, unit: 'μg/mL' },
  aldolase: { min: 1.0, max: 8.8, unit: 'U/L' },
  calciumPhosphorusRatio: { min: 2.0, max: 4.0, unit: '' }
};

import { 
  OptmPatientData, 
  OptmAnalysisResult, 
  MusculoskeletalBiomarkers, 
  AnatomicalMeasurements, 
  MobilityMeasurements,
  ImagingData,
  ImprovementCategory,
  BIOMARKER_REFERENCE_RANGES
} from '@/types/optm-health';

/**
 * Calculate improvement category based on percentage
 * IMPROVED: More precise calculation based on whether lower or higher values indicate improvement
 */
export const calculateImprovementCategory = (percentChange: number): ImprovementCategory => {
  if (percentChange >= 75) return 'significant';
  if (percentChange >= 50) return 'moderate';
  if (percentChange >= 25) return 'minimal';
  if (percentChange > 0) return 'no-change';
  return 'deterioration';
};

/**
 * Calculate improvement percentage between two values
 * IMPROVED: More precise calculation based on whether lower or higher values indicate improvement
 */
export const calculateImprovement = (currentValue: number, previousValue: number, lowerIsBetter = true): number => {
  if (previousValue === 0) return 0; // Avoid division by zero
  
  if (lowerIsBetter) {
    // For metrics where lower values are better (like CRP, inflammation markers)
    return ((previousValue - currentValue) / previousValue) * 100;
  } else {
    // For metrics where higher values are better (like mobility angles)
    return ((currentValue - previousValue) / previousValue) * 100;
  }
};

/**
 * Determine if a biomarker is within normal range
 */
export const getBiomarkerStatus = (
  biomarker: keyof MusculoskeletalBiomarkers, 
  value: number
): 'normal' | 'elevated' | 'low' => {
  const range = BIOMARKER_REFERENCE_RANGES[biomarker];
  if (!range) return 'normal';
  
  if (value < range.min) return 'low';
  if (value > range.max) return 'elevated';
  return 'normal';
};

/**
 * Format reference range as a string
 */
export const formatReferenceRange = (biomarker: keyof MusculoskeletalBiomarkers): string => {
  const range = BIOMARKER_REFERENCE_RANGES[biomarker];
  if (!range) return 'Not available';
  
  return `${range.min} - ${range.max} ${range.unit}`;
};

/**
 * Generate notes for biomarker analysis based on value and improvement
 */
export const generateBiomarkerNotes = (
  biomarker: keyof MusculoskeletalBiomarkers,
  value: number,
  improvement: ImprovementCategory,
  improvementPercentage: number
): string => {
  const status = getBiomarkerStatus(biomarker, value);
  const range = BIOMARKER_REFERENCE_RANGES[biomarker];
  
  if (!range) return 'Insufficient data for analysis';
  
  let notes = '';
  
  // Add status description
  if (status === 'normal') {
    notes += `${biomarker.toUpperCase()} is within normal range. `;
  } else if (status === 'elevated') {
    notes += `${biomarker.toUpperCase()} is elevated above normal range. `;
  } else {
    notes += `${biomarker.toUpperCase()} is below normal range. `;
  }
  
  // Add improvement description
  if (improvement === 'significant') {
    notes += `Showing significant improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'moderate') {
    notes += `Showing moderate improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'minimal') {
    notes += `Showing minimal improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'no-change') {
    notes += `No significant change observed.`;
  } else {
    notes += `Shows deterioration (${Math.abs(improvementPercentage).toFixed(1)}% worse).`;
  }
  
  // Add biomarker-specific notes
  switch (biomarker) {
    case 'crp':
      notes += ' CRP is a general marker of inflammation.';
      break;
    case 'il6':
      notes += ' IL-6 plays a role in both pro- and anti-inflammatory responses.';
      break;
    case 'tnfAlpha':
      notes += ' TNF-α is a key inflammatory mediator.';
      break;
    case 'mmp9':
    case 'mmp13':
      notes += ' MMPs are involved in tissue remodeling and repair.';
      break;
    case 'ckMm':
      notes += ' CK-MM indicates muscle damage or recovery.';
      break;
    // Add other biomarker-specific notes as needed
  }
  
  return notes;
};

/**
 * Generate summary for anatomical measurement analysis
 */
export const generateAnatomicalNotes = (
  measurementName: string,
  improvement: ImprovementCategory,
  improvementPercentage: number
): string => {
  let notes = '';
  
  if (improvement === 'significant') {
    notes += `${measurementName} shows significant improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'moderate') {
    notes += `${measurementName} shows moderate improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'minimal') {
    notes += `${measurementName} shows minimal improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'no-change') {
    notes += `${measurementName} shows no significant change.`;
  } else {
    notes += `${measurementName} shows deterioration (${Math.abs(improvementPercentage).toFixed(1)}% worse).`;
  }
  
  // Add measurement-specific notes
  if (measurementName.includes('CTM')) {
    notes += ' Cervical translational measurement reflects neck alignment.';
  } else if (measurementName.includes('CCM')) {
    notes += ' Cervical circumference relates to soft tissue changes.';
  } else if (measurementName.includes('CAP')) {
    notes += ' Arm circumference indicates muscle mass and potential swelling.';
  } else if (measurementName.includes('CBP')) {
    notes += ' Brachial circumference relates to upper arm tissue status.';
  }
  
  return notes;
};

/**
 * Generate summary for mobility analysis
 */
export const generateMobilityNotes = (
  movementName: string,
  improvement: ImprovementCategory,
  improvementPercentage: number,
  currentValue: number
): string => {
  let notes = '';
  
  if (improvement === 'significant') {
    notes += `${movementName} shows significant improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'moderate') {
    notes += `${movementName} shows moderate improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'minimal') {
    notes += `${movementName} shows minimal improvement (${improvementPercentage.toFixed(1)}%).`;
  } else if (improvement === 'no-change') {
    notes += `${movementName} shows no significant change.`;
  } else {
    notes += `${movementName} shows deterioration (${Math.abs(improvementPercentage).toFixed(1)}% worse).`;
  }
  
  // Add reference to normal ranges
  if (movementName.includes('Knee Flexion')) {
    const normalRange = '135-150 degrees';
    notes += ` Normal range is ${normalRange}.`;
    if (currentValue < 135) {
      notes += ` Current value is below normal range.`;
    }
  } else if (movementName.includes('Knee Extension')) {
    notes += ` Full extension is 0 degrees (neutral position).`;
    if (currentValue > 5) {
      notes += ` Current value indicates extension deficit.`;
    }
  } else if (movementName.includes('Pelvic Tilt')) {
    notes += ` Normal anterior pelvic tilt is between 4-7 degrees.`;
  }
  
  return notes;
};

/**
 * Generate personalized treatment recommendations based on analysis results
 */
export const generateRecommendations = (
  analysisResult: Partial<OptmAnalysisResult>,
  patientData: OptmPatientData
): OptmAnalysisResult['recommendations'] => {
  const recommendations: OptmAnalysisResult['recommendations'] = [];
  
  // Analyze biomarkers for recommendations
  const inflammatoryIssues = analysisResult.biomarkerAnalysis?.filter(b => 
    (b.marker === 'crp' || b.marker === 'il6' || b.marker === 'tnfAlpha') && 
    b.status === 'elevated'
  );
  
  if (inflammatoryIssues && inflammatoryIssues.length > 0) {
    recommendations.push({
      category: 'medication',
      description: 'Consider anti-inflammatory protocol based on elevated inflammatory markers',
      priority: 'high'
    });
    
    recommendations.push({
      category: 'lifestyle',
      description: 'Recommend anti-inflammatory diet modifications and stress reduction techniques',
      priority: 'medium'
    });
  }
  
  // Analyze mobility for exercise recommendations
  const mobilityIssues = analysisResult.mobilityAnalysis?.filter(m =>
    m.improvement === 'minimal' || m.improvement === 'no-change' || m.improvement === 'deterioration'
  );
  
  if (mobilityIssues && mobilityIssues.length > 0) {
    // Knee-specific recommendations
    if (mobilityIssues.some(m => m.movement.includes('Knee'))) {
      recommendations.push({
        category: 'exercise',
        description: 'Implement progressive knee mobility protocol with focus on controlled ROM exercises',
        priority: 'high'
      });
    }
    
    // Pelvic-specific recommendations
    if (mobilityIssues.some(m => m.movement.includes('Pelvic'))) {
      recommendations.push({
        category: 'exercise',
        description: 'Add core stabilization and pelvic alignment exercises to treatment plan',
        priority: 'medium'
      });
    }
  }
  
  // Add follow-up recommendations based on overall status
  if (analysisResult.overallProgress?.status === 'significant' || 
      analysisResult.overallProgress?.status === 'moderate') {
    recommendations.push({
      category: 'follow-up',
      description: 'Schedule follow-up assessment in 4 weeks to monitor continued progress',
      priority: 'medium'
    });
  } else {
    recommendations.push({
      category: 'follow-up',
      description: 'Schedule follow-up assessment in 2 weeks to evaluate response to updated protocol',
      priority: 'high'
    });
  }
  
  // Add standard recommendations based on treatment stage
  if (patientData.treatmentStage === 'initial' || patientData.treatmentStage === 'early') {
    recommendations.push({
      category: 'exercise',
      description: 'Begin with gentle range of motion exercises focusing on proper form and pain-free movement',
      priority: 'high'
    });
  } else if (patientData.treatmentStage === 'intermediate') {
    recommendations.push({
      category: 'exercise',
      description: 'Progress to moderate resistance training with attention to proper biomechanics',
      priority: 'high'
    });
  } else if (patientData.treatmentStage === 'advanced') {
    recommendations.push({
      category: 'exercise',
      description: 'Implement functional movement patterns that simulate daily activities and sport-specific motions',
      priority: 'high'
    });
  } else if (patientData.treatmentStage === 'maintenance') {
    recommendations.push({
      category: 'lifestyle',
      description: 'Maintain home exercise program with periodic clinical reassessment',
      priority: 'medium'
    });
  }
  
  return recommendations;
};

/**
 * IMPROVED: Calculate a weighted composite improvement score
 * Uses different weights for different parameter types for a more clinically relevant score
 */
export const calculateCompositeImprovement = (
  biomarkerImprovements: number[],
  anatomicalImprovements: number[],
  mobilityImprovements: number[],
  imagingImprovements: number[] = []
): { score: number; category: ImprovementCategory } => {
  // Default weights (can be adjusted based on clinical protocols)
  const weights = {
    biomarker: 40,
    anatomical: 30, 
    mobility: 20,
    imaging: 10
  };
  
  // Calculate average improvement for each category
  const avgBiomarker = biomarkerImprovements.length > 0 
    ? biomarkerImprovements.reduce((sum, val) => sum + val, 0) / biomarkerImprovements.length 
    : 0;
    
  const avgAnatomical = anatomicalImprovements.length > 0 
    ? anatomicalImprovements.reduce((sum, val) => sum + val, 0) / anatomicalImprovements.length 
    : 0;
    
  const avgMobility = mobilityImprovements.length > 0 
    ? mobilityImprovements.reduce((sum, val) => sum + val, 0) / mobilityImprovements.length 
    : 0;
    
  const avgImaging = imagingImprovements.length > 0 
    ? imagingImprovements.reduce((sum, val) => sum + val, 0) / imagingImprovements.length 
    : 0;
  
  // Calculate total weights (only count categories with data)
  let totalWeight = 0;
  if (biomarkerImprovements.length > 0) totalWeight += weights.biomarker;
  if (anatomicalImprovements.length > 0) totalWeight += weights.anatomical;
  if (mobilityImprovements.length > 0) totalWeight += weights.mobility;
  if (imagingImprovements.length > 0) totalWeight += weights.imaging;
  
  // Prevent division by zero
  if (totalWeight === 0) return { score: 0, category: 'no-change' };
  
  // Calculate weighted average
  const weightedSum = 
    (avgBiomarker * (biomarkerImprovements.length > 0 ? weights.biomarker : 0)) +
    (avgAnatomical * (anatomicalImprovements.length > 0 ? weights.anatomical : 0)) +
    (avgMobility * (mobilityImprovements.length > 0 ? weights.mobility : 0)) +
    (avgImaging * (imagingImprovements.length > 0 ? weights.imaging : 0));
  
  const compositeScore = weightedSum / totalWeight;
  
  return {
    score: compositeScore,
    category: calculateImprovementCategory(compositeScore)
  };
};

/**
 * Generate a comprehensive analysis of OPTM patient data
 * IMPROVED: Enhanced with weighted composite scoring
 */
export const analyzeOptmPatientData = (
  currentData: OptmPatientData,
  previousData?: OptmPatientData
): OptmAnalysisResult => {
  // Initialize the analysis result
  const analysisResult: OptmAnalysisResult = {
    patientId: currentData.patientId,
    overallProgress: {
      status: 'no-change',
      summary: ''
    },
    biomarkerAnalysis: [],
    anatomicalAnalysis: [],
    mobilityAnalysis: [],
    imagingAnalysis: [],
    recommendations: [],
    createdAt: new Date().toISOString()
  };
  
  // Track improvement percentages for composite calculation
  const biomarkerImprovements: number[] = [];
  const anatomicalImprovements: number[] = [];
  const mobilityImprovements: number[] = [];
  const imagingImprovements: number[] = [];
  
  // Analyze biomarkers
  if (currentData.biomarkers) {
    Object.entries(currentData.biomarkers).forEach(([key, value]) => {
      const biomarker = key as keyof MusculoskeletalBiomarkers;
      
      // Skip if value is undefined
      if (value === undefined) return;
      
      const previousValue = previousData?.biomarkers?.[biomarker];
      
      // Determine if lower values are better for this biomarker (true for most inflammatory markers)
      const lowerIsBetter = ['crp', 'il6', 'tnfAlpha', 'mda', 'comp', 'mmp9', 'mmp13', 'dDimer', 'substanceP'].includes(biomarker);
      
      let improvementPercentage = 0;
      if (previousValue !== undefined) {
        improvementPercentage = calculateImprovement(value, previousValue, lowerIsBetter);
        biomarkerImprovements.push(improvementPercentage);
      }
      
      const improvement = calculateImprovementCategory(improvementPercentage);
      
      analysisResult.biomarkerAnalysis.push({
        marker: biomarker,
        value: value,
        referenceRange: formatReferenceRange(biomarker),
        status: getBiomarkerStatus(biomarker, value),
        improvement,
        improvementPercentage,
        notes: generateBiomarkerNotes(biomarker, value, improvement, improvementPercentage)
      });
    });
  }
  
  // Analyze anatomical measurements
  // Example for CTM
  if (currentData.anatomicalMeasurements?.ctm !== undefined) {
    const currentValue = currentData.anatomicalMeasurements.ctm;
    const previousValue = previousData?.anatomicalMeasurements?.ctm;
    
    if (previousValue !== undefined) {
      const improvementPercentage = calculateImprovement(currentValue, previousValue, true); // Lower is better for CTM
      const improvement = calculateImprovementCategory(improvementPercentage);
      anatomicalImprovements.push(improvementPercentage);
      
      analysisResult.anatomicalAnalysis.push({
        measurement: 'Cervical Translational Measurement (CTM)',
        current: currentValue,
        previous: previousValue,
        improvement,
        improvementPercentage,
        notes: generateAnatomicalNotes('CTM', improvement, improvementPercentage)
      });
    }
  }
  
  // Process circumference measurements (CCM, CAP, CBP)
  if (currentData.anatomicalMeasurements?.ccm && currentData.anatomicalMeasurements.ccm.length > 0) {
    currentData.anatomicalMeasurements.ccm.forEach((ccm, index) => {
      const previousCcm = previousData?.anatomicalMeasurements?.ccm?.[index];
      
      if (previousCcm) {
        const improvementPercentage = calculateImprovement(ccm.value, previousCcm.value, true); // Lower is generally better for circumference in inflammation
        const improvement = calculateImprovementCategory(improvementPercentage);
        anatomicalImprovements.push(improvementPercentage);
        
        analysisResult.anatomicalAnalysis.push({
          measurement: `Cervical Circumference (${ccm.location})`,
          current: ccm.value,
          previous: previousCcm.value,
          improvement,
          improvementPercentage,
          notes: generateAnatomicalNotes(`CCM at ${ccm.location}`, improvement, improvementPercentage)
        });
      }
    });
  }
  
  // Analyze mobility measurements
  if (currentData.mobilityMeasurements?.kneeFlexion) {
    const currentValue = currentData.mobilityMeasurements.kneeFlexion.value;
    const previousValue = previousData?.mobilityMeasurements?.kneeFlexion?.value;
    
    if (previousValue !== undefined) {
      const improvementPercentage = calculateImprovement(currentValue, previousValue, false); // Higher is better for knee flexion
      const improvement = calculateImprovementCategory(improvementPercentage);
      const side = currentData.mobilityMeasurements.kneeFlexion.side;
      mobilityImprovements.push(improvementPercentage);
      
      analysisResult.mobilityAnalysis.push({
        movement: `Knee Flexion (${side})`,
        current: currentValue,
        previous: previousValue,
        improvement,
        improvementPercentage,
        notes: generateMobilityNotes(`Knee Flexion (${side})`, improvement, improvementPercentage, currentValue),
        target: 135 // Normal minimum knee flexion
      });
    }
  }
  
  if (currentData.mobilityMeasurements?.kneeExtension) {
    const currentValue = currentData.mobilityMeasurements.kneeExtension.value;
    const previousValue = previousData?.mobilityMeasurements?.kneeExtension?.value;
    
    if (previousValue !== undefined) {
      const improvementPercentage = calculateImprovement(currentValue, previousValue, true); // Lower is better for knee extension (closer to 0°)
      const improvement = calculateImprovementCategory(improvementPercentage);
      const side = currentData.mobilityMeasurements.kneeExtension.side;
      mobilityImprovements.push(improvementPercentage);
      
      analysisResult.mobilityAnalysis.push({
        movement: `Knee Extension (${side})`,
        current: currentValue,
        previous: previousValue,
        improvement,
        improvementPercentage,
        notes: generateMobilityNotes(`Knee Extension (${side})`, improvement, improvementPercentage, currentValue),
        target: 0 // Target for full extension
      });
    }
  }
  
  if (currentData.mobilityMeasurements?.pelvicTilt) {
    const currentValue = currentData.mobilityMeasurements.pelvicTilt.value;
    const previousValue = previousData?.mobilityMeasurements?.pelvicTilt?.value;
    
    if (previousValue !== undefined) {
      // For pelvic tilt, we want to be closer to normal range (4-7 degrees)
      const currentDeviation = Math.abs(currentValue - 5.5); // 5.5 is middle of normal range
      const previousDeviation = Math.abs(previousValue - 5.5);
      
      const improvementPercentage = ((previousDeviation - currentDeviation) / previousDeviation) * 100;
      const improvement = calculateImprovementCategory(improvementPercentage);
      mobilityImprovements.push(improvementPercentage);
      
      analysisResult.mobilityAnalysis.push({
        movement: 'Pelvic Tilt Angle',
        current: currentValue,
        previous: previousValue,
        improvement,
        improvementPercentage,
        notes: generateMobilityNotes('Pelvic Tilt Angle', improvement, improvementPercentage, currentValue),
        target: 5.5 // Middle of normal range
      });
    }
  }
  
  // Add target values to mobility analysis for visualization purposes
  analysisResult.mobilityAnalysis.forEach(mobility => {
    if (mobility.movement.includes('Knee Flexion')) {
      (mobility as any).target = 135; // Normal minimum knee flexion
    } else if (mobility.movement.includes('Knee Extension')) {
      (mobility as any).target = 0; // Target for full extension
    } else if (mobility.movement.includes('Pelvic Tilt')) {
      (mobility as any).target = 5.5; // Middle of normal range
    }
  });
  
  // Analyze imaging (simplified)
  if (currentData.imaging && currentData.imaging.length > 0) {
    // Group by body part to compare pre and post
    const imagingByBodyPart = new Map<string, ImagingData[]>();
    
    [...(previousData?.imaging || []), ...currentData.imaging].forEach(img => {
      if (!imagingByBodyPart.has(img.bodyPart)) {
        imagingByBodyPart.set(img.bodyPart, []);
      }
      imagingByBodyPart.get(img.bodyPart)?.push(img);
    });
    
    imagingByBodyPart.forEach((images, bodyPart) => {
      const preImage = images.find(img => img.stage === 'pre-treatment');
      const postImage = images.find(img => img.stage === 'post-treatment');
      
      if (preImage && postImage) {
        // In a real application, this would involve more sophisticated analysis
        // For now, we'll just add a placeholder
        analysisResult.imagingAnalysis.push({
          type: `${postImage.type.toUpperCase()} - ${bodyPart}`,
          findings: `Post-treatment ${postImage.type} of ${bodyPart} shows structural changes`,
          comparison: `Compared to pre-treatment imaging from ${new Date(preImage.date).toLocaleDateString()}`,
          improvement: 'moderate' // This would be determined by actual analysis
        });
      }
    });
  }
  
  // Calculate composite score using our new weighted method
  const compositeResult = calculateCompositeImprovement(
    biomarkerImprovements,
    anatomicalImprovements,
    mobilityImprovements,
    imagingImprovements
  );
  
  // Set overall progress based on composite score
  analysisResult.overallProgress = {
    status: compositeResult.category,
    summary: generateOverallSummary(compositeResult.category, currentData)
  };
  
  // Generate recommendations
  analysisResult.recommendations = generateRecommendations(analysisResult, currentData);
  
  return analysisResult;
};

/**
 * Generate overall progress summary
 */
const generateOverallSummary = (status: ImprovementCategory, currentData: OptmPatientData): string => {
  const patientName = currentData.name;
  const treatmentStage = currentData.treatmentStage;
  
  switch (status) {
    case 'significant':
      return `${patientName} shows significant improvement (>75%) across multiple metrics in the ${treatmentStage} treatment stage. Biomarkers indicate reduced inflammation and tissue repair progression. Mobility and anatomical measurements confirm excellent clinical progress.`;
    
    case 'moderate':
      return `${patientName} demonstrates moderate improvement (50-75%) in the ${treatmentStage} treatment stage. Several biomarkers are trending positively, and functional measurements show improved mobility.`;
    
    case 'minimal':
      return `${patientName} shows mild improvement (25-49%) in the ${treatmentStage} treatment stage. Some positive changes in biomarkers and measurements, but progress requires continued attention.`;
    
    case 'no-change':
      return `${patientName} shows minimal improvement (<25%) in most metrics during the ${treatmentStage} treatment stage. Treatment protocol may need adjustment to improve outcomes.`;
    
    case 'deterioration':
      return `${patientName} demonstrates deterioration in several key metrics during the ${treatmentStage} treatment stage. Urgent protocol revision and follow-up are recommended.`;
    
    default:
      return `${patientName} is currently in the ${treatmentStage} treatment stage. Insufficient data to determine overall progress.`;
  }
};

/**
 * Prepare data for visualization in the dashboard
 */
export const prepareVisualizationData = (
  currentData: OptmPatientData,
  previousData?: OptmPatientData,
  analysisResult?: OptmAnalysisResult
) => {
  // Biomarker chart data
  const biomarkerChartData = Object.entries(currentData.biomarkers)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const biomarker = key as keyof MusculoskeletalBiomarkers;
      const range = BIOMARKER_REFERENCE_RANGES[biomarker];
      const previousValue = previousData?.biomarkers?.[biomarker];
      
      return {
        name: biomarker,
        current: value,
        previous: previousValue || 0,
        min: range?.min || 0,
        max: range?.max || 0,
        referenceMax: range?.max || undefined,
        unit: range?.unit || '',
        improvement: previousValue ? ((previousValue - value) / previousValue) * 100 : 0
      };
    });
  
  // Anatomical measurement chart data
  const anatomicalChartData = [];
  
  // Add CTM data if available
  if (currentData.anatomicalMeasurements?.ctm !== undefined) {
    anatomicalChartData.push({
      name: 'CTM',
      current: currentData.anatomicalMeasurements.ctm,
      previous: previousData?.anatomicalMeasurements?.ctm || 0
    });
  }
  
  // Add CCM data if available
  if (currentData.anatomicalMeasurements?.ccm && currentData.anatomicalMeasurements.ccm.length > 0) {
    currentData.anatomicalMeasurements.ccm.forEach((ccm, index) => {
      anatomicalChartData.push({
        name: `CCM-${ccm.location}`,
        current: ccm.value,
        previous: previousData?.anatomicalMeasurements?.ccm?.[index]?.value || 0
      });
    });
  }
  
  // Mobility chart data
  const mobilityChartData = [];
  
  if (currentData.mobilityMeasurements?.kneeFlexion) {
    mobilityChartData.push({
      name: `Knee Flexion (${currentData.mobilityMeasurements.kneeFlexion.side})`,
      current: currentData.mobilityMeasurements.kneeFlexion.value,
      previous: previousData?.mobilityMeasurements?.kneeFlexion?.value || 0,
      target: 135, // Normal minimum knee flexion
      unit: '°'
    });
  }
  
  if (currentData.mobilityMeasurements?.kneeExtension) {
    mobilityChartData.push({
      name: `Knee Extension (${currentData.mobilityMeasurements.kneeExtension.side})`,
      current: currentData.mobilityMeasurements.kneeExtension.value,
      previous: previousData?.mobilityMeasurements?.kneeExtension?.value || 0,
      target: 0, // Target for full extension
      unit: '°'
    });
  }
  
  if (currentData.mobilityMeasurements?.pelvicTilt) {
    mobilityChartData.push({
      name: 'Pelvic Tilt',
      current: currentData.mobilityMeasurements.pelvicTilt.value,
      previous: previousData?.mobilityMeasurements?.pelvicTilt?.value || 0,
      target: 5.5, // Middle of normal range
      unit: '°'
    });
  }
  
  // Prepare radar chart data for composite view
  const radarChartData = [];
  
  // Normalize values for radar chart (0-100 scale)
  if (analysisResult) {
    // Biomarkers (convert to improvement percentage for visualization)
    analysisResult.biomarkerAnalysis.forEach(biomarker => {
      // Skip if improvement percentage is negative
      if (biomarker.improvementPercentage < 0) return;
      
      // Cap at 100% for visualization
      const normalizedValue = Math.min(biomarker.improvementPercentage, 100);
      
      radarChartData.push({
        metric: biomarker.marker,
        value: normalizedValue
      });
    });
    
    // Mobility
    analysisResult.mobilityAnalysis.forEach(mobility => {
      // Skip if improvement percentage is negative
      if (mobility.improvementPercentage < 0) return;
      
      // Cap at 100% for visualization
      const normalizedValue = Math.min(mobility.improvementPercentage, 100);
      
      radarChartData.push({
        metric: mobility.movement,
        value: normalizedValue
      });
    });
  }
  
  return {
    biomarkerChartData,
    anatomicalChartData,
    mobilityChartData,
    radarChartData,
    overallProgress: analysisResult?.overallProgress,
    recommendations: analysisResult?.recommendations
  };
};


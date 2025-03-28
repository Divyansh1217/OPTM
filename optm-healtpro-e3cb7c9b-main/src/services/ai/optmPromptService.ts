
import { callOpenAI } from './openaiClient';
import { OptmPatientData, OptmAnalysisResult } from '@/types/optm-health';

/**
 * Creates an AI prompt focused on OPTM patient data analysis
 * Structured according to the comprehensive formula-based approach
 */
export const generateOptmAnalysisPrompt = (
  currentData: OptmPatientData,
  previousData?: OptmPatientData,
  analysisResult?: OptmAnalysisResult,
) => {
  // Base system prompt that defines the AI's role and formulas
  const systemPrompt = `
You are an advanced AI assistant integrated into an OPTM Musculoskeletal Health Dashboard. Your task is to help doctors accurately assess and visually display real-time patient progress.

Please analyze the following patient data using these specific formulas:

1. BIOMARKER IMPROVEMENT:
   - When decrease indicates improvement (e.g., CRP, IL-6, TNF-α): 
     (Pre-treatment - Post-treatment) / Pre-treatment × 100
   - When increase indicates improvement (e.g., VEGF, BDNF): 
     (Post-treatment - Pre-treatment) / Pre-treatment × 100

2. ANATOMICAL IMPROVEMENT:
   - For inflammation reduction: 
     (Pre-treatment circumference - Post-treatment circumference) / Pre-treatment circumference × 100
   - For muscle increase: 
     (Post-treatment circumference - Pre-treatment circumference) / Pre-treatment circumference × 100

3. MOBILITY IMPROVEMENT:
   - For increased range of motion: 
     (Post-treatment angle - Pre-treatment angle) / Pre-treatment angle × 100
   - For decreased angle (e.g., pelvic tilt): 
     (Pre-treatment angle - Post-treatment angle) / Pre-treatment angle × 100

4. COMPOSITE SCORE (Weighted Average):
   (Sum of (Parameter Improvement % × Weight)) / Sum of Weights
   - Biomarkers: weight = 40
   - Anatomical: weight = 30
   - Mobility: weight = 20
   - Imaging: weight = 10

5. IMPROVEMENT CATEGORIES:
   - >75%: Significant improvement
   - 50-75%: Moderate improvement
   - 25-49%: Mild improvement
   - <25%: Minimal/No improvement
   - Negative values: Deterioration

`;

  // Format the current patient data
  const patientDataString = JSON.stringify({
    patientInfo: {
      id: currentData.patientId,
      name: currentData.name,
      age: currentData.age,
      gender: currentData.gender,
      treatmentStage: currentData.treatmentStage
    },
    currentData: {
      biomarkers: currentData.biomarkers,
      anatomicalMeasurements: currentData.anatomicalMeasurements,
      mobilityMeasurements: currentData.mobilityMeasurements,
    },
    previousData: previousData ? {
      biomarkers: previousData.biomarkers,
      anatomicalMeasurements: previousData.anatomicalMeasurements,
      mobilityMeasurements: previousData.mobilityMeasurements,
    } : null,
    existingAnalysis: analysisResult ? {
      overallProgress: analysisResult.overallProgress,
      biomarkerAnalysis: analysisResult.biomarkerAnalysis,
      anatomicalAnalysis: analysisResult.anatomicalAnalysis,
      mobilityAnalysis: analysisResult.mobilityAnalysis,
    } : null
  }, null, 2);

  // User prompt that asks for the specific analysis needed
  const userPrompt = `
Based on the formulas and categories provided, please analyze the following OPTM patient data:

${patientDataString}

Provide:
1. A concise summary of the patient's overall progress
2. Detailed calculations for key biomarkers, showing the formula applied and the percentage improvement
3. Analysis of anatomical and mobility measurements
4. The calculated composite score with the weighted formula
5. 3-5 personalized clinical recommendations based on the analysis
`;

  return { systemPrompt, userPrompt };
};

/**
 * Calls the OpenAI API to analyze OPTM patient data
 */
export const getAIAnalysis = async (
  currentData: OptmPatientData, 
  previousData?: OptmPatientData,
  analysisResult?: OptmAnalysisResult
): Promise<string> => {
  try {
    const { systemPrompt, userPrompt } = generateOptmAnalysisPrompt(
      currentData, 
      previousData,
      analysisResult
    );
    
    // Combine the prompts for the API call
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    
    // Call OpenAI using a more specialized model for medical analysis
    const response = await callOpenAI(fullPrompt, "gpt-4o");
    
    return response || "Analysis could not be generated";
  } catch (error) {
    console.error("Error generating OPTM analysis:", error);
    return "An error occurred while generating the analysis. Please try again.";
  }
};

/**
 * Generates doctor questions for the OPTM dashboard
 */
export const generateDoctorQuestion = async (
  question: string,
  patientData: OptmPatientData,
  analysisResult?: OptmAnalysisResult
): Promise<string> => {
  try {
    // Create a specialized prompt for answering doctor questions
    const prompt = `
You are an advanced musculoskeletal health AI assistant. A doctor has asked the following question about their patient:

"${question}"

Here is the patient's data:
${JSON.stringify({
  patientInfo: {
    id: patientData.patientId,
    name: patientData.name,
    age: patientData.age,
    gender: patientData.gender,
    treatmentStage: patientData.treatmentStage
  },
  biomarkers: patientData.biomarkers,
  anatomicalMeasurements: patientData.anatomicalMeasurements,
  mobilityMeasurements: patientData.mobilityMeasurements,
  analysis: analysisResult
}, null, 2)}

Please provide a detailed, medically accurate answer. Include:
1. Direct response to the question
2. Reference to specific patient data points that inform your answer
3. Any relevant research that could help the doctor
4. Appropriate cautions or limitations of the interpretation
`;

    const response = await callOpenAI(prompt, "gpt-4o");
    return response || "Unable to generate an answer at this time.";
  } catch (error) {
    console.error("Error generating doctor question response:", error);
    return "An error occurred while processing your question. Please try again.";
  }
};

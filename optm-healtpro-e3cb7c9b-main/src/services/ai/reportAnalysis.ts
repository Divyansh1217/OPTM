
import { MedicalAnalysis, ExtractedBiomarker } from '@/types/medicalData';
import { normalizeStatus } from './statusUtils';
import { getOpenAIClient } from './openaiClient';

// Process and extract medical information from a report
const extractReportAnalysis = async (reportContent: string): Promise<MedicalAnalysis> => {
  try {
    // Initialize OpenAI client
    const openai = getOpenAIClient();
    
    console.log("Processing report for AI analysis...");
    
    // Create a prompt to analyze the medical report
    const analysisPrompt = `
      You are a medical AI assistant specialized in analyzing medical reports.
      Analyze the following medical report text and extract key information.
      Be precise and only extract factual information present in the report.
      
      Medical Report:
      ${reportContent}
      
      Extract and organize information in the following JSON structure:
      {
        "summary": "A brief 2-3 sentence summary of the report",
        "keyFindings": ["List of key medical findings", "Maximum 5 items"],
        "recommendations": ["List of medical recommendations or next steps", "Maximum 3 items"],
        "extractedBiomarkers": [
          {
            "name": "Biomarker name (e.g., 'Glucose', 'HDL Cholesterol')",
            "value": "Numeric value or text value as appears in report",
            "unit": "Unit of measurement (e.g., 'mg/dL')",
            "normalRange": "Normal reference range from report if available",
            "status": "normal, elevated, low, or critical based on reference ranges"
          }
        ],
        "suggestedDiagnoses": ["Possible diagnoses mentioned in the report", "Maximum 3 items"]
      }
      
      Only include information explicitly stated in the report. If a field has no relevant information, use an empty array or null.
    `;
    
    // Call OpenAI API with the analysis prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a medical analysis assistant that extracts structured data from medical reports and returns it in JSON format only." 
        },
        { 
          role: "user", 
          content: analysisPrompt 
        }
      ],
      temperature: 0.3, // Lower temperature for more factual responses
      response_format: { type: "json_object" }
    });
    
    // Parse the response
    const responseText = response.choices[0].message.content || '';
    let analysisData;
    
    try {
      analysisData = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error);
      throw new Error("Invalid AI response format");
    }
    
    // Validate and normalize the extracted biomarkers
    const normalizedBiomarkers = (analysisData.extractedBiomarkers || []).map((biomarker: any): ExtractedBiomarker => {
      return {
        name: biomarker.name || "Unknown",
        value: biomarker.value || "",
        unit: biomarker.unit || "",
        normalRange: biomarker.normalRange || "",
        status: normalizeStatus(biomarker.status)
      };
    });
    
    // Construct the final analysis object
    const analysis: MedicalAnalysis = {
      id: "", // Will be set by the calling function
      reportId: "", // Will be set by the calling function
      timestamp: new Date().toISOString(),
      summary: analysisData.summary || "No summary available",
      keyFindings: analysisData.keyFindings || [],
      recommendations: analysisData.recommendations || [],
      extractedBiomarkers: normalizedBiomarkers,
      suggestedDiagnoses: analysisData.suggestedDiagnoses || []
    };
    
    console.log("AI analysis complete");
    return analysis;
    
  } catch (error) {
    console.error("Error in extractReportAnalysis:", error);
    
    // Return a basic fallback analysis object in case of error
    return {
      id: "",
      reportId: "",
      timestamp: new Date().toISOString(),
      summary: "Failed to analyze report due to technical issues.",
      keyFindings: ["Analysis failed - please try again later"],
      recommendations: ["Consult with healthcare provider for accurate interpretation"],
      extractedBiomarkers: [],
      suggestedDiagnoses: []
    };
  }
};

export default extractReportAnalysis;

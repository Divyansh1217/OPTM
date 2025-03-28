
import { MedicalAnalysis } from '@/types/medicalData';
import { callOpenAI } from '../ai/openaiClient';

/**
 * Service for generating insights from medical reports
 */
export class ReportInsightsService {
  /**
   * Generates AI insights from a medical report analysis
   */
  static async generateInsightsFromAnalysis(analysis: MedicalAnalysis): Promise<string> {
    try {
      const prompt = this.createInsightsPrompt(analysis);
      const response = await callOpenAI(prompt, "gpt-4o-mini");
      return response || "Unable to generate insights at this time.";
    } catch (error) {
      console.error("Error generating insights:", error);
      return "An error occurred while generating insights. Please try again later.";
    }
  }

  /**
   * Creates a prompt for the OpenAI API to generate insights
   */
  private static createInsightsPrompt(analysis: MedicalAnalysis): string {
    return `
      As a medical AI assistant, provide clinical insights for the following medical report analysis:
      
      Summary: ${analysis.summary}
      
      Key Findings:
      ${analysis.keyFindings.map(f => `- ${f}`).join('\n')}
      
      Biomarkers:
      ${analysis.extractedBiomarkers.map(b => 
        `- ${b.name}: ${b.value} ${b.unit} (${b.status}, normal range: ${b.normalRange})`
      ).join('\n')}
      
      Suggested Diagnoses:
      ${analysis.suggestedDiagnoses?.map(d => `- ${d}`).join('\n') || 'None provided'}
      
      Please provide:
      1. Your clinical assessment of these findings
      2. Potential implications for the patient's health
      3. Suggested follow-up tests or monitoring if appropriate
      4. Lifestyle recommendations based on these findings
      
      Keep your response concise, clear, and focused on actionable insights.
    `;
  }
}

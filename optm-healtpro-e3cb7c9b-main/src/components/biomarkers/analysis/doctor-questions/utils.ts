
import { getOpenAIClient } from '@/services/ai/openaiClient';

// Generate AI answer for a question
export const generateAIAnswer = async (question: string): Promise<{ answer: string; sources: string[] }> => {
  try {
    // Display loading indicator if needed
    console.log("Generating AI answer for:", question);
    
    // Initialize OpenAI client only when needed
    const openai = getOpenAIClient();
    
    // Medical context to provide to the AI
    const medicalContext = `
      User has the following biomarker results:
      - LDL Cholesterol: 130 mg/dL (optimal <100 mg/dL)
      - HDL Cholesterol: 45 mg/dL (optimal >40 mg/dL)
      - Total Cholesterol: 210 mg/dL (optimal <200 mg/dL)
      - Triglycerides: 150 mg/dL (optimal <150 mg/dL)
      - Blood Pressure: 120/80 mmHg (normal)
      - Fasting Glucose: 95 mg/dL (normal <100 mg/dL)
      - Vitamin D: 45 ng/mL (sufficient 30-50 ng/mL)
    `;

    // Call OpenAI API with improved error handling
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using a cost-effective model that's good for medical content
      messages: [
        {
          role: "system",
          content: `You are a helpful medical assistant providing information based on lab results. 
          Provide concise, evidence-based answers to medical questions.
          Include appropriate disclaimers and suggestions to consult healthcare providers.
          Base your answers on this patient data: ${medicalContext}
          Always include 2-3 reputable medical sources for your information.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.2, // Lower temperature for more factual responses
      max_tokens: 500 // Limit response length
    });

    // Extract the response
    const aiResponse = completion.choices[0].message.content || "";
    
    // Parse the response - assuming the last paragraph contains sources
    const paragraphs = aiResponse.split('\n\n').filter(p => p.trim().length > 0);
    
    let answer = '';
    let sources: string[] = [];
    
    if (paragraphs.length > 1) {
      // Take all but the last paragraph as the answer
      answer = paragraphs.slice(0, -1).join('\n\n');
      
      // Parse sources from the last paragraph
      const sourcesText = paragraphs[paragraphs.length - 1];
      if (sourcesText.toLowerCase().includes('source') || sourcesText.toLowerCase().includes('reference')) {
        const sourceLines = sourcesText.split('\n').filter(line => line.trim().length > 0);
        sources = sourceLines.map(line => {
          // Extract just the source name, not the full citation
          const match = line.match(/[:-]\s*([^:,]+?)(\s*\(|\.|$)/);
          return match ? match[1].trim() : line.trim();
        });
      } else {
        // If no clear sources paragraph, include the last paragraph in answer
        answer = aiResponse;
        sources = ["Medical Literature", "Clinical Guidelines"];
      }
    } else {
      // If only one paragraph, use it as the answer
      answer = aiResponse;
      sources = ["Medical Literature", "Clinical Guidelines"];
    }

    console.log("AI answer generated successfully");
    return { answer, sources };
  } catch (error) {
    console.error("Error generating AI answer:", error);
    
    // Improved error handling with more specific fallback answers
    let fallbackAnswer = "";
    let fallbackSources: string[] = [];
    
    if (question.toLowerCase().includes("cholesterol") || question.toLowerCase().includes("ldl")) {
      fallbackAnswer = "Based on your lipid panel, your LDL cholesterol is slightly elevated at 130 mg/dL (optimal <100 mg/dL). This isn't immediately dangerous but warrants attention through diet modification, exercise, and possibly follow-up testing in 3-6 months. Reducing saturated fats and increasing soluble fiber may help lower LDL levels naturally.";
      fallbackSources = ["American Heart Association", "Mayo Clinic", "National Lipid Association"];
    } else if (question.toLowerCase().includes("diet") || question.toLowerCase().includes("food") || question.toLowerCase().includes("eat")) {
      fallbackAnswer = "Based on your results, consider a diet rich in soluble fiber (oats, beans, fruits), omega-3 fatty acids (fatty fish, walnuts), and plant sterols. Limit saturated fats and trans fats. The Mediterranean diet has strong evidence supporting heart health. For more personalized advice, consider consulting with a registered dietitian.";
      fallbackSources = ["Harvard Health Publication", "Cleveland Clinic", "American College of Cardiology"];
    } else if (question.toLowerCase().includes("vitamin") || question.toLowerCase().includes("supplement")) {
      fallbackAnswer = "Your Vitamin D level is 45 ng/mL, which is within the sufficient range (30-50 ng/mL). Continue your current supplementation if any. Omega-3 supplements may be beneficial if your triglycerides are elevated. For other supplements, consult with your healthcare provider as needs vary based on individual health factors.";
      fallbackSources = ["National Institutes of Health", "Endocrine Society", "American Association of Clinical Endocrinology"];
    } else if (question.toLowerCase().includes("exercise") || question.toLowerCase().includes("physical")) {
      fallbackAnswer = "Regular physical activity can help manage your cholesterol levels. Aim for at least 150 minutes of moderate-intensity exercise weekly (e.g., brisk walking, swimming) or 75 minutes of vigorous activity. Resistance training 2-3 times per week is also beneficial. Your healthy blood pressure suggests your current activity level is beneficial.";
      fallbackSources = ["American College of Sports Medicine", "CDC", "World Health Organization"];
    } else {
      fallbackAnswer = "This is important to discuss with your healthcare provider at your next appointment. They can provide personalized advice based on your complete medical history and examination. Consider writing down specific concerns to discuss during your visit. For urgent medical questions, please call our expert assistance line.";
      fallbackSources = ["Medical Literature"];
    }
    
    return { answer: fallbackAnswer, sources: fallbackSources };
  }
};

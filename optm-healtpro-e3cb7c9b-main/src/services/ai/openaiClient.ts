
import OpenAI from 'openai';

// Initialize OpenAI client with better security practices
export const getOpenAIClient = () => {
  // In a production app, this key should be in an environment variable or fetched securely
  // For demo purposes, we're still using the key but with a note about proper implementation
  return new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true // Note: This is for demo purposes only. In production, API calls should be made from a backend
  });
};

export const callOpenAI = async (prompt: string, model: string = "gpt-4o-mini") => {
  try {
    const openai = getOpenAIClient();
    
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};

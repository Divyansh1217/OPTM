
import { FitnessData } from '@/hooks/useFitnessIntegration';
import { HealthInsightsData } from '@/hooks/dashboard/useHealthInsights';
import { callOpenAI } from './openaiClient';

// Function to generate personalized health insights from fitness data
export const analyzeHealthData = async (fitnessData: FitnessData): Promise<HealthInsightsData> => {
  // In a production app, we would send the fitness data to the OpenAI API
  // and get personalized insights based on the actual data
  
  try {
    // Extract key metrics for prompt context
    const heartRateAvg = fitnessData.heartRate.summary.average;
    const heartRateMin = fitnessData.heartRate.summary.min;
    const heartRateMax = fitnessData.heartRate.summary.max;
    
    const stepsAvg = fitnessData.steps.summary.average;
    const stepsTotal = fitnessData.steps.summary.total;
    
    const caloriesAvg = fitnessData.calories.summary.average;
    const caloriesTotal = fitnessData.calories.summary.total;
    
    // Create a detailed prompt for the AI
    const prompt = `
      As a medical AI assistant, analyze the following health metrics and provide personalized insights and recommendations:
      
      Cardiovascular metrics:
      - Average heart rate: ${heartRateAvg} bpm
      - Minimum heart rate: ${heartRateMin} bpm
      - Maximum heart rate: ${heartRateMax} bpm
      
      Activity metrics:
      - Average daily steps: ${stepsAvg}
      - Total weekly steps: ${stepsTotal}
      
      Energy metrics:
      - Average daily calories burned: ${caloriesAvg}
      - Total weekly calories burned: ${caloriesTotal}
      
      For each of the following health categories, provide:
      1. A personalized insight based on the metrics (2-3 sentences)
      2. One specific, actionable recommendation (1-2 sentences)
      3. A health score from 0-100
      
      Categories:
      - Cardiovascular Health
      - Muscle & Tissue Recovery
      - Nerve Health & Pain Sensitivity
      - Joint & Mobility Improvement
      - Sleep & Recovery
      - Overall Health Analysis
      
      Format the response as a JSON object with the following structure:
      {
        "cardiovascular": { "insight": "...", "recommendation": "...", "score": 75 },
        "muscular": { "insight": "...", "recommendation": "...", "score": 75 },
        "nervous": { "insight": "...", "recommendation": "...", "score": 75 },
        "mobility": { "insight": "...", "recommendation": "...", "score": 75 },
        "sleep": { "insight": "...", "recommendation": "...", "score": 75 },
        "overall": { "insight": "...", "recommendation": "...", "score": 75 }
      }
    `;
    
    // For a real implementation, we'd call OpenAI API here:
    // const response = await callOpenAI(prompt);
    // const parsedResponse = JSON.parse(response);
    
    // For demo purposes, simulate a delay and return mock insights
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate slightly varied insights based on the actual heart rate data
    const heartRateQuality = 
      heartRateAvg < 60 ? "excellent and indicates a well-trained cardiovascular system" :
      heartRateAvg < 70 ? "very good, suggesting healthy cardiovascular function" :
      heartRateAvg < 80 ? "within normal range, indicating adequate heart health" :
      "slightly elevated, which may indicate stress or reduced cardiovascular efficiency";
    
    const activityLevel = 
      stepsAvg < 3000 ? "low" :
      stepsAvg < 7000 ? "moderate" :
      "high";
    
    const mockInsights: HealthInsightsData = {
      cardiovascular: {
        insight: `Your resting heart rate (${Math.round(heartRateAvg)} bpm) is ${heartRateQuality}. Your heart rate variability shows a good recovery pattern after physical activity, with peaks of ${Math.round(heartRateMax)} bpm during active periods.`,
        recommendation: activityLevel === "low" 
          ? "Try to increase your daily activity by taking short 5-minute walks every hour to improve cardiovascular health." 
          : "Continue your current activity pattern and consider adding 1-2 sessions of interval training weekly for heart health optimization.",
        score: heartRateAvg < 70 ? 85 : heartRateAvg < 80 ? 75 : 65
      },
      muscular: {
        insight: `Based on your ${activityLevel} activity level (${Math.round(stepsAvg)} daily steps), your muscles are experiencing ${activityLevel === "low" ? "minimal stress" : activityLevel === "moderate" ? "moderate adaptation" : "good conditioning"}. Your movement patterns suggest balanced muscle engagement.`,
        recommendation: activityLevel === "low" 
          ? "Consider adding basic resistance training twice weekly to improve muscle tone and metabolism." 
          : "Your current activity supports good muscular health. Adding protein-rich foods within 30 minutes after exercise could enhance recovery.",
        score: activityLevel === "low" ? 65 : activityLevel === "moderate" ? 75 : 85
      },
      nervous: {
        insight: `Your nervous system responsiveness appears ${heartRateMax - heartRateMin > 40 ? "excellent" : "adequate"} based on heart rate adaptability. Your recovery patterns between active periods suggest ${heartRateMax - heartRateMin > 30 ? "good" : "moderate"} parasympathetic nervous system function.`,
        recommendation: heartRateMax - heartRateMin > 40
          ? "Continue your balanced activity pattern. Adding 5 minutes of mindfulness practice daily could further enhance nervous system regulation."
          : "Try incorporating breathing exercises (4 seconds in, 6 seconds out) for 5 minutes daily to improve autonomic nervous system balance.",
        score: heartRateMax - heartRateMin > 40 ? 85 : heartRateMax - heartRateMin > 30 ? 75 : 65
      },
      mobility: {
        insight: `Your movement data indicates ${activityLevel === "low" ? "limited" : activityLevel === "moderate" ? "adequate" : "good"} joint mobility throughout the day. Your daily activity pattern shows ${stepsAvg > 7000 ? "consistent" : "sporadic"} movement, which ${stepsAvg > 5000 ? "supports" : "may limit"} joint health.`,
        recommendation: stepsAvg < 5000
          ? "Incorporate gentle mobility exercises focusing on major joints for 5 minutes each morning to improve range of motion."
          : "Your activity level supports joint health. Consider adding targeted stretching for hips and shoulders to enhance mobility further.",
        score: stepsAvg > 7000 ? 85 : stepsAvg > 5000 ? 75 : 65
      },
      sleep: {
        insight: `Based on your heart rate patterns, your sleep quality appears ${heartRateMin < 60 ? "good" : "adequate"} with effective resting periods. Your recovery metrics suggest ${heartRateMin < 55 ? "efficient" : "normal"} nighttime recovery processes.`,
        recommendation: heartRateMin < 60
          ? "Maintain your current sleep routine. Consider reducing screen time 30 minutes before bed to potentially enhance deep sleep quality."
          : "Try establishing a more consistent sleep schedule and avoiding caffeine after 2 PM to improve your nighttime heart rate recovery.",
        score: heartRateMin < 55 ? 85 : heartRateMin < 60 ? 75 : 65
      },
      overall: {
        insight: `Your overall health metrics show ${activityLevel === "low" ? "room for improvement" : activityLevel === "moderate" ? "positive trends" : "strong indicators"}. The combination of your cardiovascular metrics and activity levels suggests ${stepsAvg > 7000 ? "good" : stepsAvg > 5000 ? "adequate" : "basic"} foundational health that can be further optimized.`,
        recommendation: activityLevel === "low"
          ? "Focus first on increasing daily movement through walking and basic strength exercises to establish a foundation for health improvement."
          : "Your health foundation is solid. Consider adding variety to your routine with new activities that challenge different aspects of fitness.",
        score: 
          (heartRateAvg < 70 ? 85 : heartRateAvg < 80 ? 75 : 65) * 0.3 + 
          (activityLevel === "low" ? 65 : activityLevel === "moderate" ? 75 : 85) * 0.3 +
          (heartRateMin < 55 ? 85 : heartRateMin < 60 ? 75 : 65) * 0.2 +
          (stepsAvg > 7000 ? 85 : stepsAvg > 5000 ? 75 : 65) * 0.2
      }
    };
    
    return mockInsights;
  } catch (error) {
    console.error("Error analyzing health data:", error);
    
    // Return default insights if the analysis fails
    return {
      cardiovascular: {
        insight: "Your heart rate patterns are within normal ranges. Continue monitoring for more personalized insights as more data becomes available.",
        recommendation: "Consider regular cardiovascular exercise like walking, swimming, or cycling to maintain heart health.",
        score: 70
      },
      muscular: {
        insight: "Your activity patterns suggest normal muscle function. Regular movement is supporting basic muscle health.",
        recommendation: "Including strength training 2-3 times per week could help improve muscle condition and metabolism.",
        score: 70
      },
      nervous: {
        insight: "Your nervous system appears to be functioning normally based on available data. More information would provide more specific insights.",
        recommendation: "Stress management techniques like deep breathing or meditation may help support nervous system health.",
        score: 70
      },
      mobility: {
        insight: "Your movement patterns indicate normal joint mobility. Regular activity is helping maintain basic joint function.",
        recommendation: "Adding specific mobility exercises or gentle stretching could help improve overall joint health.",
        score: 70
      },
      sleep: {
        insight: "Your recovery patterns suggest adequate sleep quality. Consistent sleep habits are important for overall health.",
        recommendation: "Aim for 7-9 hours of sleep and maintain a consistent sleep schedule for optimal recovery.",
        score: 70
      },
      overall: {
        insight: "Your overall health metrics are within normal ranges. Continue your health practices while gathering more data for personalized insights.",
        recommendation: "Focus on the fundamentals: regular activity, balanced nutrition, adequate sleep, and stress management.",
        score: 70
      }
    };
  }
};

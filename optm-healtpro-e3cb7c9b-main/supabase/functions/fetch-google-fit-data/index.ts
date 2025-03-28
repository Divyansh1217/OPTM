
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    console.log("Fetch Google Fit Data function invoked");
    
    // Parse request body
    const body = await req.json();
    const { userId, accessToken, timeRange = 'week', metricTypes = [] } = body;
    
    if (!userId || !accessToken) {
      console.error("Missing required parameters");
      return new Response(
        JSON.stringify({ error: "Missing userId or accessToken" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log(`Fetching Google Fit data for user: ${userId}, timeRange: ${timeRange}`);
    console.log(`Requested metric types:`, metricTypes);
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if token is valid by making a test request to Google Fit API
    const testResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataSources", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    // Handle token errors and try to refresh if needed
    if (testResponse.status === 401) {
      console.log("Access token expired, attempting to refresh");
      
      // Get refresh token from database
      const { data: connection, error: fetchError } = await supabase
        .from("fitness_connections")
        .select("refresh_token")
        .eq("user_id", userId)
        .eq("provider", "google_fit")
        .single();
      
      if (fetchError || !connection?.refresh_token) {
        console.error("Error fetching refresh token:", fetchError?.message || "No refresh token found");
        return new Response(
          JSON.stringify({ error: "Authentication failed. Please reconnect your Google Fit account." }),
          { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      // Try to refresh the token
      const refreshToken = connection.refresh_token;
      const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
      const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
      
      if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        console.error("Missing Google API credentials");
        return new Response(
          JSON.stringify({ error: "Server configuration error: Missing Google API credentials" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });
      
      if (!tokenResponse.ok) {
        console.error("Failed to refresh token:", await tokenResponse.text());
        return new Response(
          JSON.stringify({ error: "Failed to refresh authentication. Please reconnect your Google Fit account." }),
          { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      const newTokens = await tokenResponse.json();
      console.log("Token refreshed successfully");
      
      // Update the token in the database
      const { error: updateError } = await supabase
        .from("fitness_connections")
        .update({
          access_token: newTokens.access_token,
          expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
        })
        .eq("user_id", userId)
        .eq("provider", "google_fit");
      
      if (updateError) {
        console.error("Error updating token in database:", updateError.message);
      }
      
      // Return the new token to client for retry
      return new Response(
        JSON.stringify({ 
          refreshed: true, 
          message: "Token refreshed. Please retry your request." 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    if (!testResponse.ok) {
      console.error("Error accessing Google Fit API:", await testResponse.text());
      return new Response(
        JSON.stringify({ error: `Error accessing Google Fit API: ${testResponse.statusText}` }),
        { 
          status: testResponse.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Token is valid, fetch the requested data
    // For the purpose of this implementation, we'll return mock data
    // In a real implementation, you would make the appropriate Google Fit API calls here
    
    // Calculate time range (last 7 days by default)
    const endTime = new Date();
    const startTime = new Date();
    
    if (timeRange === 'day') {
      startTime.setDate(endTime.getDate() - 1);
    } else if (timeRange === 'week') {
      startTime.setDate(endTime.getDate() - 7);
    } else if (timeRange === 'month') {
      startTime.setMonth(endTime.getMonth() - 1);
    } else if (timeRange === 'year') {
      startTime.setFullYear(endTime.getFullYear() - 1);
    }
    
    // Mock data structure
    const mockData = {
      steps: generateMockTimeSeriesData(startTime, endTime, 2000, 12000),
      heart_rate: generateMockTimeSeriesData(startTime, endTime, 60, 100, 1),
      calories: generateMockTimeSeriesData(startTime, endTime, 1500, 3000),
      distance: generateMockTimeSeriesData(startTime, endTime, 0.5, 8, 1),
      sleep: generateMockSleepData(startTime, endTime),
      workout: generateMockWorkoutData(startTime, endTime),
    };
    
    // Update last_sync in the database
    const { error: updateError } = await supabase
      .from("fitness_connections")
      .update({
        last_sync: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("provider", "google_fit");
    
    if (updateError) {
      console.error("Error updating last_sync time:", updateError.message);
    }
    
    // Return the data
    return new Response(
      JSON.stringify({
        success: true,
        timeRange,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        data: mockData
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error in fetch-google-fit-data function:", error);
    return new Response(
      JSON.stringify({ error: `Internal server error: ${error.message}` }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Helper function to generate mock time series data
function generateMockTimeSeriesData(
  startTime: Date, 
  endTime: Date, 
  minValue: number, 
  maxValue: number,
  decimals: number = 0
) {
  const data = [];
  const timeSpan = endTime.getTime() - startTime.getTime();
  const numPoints = 24; // Generate 24 data points within the time range
  
  for (let i = 0; i < numPoints; i++) {
    const timestamp = new Date(startTime.getTime() + (timeSpan * (i / (numPoints - 1))));
    const value = Number((Math.random() * (maxValue - minValue) + minValue).toFixed(decimals));
    
    data.push({
      timestamp: timestamp.toISOString(),
      value
    });
  }
  
  return data;
}

// Helper function to generate mock sleep data
function generateMockSleepData(startTime: Date, endTime: Date) {
  const sleepData = [];
  const days = Math.ceil((endTime.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000));
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startTime);
    date.setDate(date.getDate() + i);
    
    // Set sleep start time (previous evening)
    const sleepStart = new Date(date);
    sleepStart.setHours(22 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0);
    
    // Set sleep end time (morning)
    const sleepEnd = new Date(date);
    sleepEnd.setDate(sleepEnd.getDate() + 1);
    sleepEnd.setHours(6 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0);
    
    // Calculate duration in hours
    const durationMs = sleepEnd.getTime() - sleepStart.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    
    // Generate sleep stages (deep, light, rem, awake)
    const deepSleepPercentage = 10 + Math.random() * 15;
    const remSleepPercentage = 15 + Math.random() * 10;
    const awakeSleepPercentage = 5 + Math.random() * 10;
    const lightSleepPercentage = 100 - deepSleepPercentage - remSleepPercentage - awakeSleepPercentage;
    
    sleepData.push({
      date: date.toISOString().split('T')[0],
      start: sleepStart.toISOString(),
      end: sleepEnd.toISOString(),
      duration: Number(durationHours.toFixed(2)),
      quality: Math.floor(70 + Math.random() * 30),
      stages: {
        deep: Number(deepSleepPercentage.toFixed(1)),
        light: Number(lightSleepPercentage.toFixed(1)),
        rem: Number(remSleepPercentage.toFixed(1)),
        awake: Number(awakeSleepPercentage.toFixed(1)),
      }
    });
  }
  
  return sleepData;
}

// Helper function to generate mock workout data
function generateMockWorkoutData(startTime: Date, endTime: Date) {
  const workoutTypes = [
    "Running", "Walking", "Cycling", "Swimming", "Strength Training",
    "Yoga", "HIIT", "Pilates", "Elliptical", "Rowing"
  ];
  
  const workoutData = [];
  const days = Math.ceil((endTime.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000));
  
  // Not every day has a workout, so generate fewer workouts than days
  const numWorkouts = Math.min(Math.floor(days * 0.6), 10);
  
  for (let i = 0; i < numWorkouts; i++) {
    const date = new Date(startTime);
    date.setDate(startTime.getDate() + Math.floor(Math.random() * days));
    
    // Set workout time
    const workoutTime = new Date(date);
    workoutTime.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), 0);
    
    // Random duration between 15-120 minutes
    const durationMinutes = 15 + Math.floor(Math.random() * 105);
    
    // Random workout type
    const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    
    // Calculate calories burned (roughly based on workout type and duration)
    let caloriesPerMinute;
    switch (workoutType) {
      case "Running": caloriesPerMinute = 10 + Math.random() * 5; break;
      case "Walking": caloriesPerMinute = 3 + Math.random() * 2; break;
      case "Cycling": caloriesPerMinute = 8 + Math.random() * 4; break;
      case "Swimming": caloriesPerMinute = 9 + Math.random() * 5; break;
      case "Strength Training": caloriesPerMinute = 6 + Math.random() * 3; break;
      case "HIIT": caloriesPerMinute = 12 + Math.random() * 6; break;
      default: caloriesPerMinute = 5 + Math.random() * 3;
    }
    
    const caloriesBurned = Math.floor(caloriesPerMinute * durationMinutes);
    
    workoutData.push({
      id: `workout-${i}`,
      type: workoutType,
      start: workoutTime.toISOString(),
      duration: durationMinutes,
      calories: caloriesBurned,
      distance: workoutType === "Running" || workoutType === "Walking" || workoutType === "Cycling" ? 
        Number((Math.random() * 10).toFixed(2)) : null,
      heartRate: {
        avg: Math.floor(110 + Math.random() * 40),
        max: Math.floor(150 + Math.random() * 30)
      }
    });
  }
  
  return workoutData;
}

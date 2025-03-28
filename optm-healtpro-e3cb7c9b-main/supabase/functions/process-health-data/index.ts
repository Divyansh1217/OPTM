
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, healthData } = await req.json();
    
    if (!userId || !healthData) {
      return new Response(
        JSON.stringify({ error: 'Missing userId or healthData' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Initialize Supabase client with auth context of function
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Process heart rate data
    if (healthData.vitalSigns?.heartRate) {
      await processHeartRateData(supabase, userId, healthData.vitalSigns.heartRate);
    }
    
    // Process blood pressure data
    if (healthData.vitalSigns?.bloodPressure) {
      await processBloodPressureData(supabase, userId, healthData.vitalSigns.bloodPressure);
    }
    
    // Process temperature data
    if (healthData.vitalSigns?.bodyTemperature) {
      await processTemperatureData(supabase, userId, healthData.vitalSigns.bodyTemperature);
    }
    
    // Process oxygen saturation data
    if (healthData.vitalSigns?.oxygenSaturation) {
      await processOxygenData(supabase, userId, healthData.vitalSigns.oxygenSaturation);
    }
    
    // Process activity data
    if (healthData.activity) {
      await processActivityData(supabase, userId, healthData.activity);
    }
    
    // Process sleep data
    if (healthData.sleep) {
      await processSleepData(supabase, userId, healthData.sleep);
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing health data:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Process heart rate data
async function processHeartRateData(supabase: any, userId: string, heartRateData: any) {
  const heartRate = {
    user_id: userId,
    data_type: 'heart_rate',
    value: heartRateData.value,
    source: heartRateData.source || 'Google Fit',
    unit: heartRateData.unit || 'bpm',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: {
      trend: heartRateData.trend || 'stable',
      change: heartRateData.change || 0
    }
  };
  
  const { error } = await supabase.from('fitness_data').insert(heartRate);
  
  if (error) {
    console.error('Error inserting heart rate data:', error);
    throw new Error(`Error inserting heart rate data: ${error.message}`);
  }
}

// Process blood pressure data
async function processBloodPressureData(supabase: any, userId: string, bloodPressureData: any) {
  const bloodPressure = {
    user_id: userId,
    data_type: 'blood_pressure',
    value: bloodPressureData.systolic, // Store systolic as numeric value
    source: bloodPressureData.source || 'Google Fit',
    unit: bloodPressureData.unit || 'mmHg',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: {
      systolic: bloodPressureData.systolic,
      diastolic: bloodPressureData.diastolic,
      trend: bloodPressureData.trend || 'stable',
      change: bloodPressureData.change || 0
    }
  };
  
  const { error } = await supabase.from('fitness_data').insert(bloodPressure);
  
  if (error) {
    console.error('Error inserting blood pressure data:', error);
    throw new Error(`Error inserting blood pressure data: ${error.message}`);
  }
}

// Process temperature data
async function processTemperatureData(supabase: any, userId: string, temperatureData: any) {
  const temperature = {
    user_id: userId,
    data_type: 'body_temperature',
    value: temperatureData.value,
    source: temperatureData.source || 'Google Fit',
    unit: temperatureData.unit || '°F',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: {
      trend: temperatureData.trend || 'stable',
      change: temperatureData.change || 0
    }
  };
  
  const { error } = await supabase.from('fitness_data').insert(temperature);
  
  if (error) {
    console.error('Error inserting temperature data:', error);
    throw new Error(`Error inserting temperature data: ${error.message}`);
  }
}

// Process oxygen saturation data
async function processOxygenData(supabase: any, userId: string, oxygenData: any) {
  const oxygen = {
    user_id: userId,
    data_type: 'oxygen_saturation',
    value: oxygenData.value,
    source: oxygenData.source || 'Google Fit',
    unit: oxygenData.unit || '%',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: {
      trend: oxygenData.trend || 'stable',
      change: oxygenData.change || 0
    }
  };
  
  const { error } = await supabase.from('fitness_data').insert(oxygen);
  
  if (error) {
    console.error('Error inserting oxygen data:', error);
    throw new Error(`Error inserting oxygen data: ${error.message}`);
  }
}

// Process activity data
async function processActivityData(supabase: any, userId: string, activityData: any) {
  const activity = {
    user_id: userId,
    data_type: 'activity',
    value: activityData.steps, // Store steps as numeric value
    source: 'Google Fit',
    unit: 'steps',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: activityData
  };
  
  const { error } = await supabase.from('fitness_data').insert(activity);
  
  if (error) {
    console.error('Error inserting activity data:', error);
    throw new Error(`Error inserting activity data: ${error.message}`);
  }
}

// Process sleep data
async function processSleepData(supabase: any, userId: string, sleepData: any) {
  const sleep = {
    user_id: userId,
    data_type: 'sleep',
    value: sleepData.duration, // Store duration as numeric value
    source: 'Google Fit',
    unit: 'hours',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    metadata: sleepData
  };
  
  const { error } = await supabase.from('fitness_data').insert(sleep);
  
  if (error) {
    console.error('Error inserting sleep data:', error);
    throw new Error(`Error inserting sleep data: ${error.message}`);
  }
}

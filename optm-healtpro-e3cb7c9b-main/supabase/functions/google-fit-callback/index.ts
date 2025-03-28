
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Google OAuth configuration
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const REDIRECT_URI = Deno.env.get("SUPABASE_URL") ? 
  `${Deno.env.get("SUPABASE_URL")}/functions/v1/google-fit-callback` : 
  "http://localhost:54321/functions/v1/google-fit-callback";

// Frontend URL for redirecting after OAuth
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Google Fit callback function invoked");
    
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state"); // Contains userId
    const error = url.searchParams.get("error");

    console.log(`Received: code=${code ? "present" : "missing"}, state=${state || "missing"}, error=${error || "none"}`);

    if (error) {
      console.error(`Google OAuth error: ${error}`);
      return redirectWithError(`Google OAuth error: ${error}`);
    }

    if (!code || !state) {
      console.error("Missing code or state parameter");
      return redirectWithError("Missing code or state parameter");
    }

    // Extract user ID from state (we set it as 'google_fit_{userId}')
    const userId = state.startsWith('google_fit_') ? state.substring(11) : state;
    console.log(`Extracted userId from state: ${userId}`);

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("Missing Google API credentials");
      return redirectWithError("Missing Google API credentials");
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    if (!supabase) {
      console.error("Failed to initialize Supabase client");
      return redirectWithError("Server configuration error");
    }

    console.log("Exchanging code for tokens");
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenResponseText = await tokenResponse.text();
    console.log(`Token response status: ${tokenResponse.status}`);
    
    if (!tokenResponse.ok) {
      console.error(`Error exchanging code for tokens: ${tokenResponseText}`);
      return redirectWithError(`Error exchanging code for tokens: Status ${tokenResponse.status}`);
    }

    let tokenData;
    try {
      tokenData = JSON.parse(tokenResponseText);
      console.log("Successfully obtained tokens");
    } catch (e) {
      console.error(`Error parsing token response: ${e.message}`);
      console.error(`Response text: ${tokenResponseText}`);
      return redirectWithError(`Error parsing token response: ${e.message}`);
    }

    // Store tokens in Supabase
    console.log(`Storing tokens for user: ${userId}`);

    // First, check if the user has an existing connection
    const { data: existingConnection, error: fetchError } = await supabase
      .from("fitness_connections")
      .select("*")
      .eq("user_id", userId)
      .eq("provider", "google_fit")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "not found" error
      console.error(`Error checking existing connection: ${fetchError.message}`);
      return redirectWithError(`Database error: ${fetchError.message}`);
    }

    // Create or update the connection
    const connectionData = {
      user_id: userId,
      provider: "google_fit",
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || (existingConnection?.refresh_token || null), // Keep existing refresh token if not provided
      scope: tokenData.scope,
      expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      last_sync: new Date().toISOString(),
      is_connected: true
    };

    let dbOperation;
    if (existingConnection) {
      // Update existing connection
      console.log(`Updating existing connection for user: ${userId}`);
      dbOperation = supabase
        .from("fitness_connections")
        .update(connectionData)
        .eq("id", existingConnection.id);
    } else {
      // Insert new connection
      console.log(`Creating new connection for user: ${userId}`);
      dbOperation = supabase
        .from("fitness_connections")
        .insert(connectionData);
    }

    const { error: upsertError } = await dbOperation;

    if (upsertError) {
      console.error(`Error storing tokens: ${upsertError.message}`);
      return redirectWithError(`Error storing tokens: ${upsertError.message}`);
    }

    console.log("Google Fit connection successful, redirecting to health apps page");
    // Redirect to health apps page with success message
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/health-apps?connected=true`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      },
    });
  } catch (error) {
    console.error("Error in google-fit-callback function:", error);
    return redirectWithError(`Server error: ${error.message}`);
  }

  function redirectWithError(errorMessage) {
    console.error(`Redirecting with error: ${errorMessage}`);
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${FRONTEND_URL}/health-apps?error=${encodeURIComponent(errorMessage)}`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      },
    });
  }
});

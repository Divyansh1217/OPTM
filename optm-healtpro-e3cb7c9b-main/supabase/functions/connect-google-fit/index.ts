
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Frontend URL for redirecting on error
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";

// Google Fit scopes - these are the permissions we're requesting
const SCOPES = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.location.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
].join(" ");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Google Fit connection function invoked");
    
    // Get user ID from query params
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      console.error("Missing userId parameter");
      return new Response(
        JSON.stringify({ error: "Missing userId parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing Google Fit connection for user: ${userId}`);

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("Missing Google API credentials");
      return redirectToFrontend("Google API credentials not configured", true);
    }

    // Store the state in a format we can identify later
    const state = `google_fit_${userId}`;
    
    console.log(`Generating OAuth URL with state: ${state}`);
    console.log(`Redirect URI: ${REDIRECT_URI}`);

    // Generate the Google OAuth URL
    const authUrl = new URL("https://accounts.google.com/o/oauth2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", SCOPES);
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");
    authUrl.searchParams.append("state", state); // Pass userId in state parameter

    const authUrlString = authUrl.toString();
    console.log(`Redirecting to Google OAuth: ${authUrlString}`);

    // Redirect to Google OAuth
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: authUrlString,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      },
    });
  } catch (error) {
    console.error("Error in connect-google-fit function:", error);
    return redirectToFrontend(`Error connecting to Google Fit: ${error.message}`, true);
  }

  // Helper function to redirect back to frontend with error message
  function redirectToFrontend(message, isError = false) {
    const redirectUrl = new URL(`${FRONTEND_URL}/health-apps`);
    if (isError) {
      redirectUrl.searchParams.append("error", encodeURIComponent(message));
    } else {
      redirectUrl.searchParams.append("message", encodeURIComponent(message));
    }

    console.log(`Redirecting to frontend with message: ${message}`);
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: redirectUrl.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      },
    });
  }
});

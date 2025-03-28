
-- Check if the fitness_connections table exists
CREATE TABLE IF NOT EXISTS public.fitness_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  scope TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_sync TIMESTAMP WITH TIME ZONE,
  is_connected BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Add comments to the table and columns
COMMENT ON TABLE public.fitness_connections IS 'Stores connections between users and fitness services like Google Fit';
COMMENT ON COLUMN public.fitness_connections.id IS 'Unique identifier for the connection';
COMMENT ON COLUMN public.fitness_connections.user_id IS 'User ID who owns this connection';
COMMENT ON COLUMN public.fitness_connections.provider IS 'Name of the fitness provider (e.g., google_fit, apple_health)';
COMMENT ON COLUMN public.fitness_connections.access_token IS 'OAuth access token for the provider';
COMMENT ON COLUMN public.fitness_connections.refresh_token IS 'OAuth refresh token for the provider';
COMMENT ON COLUMN public.fitness_connections.scope IS 'OAuth scopes granted by the user';
COMMENT ON COLUMN public.fitness_connections.expires_at IS 'When the access token expires';
COMMENT ON COLUMN public.fitness_connections.last_sync IS 'When data was last synced from this provider';
COMMENT ON COLUMN public.fitness_connections.is_connected IS 'Whether the connection is active';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_fitness_connections_user_id ON public.fitness_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_fitness_connections_provider ON public.fitness_connections(provider);

-- Apply row-level security
ALTER TABLE public.fitness_connections ENABLE ROW LEVEL SECURITY;

-- RLS policies for the fitness_connections table
DO $$ 
BEGIN
  -- Check if the policy already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'fitness_connections' AND policyname = 'fitness_connections_select_policy'
  ) THEN
    CREATE POLICY fitness_connections_select_policy ON public.fitness_connections
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'fitness_connections' AND policyname = 'fitness_connections_insert_policy'
  ) THEN
    CREATE POLICY fitness_connections_insert_policy ON public.fitness_connections
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'fitness_connections' AND policyname = 'fitness_connections_update_policy'
  ) THEN
    CREATE POLICY fitness_connections_update_policy ON public.fitness_connections
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'fitness_connections' AND policyname = 'fitness_connections_delete_policy'
  ) THEN
    CREATE POLICY fitness_connections_delete_policy ON public.fitness_connections
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

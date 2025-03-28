
-- These SQL migrations need to be executed in Supabase SQL Editor

-- Create a table to store fitness connections (OAuth tokens)
CREATE TABLE IF NOT EXISTS public.fitness_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  scope TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Create a table to store fitness data
CREATE TABLE IF NOT EXISTS public.fitness_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  data_type TEXT NOT NULL,
  source TEXT NOT NULL,
  unit TEXT NOT NULL,
  value NUMERIC NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies to fitness_connections table
ALTER TABLE public.fitness_connections ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their connections
CREATE POLICY "Users can view their own fitness connections"
  ON public.fitness_connections
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert only their connections
CREATE POLICY "Users can insert their own fitness connections"
  ON public.fitness_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their connections
CREATE POLICY "Users can update their own fitness connections" 
  ON public.fitness_connections
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete only their connections
CREATE POLICY "Users can delete their own fitness connections"
  ON public.fitness_connections
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add RLS policies to fitness_data table
ALTER TABLE public.fitness_data ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their data
CREATE POLICY "Users can view their own fitness data"
  ON public.fitness_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert only their data
CREATE POLICY "Users can insert their own fitness data"
  ON public.fitness_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index on user_id and data_type for faster queries
CREATE INDEX IF NOT EXISTS fitness_data_user_id_data_type_idx
  ON public.fitness_data (user_id, data_type);

-- Create index on user_id and source for faster queries
CREATE INDEX IF NOT EXISTS fitness_data_user_id_source_idx
  ON public.fitness_data (user_id, source);

-- Enable realtime for these tables
ALTER TABLE public.fitness_connections REPLICA IDENTITY FULL;
ALTER TABLE public.fitness_data REPLICA IDENTITY FULL;

BEGIN;
  -- Add tables to supabase_realtime publication
  ALTER PUBLICATION supabase_realtime ADD TABLE public.fitness_connections;
  ALTER PUBLICATION supabase_realtime ADD TABLE public.fitness_data;
COMMIT;

-- Create a function to get the latest fitness data for a user
CREATE OR REPLACE FUNCTION public.get_latest_fitness_data(
  user_id_param UUID,
  provider_param TEXT,
  data_type_param TEXT
)
RETURNS SETOF fitness_data
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM fitness_data 
  WHERE user_id = user_id_param 
  AND source = provider_param
  AND data_type = data_type_param
  ORDER BY start_time DESC
  LIMIT 1;
$$;

-- Create a function to get fitness data history for a user
CREATE OR REPLACE FUNCTION public.get_fitness_data_history(
  user_id_param UUID,
  provider_param TEXT,
  data_type_param TEXT,
  limit_param INTEGER
)
RETURNS SETOF fitness_data
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM fitness_data 
  WHERE user_id = user_id_param 
  AND source = provider_param
  AND data_type = data_type_param
  ORDER BY start_time DESC
  LIMIT limit_param;
$$;

-- Create a function to get all fitness connections for a user
CREATE OR REPLACE FUNCTION public.get_fitness_connections(
  user_id_param UUID
)
RETURNS SETOF fitness_connections
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM fitness_connections WHERE user_id = user_id_param;
$$;

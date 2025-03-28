export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analysis_sessions: {
        Row: {
          created_at: string
          end_time: string | null
          exercise_type: string
          id: string
          notes: string | null
          patient_id: string
          start_time: string
          summary: Json | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          exercise_type: string
          id?: string
          notes?: string | null
          patient_id: string
          start_time?: string
          summary?: Json | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          exercise_type?: string
          id?: string
          notes?: string | null
          patient_id?: string
          start_time?: string
          summary?: Json | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_type: string
          created_at: string
          date: string
          doctor_id: string
          duration: number
          id: string
          location: string | null
          notes: string | null
          patient_id: string
          status: string
          updated_at: string
        }
        Insert: {
          appointment_type: string
          created_at?: string
          date: string
          doctor_id: string
          duration?: number
          id?: string
          location?: string | null
          notes?: string | null
          patient_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_type?: string
          created_at?: string
          date?: string
          doctor_id?: string
          duration?: number
          id?: string
          location?: string | null
          notes?: string | null
          patient_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      body_analysis: {
        Row: {
          angles: Json
          biomarkers: Json | null
          created_at: string
          id: string
          metadata: Json | null
          patient_id: string
          posture_score: number | null
          session_id: string
          timestamp: string
        }
        Insert: {
          angles: Json
          biomarkers?: Json | null
          created_at?: string
          id?: string
          metadata?: Json | null
          patient_id: string
          posture_score?: number | null
          session_id: string
          timestamp?: string
        }
        Update: {
          angles?: Json
          biomarkers?: Json | null
          created_at?: string
          id?: string
          metadata?: Json | null
          patient_id?: string
          posture_score?: number | null
          session_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      exercise_sessions: {
        Row: {
          angles: Json
          created_at: string
          exercise_type: string
          id: string
          notes: string | null
          patient_id: string
          timestamp: string
        }
        Insert: {
          angles: Json
          created_at?: string
          exercise_type: string
          id?: string
          notes?: string | null
          patient_id: string
          timestamp?: string
        }
        Update: {
          angles?: Json
          created_at?: string
          exercise_type?: string
          id?: string
          notes?: string | null
          patient_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      fitness_connections: {
        Row: {
          access_token: string
          created_at: string
          expires_at: string
          id: string
          last_sync: string | null
          provider: string
          refresh_token: string
          scope: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at: string
          id?: string
          last_sync?: string | null
          provider: string
          refresh_token: string
          scope: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: string
          id?: string
          last_sync?: string | null
          provider?: string
          refresh_token?: string
          scope?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fitness_data: {
        Row: {
          created_at: string
          data_type: string
          end_time: string
          id: string
          metadata: Json | null
          source: string
          start_time: string
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          data_type: string
          end_time: string
          id?: string
          metadata?: Json | null
          source: string
          start_time: string
          unit: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          data_type?: string
          end_time?: string
          id?: string
          metadata?: Json | null
          source?: string
          start_time?: string
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          recipient_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string
          id: string
          name: string | null
          picture: string | null
          provider: string
          role: string
        }
        Insert: {
          email: string
          id: string
          name?: string | null
          picture?: string | null
          provider?: string
          role?: string
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          picture?: string | null
          provider?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_appointment_status: {
        Args: {
          appointment_id: string
          new_status: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

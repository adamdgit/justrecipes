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
      category: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      dietary_flags: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      dietary_flags_bt: {
        Row: {
          created_at: string
          dietary_ID: number | null
          id: number
          recipe_ID: number | null
        }
        Insert: {
          created_at?: string
          dietary_ID?: number | null
          id?: number
          recipe_ID?: number | null
        }
        Update: {
          created_at?: string
          dietary_ID?: number | null
          id?: number
          recipe_ID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dietary_flags_bt_dietary_ID_fkey"
            columns: ["dietary_ID"]
            isOneToOne: false
            referencedRelation: "dietary_flags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dietary_flags_bt_recipe_ID_fkey"
            columns: ["recipe_ID"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories_bt: {
        Row: {
          category_ID: number | null
          created_at: string
          id: number
          recipe_ID: number | null
        }
        Insert: {
          category_ID?: number | null
          created_at?: string
          id?: number
          recipe_ID?: number | null
        }
        Update: {
          category_ID?: number | null
          created_at?: string
          id?: number
          recipe_ID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_categories_bt_category_ID_fkey"
            columns: ["category_ID"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_categories_bt_recipe_ID_fkey"
            columns: ["recipe_ID"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          ingredients: string | null
          instructions: string | null
          name: string | null
          preview_img_url: string | null
          serves: string | null
          shorts_url: string | null
          time_minutes: number | null
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          preview_img_url?: string | null
          serves?: string | null
          shorts_url?: string | null
          time_minutes?: number | null
          rating: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          preview_img_url?: string | null
          serves?: string | null
          shorts_url?: string | null
          time_minutes?: number | null
          rating: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

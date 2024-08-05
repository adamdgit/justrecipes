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
      diet_restrictions: {
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
            referencedRelation: "diet_restrictions"
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
      ingredients: {
        Row: {
          brand: string | null
          calories: number | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          brand?: string | null
          calories?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          brand?: string | null
          calories?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      measurements: {
        Row: {
          created_at: string
          id: number
          is_metric: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_metric?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_metric?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      recipe_ingredients_bt: {
        Row: {
          amount: number | null
          created_at: string
          id: number
          ingredient_ID: number | null
          measurement_ID: number | null
          recipe_ID: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          ingredient_ID?: number | null
          measurement_ID?: number | null
          recipe_ID?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          ingredient_ID?: number | null
          measurement_ID?: number | null
          recipe_ID?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_bt_ingredient_ID_fkey"
            columns: ["ingredient_ID"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_bt_measurement_ID_fkey"
            columns: ["measurement_ID"]
            isOneToOne: false
            referencedRelation: "measurements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_bt_recipe_ID_fkey"
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
          instructions: string | null
          name: string | null
          preview_img_url: string | null
          rating: number | null
          serves: string | null
          shorts_url: string | null
          time_minutes: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          instructions?: string | null
          name?: string | null
          preview_img_url?: string | null
          rating?: number | null
          serves?: string | null
          shorts_url?: string | null
          time_minutes?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          instructions?: string | null
          name?: string | null
          preview_img_url?: string | null
          rating?: number | null
          serves?: string | null
          shorts_url?: string | null
          time_minutes?: number | null
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
   
// database tables types     
export type recipe = Database['public']['Tables']['recipes']['Row'];
export type recipe_ingredients_bt = Database['public']['Tables']['recipe_ingredients_bt']['Row'];
export type ingredients = Database['public']['Tables']['ingredients']['Row'];
export type measurements = Database['public']['Tables']['measurements']['Row'];
export type diet_restrictions = Database['public']['Tables']['diet_restrictions']['Row'];
export type dietary_flags_bt = Database['public']['Tables']['dietary_flags_bt']['Row'];
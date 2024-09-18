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
      categories: {
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
      ratings_tracking: {
        Row: {
          created_at: string
          id: number
          rating: number | null
          recipe_ID: number | null
          user_ID: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          rating?: number | null
          recipe_ID?: number | null
          user_ID?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          rating?: number | null
          recipe_ID?: number | null
          user_ID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_tracking_recipe_ID_fkey"
            columns: ["recipe_ID"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          recipe_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          recipe_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_categories_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cooking_time: string | null
          created_at: string | null
          description: string | null
          id: number
          ingredients: string | null
          instructions: string | null
          name: string | null
          rating: number | null
          rating_count: number | null
          serves: string | null
          video_id: string | null
        }
        Insert: {
          cooking_time?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          rating?: number | null
          rating_count?: number | null
          serves?: string | null
          video_id?: string | null
        }
        Update: {
          cooking_time?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          ingredients?: string | null
          instructions?: string | null
          name?: string | null
          rating?: number | null
          rating_count?: number | null
          serves?: string | null
          video_id?: string | null
        }
        Relationships: []
      }
      user_saved_recipes: {
        Row: {
          created_at: string
          id: number
          recipe_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          recipe_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          recipe_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
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

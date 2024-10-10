import { createClient } from '@/utils/supabase/server';

const getRecipeByID = async (id: string) => {
  const supabase = createClient()
  const { data: recipe, error } = await supabase.from("recipes")
  .select(`*,
      recipe_categories (category_id)
    `)
  .eq('id', Number(id))
  .single();

  // get related categories
  const { data: categories, error: categoryError } = await supabase.from("categories")
  .select('name')
  .in('id', recipe!.recipe_categories.map(x => x.category_id));

  if (error || categoryError) {
    return { error: true }
  }

  return { recipe, categories }
}

const getUserHasSavedRecipe = async (user_id: string, recipe_id: string) => {
  const supabase = createClient()
  const { data: savedRecipe, error: savedError } = await supabase.from('user_saved_recipes')
  .select(`*`)
  .eq('user_id', user_id)
  .eq('recipe_id', Number(recipe_id))
  .single();

  return { savedRecipe, savedError }
}

const getUserRating = async (user_id: string, recipe_id: string) => {
  const supabase = createClient()
  const { data: savedRating, error: ratingError } = await supabase.from('ratings_tracking')
    .select(`*`)
    .eq('user_ID', user_id)
    .eq('recipe_ID', Number(recipe_id))
    .single();

  return { savedRating, ratingError }
}

const getRecipesByQuery = async (query: string, start: number, end: number) => {
  const supabase = createClient();
  const { data: recipes, error } = await supabase.from("recipes")
    .select(`*,
      recipe_categories (category_id)
    `)
    .ilike('name', `%${query}%`)
    .range(start, end);

  return { recipes, error }
}

const getAllCategories = async () => {
  const supabase = createClient();
  const { data: categories, error: categoryError } = await supabase.from("categories").select("*");

  return { categories, categoryError }
}

const getUsersSavedRecipes = async (user_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('user_saved_recipes')
    .select(`
      recipes (*)
    `)
    .eq('user_id', user_id);

  return { data, error }
}

export {
  getRecipeByID,
  getUserHasSavedRecipe,
  getUserRating,
  getRecipesByQuery,
  getAllCategories,
  getUsersSavedRecipes
}
import { type NextRequest } from 'next/server'
import { NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import { getIDfromURL } from '@/utils/getIDfromURL';
import { AssistantResponse } from '@/types/main';

export async function POST(request: NextRequest, res: NextApiResponse) {
  const body: AssistantResponse = await request.json();
  const URL_ID = getIDfromURL(body?.video_url);

  const supabase = createClient();
  const { data, error: recipeError } = await supabase.from("recipes")
    .insert([
      {
        rating: null,
        rating_count: null,
        video_id: URL_ID,
        serves: null,
        name: body.recipe.name,   
        description: body.recipe.description, 
        // add newline chars to each string in the array before saving in database, 
        // don't add a newline for last item
        ingredients: body.recipe.ingredients
          .map((x: string, idx: number) => 
            idx !== body.recipe.ingredients.length -1 ? x.concat("\n") : x
          ).join(''),
        instructions: body.recipe.instructions
          .map((x: string, idx: number) => 
            idx !== body.recipe.instructions.length -1 ? x.concat("\n") : x
          ).join(''),
        cooking_time: body.recipe.cooking_time,
      }
    ])
    .select();

  if (recipeError) {
    return new Response(null, { statusText: recipeError.message, status: 401 });
  }

  // get categories ID's from the categories table
  const { data: categoryData, error: categoryError } = await supabase.from('categories')
    .select('id')
    .in('name', body.recipe.categories);

  if (categoryError) {
    // roll back inserted data if something goes wrong
    await supabase.from('recipes')
      .delete()
      .eq('id', data[0].id);

    return new Response(null, { statusText: categoryError.message, status: 401 });
  }

  // creating relational data array for recipe_categories table
  const recipeCategories = categoryData.map(category => ({
    recipe_id: data[0].id,
    category_id: category.id
  }));

  // insert categories by ID, related to this newly created recipe
  const { error: recipeCategoriesError } = await supabase.from('recipe_categories')
    .insert(recipeCategories);
  
  if (recipeCategoriesError) {
    // roll back inserted data if something goes wrong
    await supabase.from('recipes')
    .delete()
    .eq('id', data[0].id);

    return new Response(null, { statusText: recipeCategoriesError.message, status: 401 });
  }

  // return item ID to use on frontend for displaying link to the newly added item
  const item_id = data[0].id;
    
  // handle invalid urls
  return new Response(JSON.stringify({"item_id": item_id}), { statusText: "Recipe created successfully", status: 200 });
}
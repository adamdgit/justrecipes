import { type NextRequest } from 'next/server'
import { NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import { getIDfromURL } from '@/utils/getIDfromURL';

export async function POST(request: NextRequest, res: NextApiResponse) {
  const body = await request.json()
  const URL_ID = getIDfromURL(body?.shorts_url);

  const supabase = createClient();
  const { data, error } = await supabase.from("recipes")
    .insert([
      {
        rating: null, 
        rating_count: null,
        shorts_url: URL_ID,
        preview_img_url: `https://img.youtube.com/vi/${URL_ID}/hqdefault.jpg`,
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
    .select()
  
  console.log(error)
  console.log(data)

  if (error) {
    return new Response(null, { statusText: error.message, status: 401 });
  }

  // return item ID to use on frontend for displaying link to the newly added item
  const item_id = data[0].id;
    
  // handle invalid urls
  return new Response(JSON.stringify({"item_id": item_id}), { statusText: "Recipe created successfully", status: 200 });
}
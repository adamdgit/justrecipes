import { type NextRequest } from 'next/server'
import { NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest, res: NextApiResponse) {
  const searchParams = request.nextUrl.searchParams;
  const recipe_ID = searchParams.get('recipeid');
  const user_ID = searchParams.get('userid');

  if (!user_ID || !recipe_ID) {
    return new Response(null, { statusText: "Invalid or missing URL paramters", status: 400 });
  }

  const supabase = createClient();
  // Delete the record to unfollow
  const { error } = await supabase.from("user_saved_recipes")
    .delete()
    .eq("user_id", user_ID)
    .eq("recipe_id", Number(recipe_ID))

  if (error) {
    return new Response(null, { statusText: error.message, status: 401 });
  }
    
  return new Response(null, { statusText: "Recipe saved successfully", status: 200 });
}
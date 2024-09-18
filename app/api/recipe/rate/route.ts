import { type NextRequest } from 'next/server'
import { NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest, res: NextApiResponse) {
  const searchParams = request.nextUrl.searchParams;
  const user_rating = searchParams.get('rating');
  const user_ID = searchParams.get('userid');
  const recipe_ID = searchParams.get('recipeid');

  if (!user_ID || !user_rating || ! recipe_ID) {
    return new Response(null, { statusText: "Invalid or missing URL paramters", status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from("ratings_tracking")
    .insert([
      {
        user_ID: user_ID,
        recipe_ID: Number(recipe_ID),
        rating: Number(user_rating)
      }
    ])
  
  if (error) {
    return new Response(null, { statusText: error.message, status: 401 });
  } 

  const { data, error: ratingError } = await supabase.from("recipes")
    .select('rating, rating_count')
    .eq('id', recipe_ID)
    .single()
    
  if (ratingError) {
    return new Response(null, { statusText: ratingError.message, status: 401 });
  } 

  let { rating, rating_count } = data;
  // if no rating, default should be 0
  if (!rating_count) rating_count = 0;
  if (!rating) rating = 0;

  const newRatingCount = rating_count +1;
  // calculates new average rating rounded up to .5
  const newRating = (rating * rating_count + Number(user_rating)) / newRatingCount;
  const roundedRating = Math.round(newRating * 2) / 2;

  const { error: updateError } = await supabase.from('recipes')
    .update({
      rating: roundedRating,
      rating_count: newRatingCount,
    })
    .eq('id', recipe_ID)

  if (updateError) {
    return new Response(null, { statusText: updateError.message, status: 401 });
  } 

  return new Response(null, { statusText: "Rating updated successfully", status: 200 });
}
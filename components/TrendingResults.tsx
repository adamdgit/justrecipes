import { createClient } from '@/utils/supabase/server';
import React from 'react'

export default async function TrendingResults() {

  const supabase = createClient();
  const { data: recipes, error: recipeError } = await supabase.from("recipes")
    .select("*")
    .gt('rating', 8)
    .limit(15);

  return (
    <ul className='search-results-list'>
      {recipes?.map(recipe => 
      <li>
        <h3>{recipe.name}</h3>
        <a href={`http://localhost:3000/recipes/${recipe.id}`}><img src={recipe.preview_img_url ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' /></a>
        <span>{recipe.description}</span>
        <span>Rating: {recipe.rating}</span>
        <span>Serves: {recipe.serves}</span>
      </li>)}
    </ul>
  )
}

import { createClient } from '@/utils/supabase/server';
import React from 'react'

export default async function page({ params, searchParams,}: 
{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.query;
  const name = searchParams?.name;

  const supabase = createClient();
  const { data: recipes, error: recipeError } = await supabase.from("recipes")
    .select("*")
    .like('name', `%${query}%`);

  return (
    <div>
      <h2>Search Results:</h2>
      {recipes?.map(recipe => 
        <ul>
          <li>{recipe.name}</li>
          <li>
            <a href={`http://localhost:3000/recipes/${recipe.id}`}><img src={recipe.preview_img_url ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' /></a>
          </li>
          <li>{recipe.description}</li>
          <li>Rating: {recipe.rating}</li>
          <li>Serves: {recipe.serves}</li>
        </ul>)}
    </div>
  )
}

import React from 'react'
import { createClient } from '@/utils/supabase/server';

export default async function Recipe({ id }: { id: string }){

  const supabase = createClient();
  const { data, error: recipeError } = await supabase.from("recipes")
    .select("*")
    .eq('id', Number(id));

  if (recipeError) return <p>Error: {recipeError.message}</p>

  // always returns 1 result in an array as we are selecting by unique ID
  const recipe = data[0];

  return (
    <React.Fragment>
    <h3>{recipe.name}</h3>
    <div className='recipe-full'>
      <div className='recipe-left-half'>
        <img src={recipe.preview_img_url ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' />
        <span>{recipe.description}</span>

        <span className='heading-small'>Ingredients: </span>
        <ul className='ingredients-list'>
          {recipe.ingredients?.split("\n").map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>

        <span className='heading-small'>Instructions: </span>
        <ol className='instructions-list'>
          {recipe.instructions?.split('\n').map(instruction => {
            return <li>{instruction}</li>
          })}
        </ol>
      </div>

      <div className='recipe-right-half'>
        <iframe width="320" height="640" src={`https://www.youtube.com/embed/${recipe?.shorts_url}` ?? 'no video found'} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
    </React.Fragment>
  )
}

import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';
import SaveRecipe from './SaveRecipe';

export default async function Recipe({ id }: { id: string }){

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error: recipeError } = await supabase.from("recipes")
    .select("*")
    .eq('id', Number(id));

  if (recipeError) return <p>Error: {recipeError.message}</p>

  // always returns 1 result in an array as we are selecting by unique ID
  const recipe = data[0];

  return (
    <React.Fragment>
      <div className='recipe-like'>
        <h2>{recipe.name}</h2>
        <SaveRecipe id={id} user_ID={user?.id ?? ""} />
      </div>

      <div className='recipe-full'>
        <div className='recipe-left-half'>
          <Rating rating={recipe.rating ?? 0} /> 
          <span className='cooking-time'>
            Cooking Time: 
            <FontAwesomeIcon icon={faClock} width={20} height={20} />
            {recipe.cooking_time}
          </span>
          <span>{recipe.description}</span>

          <span className='heading-small'>Ingredients: </span>
          <ul className='ingredients-list'>
            {recipe.ingredients?.split("\n").map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>
            })}
          </ul>

          <span className='heading-small'>Instructions: </span>
          <ol className='instructions-list'>
            {recipe.instructions?.split('\n').map((instruction, i) => {
              return <li key={i}>{instruction}</li>
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

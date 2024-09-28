import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';
import SaveRecipe from './SaveRecipe';
import ErrorMessage from './ErrorMessage';

export default async function Recipe({ id }: { id: string }){
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // get recipe by id
  const { data: recipe, error } = await supabase.from("recipes")
    .select(`*,
        recipe_categories (category_id)
      `)
    .eq('id', Number(id))
    .single();

  if (error) return <ErrorMessage msg={"Error fetching recipe info"} needsUpdate={true} />

  // get related categories
  const { data: categories, error: categoryError } = await supabase.from("categories")
    .select('name')
    .in('id', recipe?.recipe_categories.map(x => x.category_id));

  if (categoryError) return <ErrorMessage msg={"Error fetching recipe info"} needsUpdate={true} />

  let isSaved = false;
  let userRating = 0;
  // check if recipe is saved or not for user, if logged in
  if (user) {
    const { data: savedRecipe, error: savedError } = await supabase.from('user_saved_recipes')
      .select(`*`)
      .eq('user_id', user.id)
      .eq('recipe_id', Number(id))
      .single();

    if (savedError) {
      console.log('Error fetching saved recipes')
    }

    // if a result returns the recipe has been saved by user
    if (savedRecipe) {
      isSaved = true;
    }

    const { data: savedRating, error: ratingError } = await supabase.from('ratings_tracking')
      .select(`*`)
      .eq('user_ID', user.id)
      .eq('recipe_ID', Number(id))
      .single();

    if (ratingError) {
      console.log('Error fetching ratings')
    }
    
    if (savedRating) {
      userRating = savedRating.rating ?? 0;
    }
  }

  return (
    <React.Fragment>
      <div className='recipe-like'>
        <h2>{recipe.name}</h2>
        {user && <SaveRecipe id={id} user_ID={user?.id ?? null} isSaved={isSaved} />}
      </div>

      <div className='recipe-full'>
        <div className='recipe-left-half'>
          <Rating 
            user_id={user?.id ?? null}
            rating={recipe.rating ?? 0} 
            user_rating={userRating}
            count={recipe.rating_count ?? 0} 
            recipe_id={recipe.id}
          /> 
          <span className='cooking-time'>
            Cooking Time: 
            <FontAwesomeIcon icon={faClock} width={20} height={20} />
            {recipe.cooking_time}
          </span>
          <span>{recipe.description}</span>

          <span>Categories: </span>
          <ul className='categories-list'>
            {categories?.map(cat => {
              return <li key={cat.name}>{cat.name}</li>
            })}
          </ul>

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
          <iframe width="320" height="640" src={`https://www.youtube.com/embed/${recipe?.video_id}` ?? 'no video found'} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    </React.Fragment>
  )
}

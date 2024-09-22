import { Database } from '@/types/supabase';
import React from 'react'
import Rating from './Rating';

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
type ResultsProps = {
  data: Recipe[] | null;
};

export default function Results({ data } : ResultsProps) {

  if (data?.length === 0) return (
    <p>You have no saved recipes</p>
  )

  return (
    <div className='results-list'>
    {data && data?.map(recipe => 
      <a href={`http://localhost:3000/recipes/${recipe.id}`} 
        key={recipe.id}
        className='result-link'>
        <img src={`https://img.youtube.com/vi/${recipe.video_id}/hqdefault.jpg` ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' />
        <div className='result-text'>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <p>Cooking Time: {recipe.cooking_time}</p>
          <Rating 
            user_id={null}
            rating={recipe.rating ?? 0} 
            user_rating={0}
            count={recipe.rating_count ?? 0} 
            recipe_id={recipe.id}
          />
        </div>
      </a>)}
    </div>
  )
}
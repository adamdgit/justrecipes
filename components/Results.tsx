import { Database } from '@/types/supabase';
import React from 'react'
import Rating from './Rating';

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
type ResultsProps = {
  data: Recipe[] | null;
};

export default async function Results({ data } : ResultsProps) {

  return (
    <div className='results-list'>
    {data && data?.map(recipe => 
      <a href={`http://localhost:3000/recipes/${recipe.id}`} 
        key={recipe.id}
        className='result-link'>
        <img src={recipe.preview_img_url ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' />
        <div className='result-text'>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <p>Cooking Time: {recipe.cooking_time}</p>
          <Rating 
            user_id={null}
            rating={recipe.rating ?? 0} 
            count={recipe.rating_count ?? 0} 
          />
        </div>
      </a>)}
    </div>
  )
}
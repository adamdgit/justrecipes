import { Database } from '@/types/supabase';
import React from 'react'

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
type ResultsProps = {
  data: Recipe[] | null;
};

export default async function Results({ data } : ResultsProps) {

  return (
    <div className='results-list'>
    {data?.map(recipe => 
      <a href={`http://localhost:3000/recipes/${recipe.id}`} className='result-link'>
        <img src={recipe.preview_img_url ?? ''} alt={recipe.name + ' preview image'} className='recipe-img' />
        <h2>{recipe.name}</h2>
        <div className='result-text'>
          <p>{recipe.description}</p>
          <p>Rating: {recipe.rating}</p>
          <p>Serves: {recipe.serves}</p>
        </div>
      </a>)}
    </div>
  )
}

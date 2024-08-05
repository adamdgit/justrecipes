import React from 'react'
import { createClient } from '@/utils/supabase/server';

export default async function Recipe({ search }: {search:string}){

  const supabase = createClient();
  const { data: recipes, error: recipeError } = await supabase.from("recipes").select("*").like("name", `%${search}%`);

  if (recipeError) return <p>Error: {recipeError.message}</p>

  // typescript inference not working
  const { data: ingredients,  error: ingredientsError } = await supabase.from("recipe_ingredients_bt")
    .select(
      `
        *,
        ingredients (
          id, name
        ),
        measurements (
          id, name
        )
    `
  ).eq("recipe_ID", recipes[0].id);

  if (ingredientsError) return <p>Error: {ingredientsError.message}</p>

  return (
    <React.Fragment>
      <h2>Recipe of the day</h2>

      {recipes?.map(item => {
        return <div>
          <ul>
            <li>
              <img src={item.preview_img_url ?? ''} alt={item.name + ' preview image'} className='recipe-img' />
            </li>
            <li>{item.name}</li>
            <li>{item.description}</li>
          </ul>
          <p>Instructions: </p>
          <ol>
            {item.instructions?.split('\n').map(line => {
              return <li>{line}</li>
            })}
          </ol>
        </div>
      })}

      <p>Ingredients: </p>

      {ingredients?.map(ingredient => {
        return <ul>
          <li>
            {ingredient.amount} {ingredient.measurements.name === 'self' ? '' : ingredient.measurements.name}
            {' ' + ingredient.ingredients.name}
          </li>
        </ul>
      })}
    </React.Fragment>
  )
}

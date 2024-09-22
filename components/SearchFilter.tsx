'use client'

import React, { useState } from 'react'
import Results from './Results'
import { Database } from '@/types/supabase';

type Recipe = Database["public"]["Tables"]["recipes"]["Row"] & {
  recipe_categories: { category_id: number; }[];
};
type Category = {
  created_at: string;
  id: number;
  name: string | null;
}
type Props = {
  data: Recipe[],
  categories: Category[]
}

export default function SearchFilter({ data, categories } : Props) {
  const [recipes, setRecipes] = useState(data);
  const [filteredRecipes, setFilteredRecipes] = useState(data);

  // returns recipes which are the same category as selected from dropdown
  const filterCategories = (category: string) => {
    const filtered = recipes.filter(x => {
      return x.recipe_categories.some(cat => cat.category_id === Number(category))
    });
    setFilteredRecipes(filtered)
  }

  
  return (
    <div> 
      <label htmlFor='categories'>Filter by category: </label>
      <select 
        className='filter-dropdown'
        name='categories' 
        onChange={(e) => filterCategories(e.currentTarget.value)}>
        {categories && categories.map(cat => {
          return <option key={cat.id} value={cat.id}>{cat.name ?? ""}</option>
        })}
      </select>

      {filteredRecipes && <Results data={filteredRecipes} />}
    </div>
  )
}
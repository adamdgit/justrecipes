'use client'

import React, { useEffect, useState } from 'react'
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
  const [recipes] = useState(data);
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("descending");

  useEffect(() => {
    applyFilter();
  },[category, rating])

  // apply each filter in order
  const applyFilter = () => {
    // if no category filter, return all recipes
    const filter1 = category === "" ? recipes : [...recipes].filter(x => {
      return x.recipe_categories.some(cat => cat.category_id === Number(category))
    });

    // if no rating filter, return filter1
    const filter2 = rating === "" ? filter1 : [...filter1].sort((a, b) => {
      if (!a.rating) a.rating = 0
      if (!b.rating) b.rating = 0
      return rating === "ascending" ? a.rating - b.rating : b.rating - a.rating;
    });

    setFilteredRecipes(filter2);
  }
  
  return (
    <React.Fragment> 
      <h3>Filters</h3>
      <div className='filters-wrap'>
        <label htmlFor='categories'>Category: </label>
        <select 
          className='filter-dropdown'
          name='categories' 
          onChange={(e) => setCategory(e.currentTarget.value)}
        >
          <option value={""} defaultValue={""}>- Default</option>
          {categories && categories.map(cat => {
            return <option key={cat.id} value={cat.id}>{cat.name ?? ""}</option>
          })}
        </select>

        <label htmlFor='ratings'>Rating: </label>
        <select 
          className='filter-dropdown'
          name='ratings' 
          onChange={(e) => setRating(e.currentTarget.value)}
        >
          <option value={""} defaultValue={""}>- Default</option>
          <option value={"ascending"}>Low - High</option>
          <option value={"descending"}>High - Low</option>
        </select>
      </div>

      {filteredRecipes && <Results data={filteredRecipes} />}
    </React.Fragment>
  )
}
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import SearchFilter from '@/components/SearchFilter';
import { CalcStartAndEnd } from '@/utils/calcStartAndEnd';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function page({ params, searchParams,}: 
{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.query as string;
  const [start, end] = CalcStartAndEnd(searchParams?.start)

  const supabase = createClient();
  const { data: recipes, error } = await supabase.from("recipes")
    .select(`*,
      recipe_categories (category_id)
    `)
    .ilike('name', `%${query}%`)
    .range(start, end);
    
  if (error) return (
    <ErrorMessage msg={"Error fetching recipes"} needsUpdate={true} />
  )

  const { data: categories, error: categoryError } = await supabase.from("categories")
    .select("*");

  if (categoryError) return (
    console.log("Error fetching recipe categories")
  )

  return (
    <div className='content-wrap'>
      <h1>Search for Recipes</h1>
      <SearchFilter 
        data={recipes} 
        categories={categoryError ? [] : categories} 
      />
      <Pagination 
        start={start} 
        searchQuery={query} 
      />
    </div>
  )
}

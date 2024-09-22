import Pagination from '@/components/Pagination';
import SearchFilter from '@/components/SearchFilter';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function page({ params, searchParams,}: 
{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.query as string;
  let start = Number(searchParams?.start) ?? 0;
  let end = Number(searchParams?.end) ?? 20;

  // ensure end range is always +20 of the start
  let remainder = start % 20;
  if (remainder !== 0) start -= remainder; // start will always be multiple of 20
  if (end <= start || end > start + 20) end = start + 20;

  const supabase = createClient();
  const { data: recipes, error } = await supabase.from("recipes")
    .select(`*,
      recipe_categories (category_id)
    `)
    .ilike('name', `%${query}%`)
    .range(start, end);
    
  if (error) return (
    <span className='supabase-error'>Error fetching recipes</span>
  )

  const { data: categories, error: categoryError } = await supabase.from("categories")
    .select("*");

  if (categoryError) return (
    <span className='supabase-error'>Error fetching categories</span>
  )

  return (
    <React.Fragment>
      <h1>Search Results:</h1>
      <SearchFilter data={recipes} categories={categories} />
      <Pagination start={start} end={end} searchQuery={query} />
    </React.Fragment>
  )
}

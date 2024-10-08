import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import SearchFilter from '@/components/SearchFilter';
import { CalcStartAndEnd } from '@/utils/calcStartAndEnd';
import { getAllCategories, getRecipesByQuery } from '@/utils/supabase/actions';
import React from 'react';

export default async function page({ params, searchParams,}: 
{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.query as string;
  const [ start, end ] = CalcStartAndEnd(searchParams?.start)

  const { recipes, error } = await getRecipesByQuery(query, start, end);
  if (error) return (
    <ErrorMessage msg={"Error fetching recipes"} needsUpdate={true} />
  )

  const { categories, categoryError } = await getAllCategories();
  if (categoryError) return (
    console.log("Error fetching recipe categories")
  )

  return (
    <div className='content-wrap'>
      <h1>Search for Recipes</h1>
      <SearchFilter 
        data={recipes ? recipes : []} 
        categories={categories ? categories : []} 
      />
      <Pagination 
        start={start} 
        searchQuery={query} 
      />
    </div>
  )
}

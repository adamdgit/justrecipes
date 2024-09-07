import Results from '@/components/Results';
import { createClient } from '@/utils/supabase/server';

export default async function page({ params, searchParams,}: 
{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.query;

  const supabase = createClient();
  const { data: recipes, error } = await supabase.from("recipes")
    .select("*")
    .ilike('name', `%${query}%`)
    .limit(20);
    
  if (error) return <span className='supabase-error'>Something went wrong</span>

  return (
    <div className='content-wrap'>
      <h1>Search Results:</h1>
      {error 
        ? <span className='supabase-error'>Something went wrong</span>
        : <Results data={recipes} />}
    </div>
  )
}

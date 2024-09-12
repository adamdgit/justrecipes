import Results from '@/components/Results';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {

  const supabase = createClient();
  const { data: recipes, error } = await supabase.from("recipes")
    .select("*")
    .gte("rating", 4)
    .order("rating", { ascending: false })
    .limit(20);
      
  return (
    <div className='content-wrap'>  
      <h1>Top Recipes</h1>

      {error 
        ? <span className='supabase-error'>Something went wrong</span>
        : <Results data={recipes} />
      }
    </div>
  );
}

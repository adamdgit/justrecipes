import Results from '@/components/Results';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {

  const supabase = createClient();
  const { data: recipes, error: recipeError } = await supabase.from("recipes")
    .select("*")
    .gte("rating", 4)
    .limit(20);
      
  return (
    <div className='content-wrap'>  
      <h1>Top Recipes</h1>

      {recipeError 
        ? <span className='supabase-error'>Something went wrong</span>
        : <Results data={recipes} />}
    </div>
  );
}

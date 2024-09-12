import Results from '@/components/Results';
import { createClient } from '@/utils/supabase/server';

export default async function page() {

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not validated");

  const { data, error } = await supabase.from('user_saved_recipes')
  .select(`
    recipes (
      *
    )
  `)
  .eq('user_id', "99af8bf9-f1ca-4485-acdb-18b9f2d78a5d");
    
  if (error) return <span className='supabase-error'>Something went wrong</span>

  const savedRecipes = data ? data.map(x => x.recipes) : null;

  return (
    <div className='content-wrap'>
      <h1>Saved Recipes</h1>

      {error 
        ? <span className='supabase-error'>Something went wrong</span>
        : data && <Results data={savedRecipes} />
      }
    </div>
  )
}

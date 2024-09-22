import ErrorMessage from '@/components/ErrorMessage';
import Results from '@/components/Results';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase.from('user_saved_recipes')
  .select(`
    recipes (
      *
    )
  `)
  .eq('user_id', user.id);
    
  const savedRecipes = data ? data.flatMap(x => x.recipes ? [x.recipes] : []) : null;

  if (error) return (
    <ErrorMessage msg={"Error retrieving saved recipes"} />
  )

  return (
    <React.Fragment>
      <h1>Saved Recipes</h1>
     <Results data={savedRecipes} />
    </React.Fragment>
  )
}

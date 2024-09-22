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
    recipes (*)
  `)
  .eq('user_id', user.id);
    
  const savedRecipes = data ? data.flatMap(x => x.recipes ? [x.recipes] : []) : [];

  if (error) return (
    <ErrorMessage msg={"Error retrieving saved recipes"} needsUpdate={true} />
  )

  return (
    <React.Fragment>
      <h1>Saved Recipes</h1>
     {savedRecipes?.length > 0 ? <Results data={savedRecipes} /> :<p>No saved recipes</p>}
    </React.Fragment>
  )
}

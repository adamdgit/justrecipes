import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function Page() {
      
  return (
    <React.Fragment>  
      <h1>Welcome to Easy Recipes</h1>

      <p>Browse recipes for free</p>

      <p>OR</p>

      <p>Create an account to generate recipes from video, save recipes and more.</p>
    </React.Fragment>
  );
}

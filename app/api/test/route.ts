import { createClient } from '@/utils/supabase/server';
import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  console.log(query)

  const supabase = createClient();
  const { data: recipes, error: recipeError } = await supabase.from("recipes")
    .select("name")
    .like('name', `%${query}%`);

  if (recipeError) return NextResponse.error();

  console.log(recipes)
  // query is "hello" for /api/search?query=hello
  return NextResponse.json({res: recipes})
}

// handle search results from form
export async function POST(request: Request) {
  const formData = await request.formData()
  const search = formData.get('search')
  return Response.json({ search })
}
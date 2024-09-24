import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  const supabase = createClient();
  await supabase.auth.signOut();

  // URL to redirect to after logging out
  return NextResponse.redirect(`${origin}/login`);
}

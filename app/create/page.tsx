import Helper from "@/components/Helper";
import Transcribe from "@/components/Transcribe";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className='content-wrap'>
      <h1>Generate a recipe from video using AI</h1>
      <Helper />
      <Transcribe />
    </div>
  );
}

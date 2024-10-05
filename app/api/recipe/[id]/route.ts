import { type NextRequest } from 'next/server'
import { NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import { getIDfromURL } from '@/utils/getIDfromURL';
import { AssistantResponse } from '@/types/main';

export async function GET(request: NextRequest, { params }: {params: {id: string}}) {
  const { id: URL_ID } = params ?? "";
  console.log("ID server: ", URL_ID)
  // If video ID has already been transcribed return an error, frontend can link to the video
  const supabase = createClient();
  const { data, error } = await supabase.from("recipes")
    .select("video_id")
    .eq("video_id", URL_ID)
        
  if (data && data[0]?.video_id === URL_ID) {
    return new Response(URL_ID, { statusText: "Transcription for video already exists", status: 409 });
  }

  return new Response(null, { statusText: "No recipe conflict found", status: 200 });
}
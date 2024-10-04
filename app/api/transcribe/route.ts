import { type NextRequest } from 'next/server'
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";
import { NextApiResponse } from 'next';
import { isValidURL } from '@/utils/isValidURL';
import { getIDfromURL } from '@/utils/getIDfromURL';
import { createClient } from '@/utils/supabase/server';
import { fetchTranscript } from '@/utils/fetchTranscript';

export async function POST(request: NextRequest, res: NextApiResponse) {
  // get query string from url
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url') ?? "";
  const language = searchParams.get('lang') ?? "en";

  // handle invalid urls
  if (!isValidURL(url)) {
    return new Response(null, { statusText: "Invalid URL provided", status: 400 });
  }

  const URL_ID = getIDfromURL(url);

  // If video ID has already been transcribed return an error, frontend can link to the video
  const supabase = createClient();
  const { data, error } = await supabase.from("recipes")
    .select("video_id")
    .eq("video_id", URL_ID)
  
  if (data && data[0]?.video_id === URL_ID) {
    return new Response(URL_ID, { statusText: "Transcription for video already exists", status: 409 });
  }

  const { error: transcriptError, msg, data: transcriptData } = await fetchTranscript(URL_ID);

  if (!transcriptData) { 
    return new Response(URL_ID, { statusText: "Couldn't retrieve transcript", status: 400 }); 
  }

  if (transcriptError) {
    return new Response(URL_ID, { statusText: msg, status: 400 }); 
  }
  // let transcript;
  // try {
  //   transcript = await YoutubeTranscript.fetchTranscript(URL_ID);
  // } catch(error) {
  //   return new Response("youtube error", { statusText: "Could not find transcript for video", status: 400 });
  // }
  // // retuns only text values from transcript object
  // const formattedTranscript = transcript.map(obj => obj.text).join('');

  let result;
  try {
    // result is a readable stream
    result = await createGPTAssistant(transcriptData);
  } catch(err) {
    return new Response("gpt error", { statusText: "Streaming error", status: 400 });
  }

  return new Response(result, { 
      headers: {
        'Content-Type': 'text/plain',
        'cache-control': 'no-cache',
      }
  });
}


// create openai GPT assistant and return readable stream
async function createGPTAssistant(transcript: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
  const assistant = await openai.beta.assistants.retrieve("asst_B8t5h5HvPicELSNljrmD4Oi4");

  const stream = await openai.beta.threads.createAndRun({
    assistant_id: assistant.id,
    thread: {
      messages: [
        {
          role: "user",
          content: `Can you provide the recipe, ingredients with measurements and instructions for the given audio transcription of this recipe: ${transcript}`
        }
      ],
    },
    stream: true,
  });

  const encoder = new TextEncoder();
  // Convert OpenAI stream to ReadableStream
  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.event === 'thread.message.delta' && event.data?.delta?.content) {
            const chunk = event.data.delta.content?.[0];
            if (chunk && 'text' in chunk && chunk.text?.value) {
              controller.enqueue(encoder.encode(chunk.text.value));
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return readableStream;
}
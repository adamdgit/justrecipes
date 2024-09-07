import { NextResponse, type NextRequest } from 'next/server'
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from 'next';
import { isValidURL } from '@/utils/isValidURL';

export async function POST(request: NextRequest, res: NextApiResponse) {
  // get query string from url
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url') ?? "";
  const language = searchParams.get('lang') ?? "en";

  // handle invalid urls
  if (isValidURL(url)) {
    return NextResponse.json({ message: "Invalid URL provided", status: 400 });
  }

  // get ID from youtube url, needed for transcript function
  const URL_ID = url.split("/shorts/")[1]
  console.log(URL_ID)

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(URL_ID);
    // retuns only text values from transcript object
    const formattedTranscript = transcript.map(obj => obj.text);
    console.log(formattedTranscript)

    // result is a readable stream
    const result = await createGPTAssistant(formattedTranscript);
    // query is "hello" for /api/search?query=hello
    return new Response(result, { 
        headers: {
          'Content-Type': 'text/plain',
          'cache-control': 'no-cache'
        }
    });
  } catch(error) {
    console.log(error)
    return NextResponse.json({}, {status: 400, statusText: "Youtube transcription not available"})
  }
}


// create openai GPT assistant and return readable stream
async function createGPTAssistant(transcript: string[]) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
  const assistant = await openai.beta.assistants.retrieve("asst_B8t5h5HvPicELSNljrmD4Oi4");

  const stream = await openai.beta.threads.createAndRun({
    assistant_id: assistant.id,
    thread: {
      messages: [
        {
          role: "user",
          content: `Can you provide the recipe, ingredients, and measurements for the given audio transcription of this recipe: ${transcript.toString()}`
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
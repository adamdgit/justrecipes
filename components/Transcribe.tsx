'use client'

import React, { useState } from "react";
import { parse } from "partial-json";
import type { ErrorMsg, AssistantResponse } from "@/types/main";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
// fix for streaming issue deploy on vercel
import { unstable_noStore as noStore } from 'next/cache';

export default function Transcribe() {
  noStore();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedData, setStreamedData] = useState<AssistantResponse>();
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({msg: null, status: null});
  const [streamingIsDone, setStreamingIsDone] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const router = useRouter();

  async function handleStreaming(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder) {
    let tmp = ''
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // decodes unit8array into a string
      const chunk = decoder.decode(value, { stream: true });
      // append chunks to the string as they stream in
      tmp += chunk;
      let parsedJSON = parse(tmp);

      // transcript is availalbe, but video is not a recipe
      if (parsedJSON?.success === false) {
        setNeedsUpdate(true);
        setErrorMsg({status: 400, msg: "No recipe found in video"});
        return
      }

      setStreamedData(parsedJSON)
    }
  }

  async function fetchRecipeTranscription() {
    // reset state each run
    setLoading(true);
    setStreamingIsDone(false);
    setErrorMsg({msg: null, status: null});
    setNeedsUpdate(false);
    
    const response = await fetch(`/api/transcribe?url=${url}`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    });

    if (response.ok && response.body) {
      setLoading(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      await handleStreaming(reader, decoder);
      setStreamingIsDone(true);
    } else {
      setLoading(false);
      setNeedsUpdate(true);
      setErrorMsg({msg: response.statusText, status: response.status});
    }
  }

  async function createRecipe() {
    const response = await fetch(`/api/recipe/create`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...streamedData, "video_url": url})
    });

    if (!response.ok) {
      setNeedsUpdate(true)
      setErrorMsg({status: 400, msg: "Error creating recipe"});
      return
    }

    // if success, redirect to newly created item route
    const res = await response.json();
    router.push(`${origin}/recipes/${res.item_id}`)
  }

  return (
    <React.Fragment>
      <div className="url-wrap">
        <label htmlFor="url">Paste URL here:</label>
        <input name="url" 
          type="url" 
          placeholder="example: https://www.youtube.com/shorts/[video-id]" 
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn" onClick={() => fetchRecipeTranscription()}>Generate</button>
      </div>

      {loading && <Loading message="AI is analysing your video"/>}

      {needsUpdate ?  
        <ErrorMessage msg={errorMsg?.msg} needsUpdate={needsUpdate} />
      : streamedData?.recipe &&
        <div className={"streamed-content"}>
          <h3>Name: {streamedData?.recipe.name}</h3>
          <p><strong>Description: </strong> {streamedData?.recipe.description}</p>
          <p><strong>Cooking Time: </strong>{streamedData?.recipe.cooking_time}</p>
          <strong>Categories: </strong>
          <ul style={{display: 'flex', gap: "1rem"}}>
            {streamedData?.recipe.categories?.map((cat, i) => <li key={i}>{cat}</li>)}
          </ul>
          <strong>Ingredients</strong>
          <ul>
            {streamedData?.recipe.ingredients?.map((ingr, i) => <li key={i}>{ingr}</li>)}
          </ul>
          <strong>Instructions</strong>
          <ol>
            {streamedData?.recipe.instructions?.map((inst, i) => <li key={i}>{inst}</li>)}
          </ol>

          {streamingIsDone ? 
            <button onClick={() => createRecipe()} className="btn" style={{justifySelf: "center"}}>Save Recipe</button> 
          : null}
        </div>}
    </React.Fragment>
  )
}

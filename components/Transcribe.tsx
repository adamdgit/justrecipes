'use client'

import React, { useState } from "react";
import { parse } from "partial-json";
import type { AssistantResponse } from "@/types/main";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { isValidURL } from "@/utils/isValidURL";
import { getIDfromURL } from "@/utils/getIDfromURL";
import { fetchTranscript } from "@/utils/fetchTranscript";

export default function Transcribe() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedData, setStreamedData] = useState<AssistantResponse>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
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
        setErrorMsg("No recipe found in video");
        return
      }

      setStreamedData(parsedJSON)
    }
  }

  async function fetchRecipeTranscription() {
    // reset state each run
    setLoading(true);
    setStreamingIsDone(false);
    setErrorMsg(undefined);
    setNeedsUpdate(false);

    // handle invalid urls
    if (!isValidURL(url)) {
      setLoading(false);
      setNeedsUpdate(true);
      setErrorMsg("Invalid URL provided")
      return
    }

    const URL_ID = getIDfromURL(url);
    const res = await fetch(`/api/recipe/${URL_ID}`);
    // if not okay, recipe already exists for this ID
    if (!res.ok) {
      setLoading(false);
      setNeedsUpdate(true);
      setErrorMsg(res.statusText)
      return
    }

    const { error: transcriptError, msg, data: transcriptData } = await fetchTranscript(URL_ID);
    // handling transcript api errors
    if (!transcriptData || transcriptError) { 
      setLoading(false);
      setNeedsUpdate(true);
      setErrorMsg(msg);
      return
    }
    
    // send video transcript to the server
    const response = await fetch(`/api/transcribe?transcript=${transcriptData}`, {
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
      setErrorMsg(response.statusText);
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
      setErrorMsg("Error creating recipe");
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
        <ErrorMessage msg={errorMsg} needsUpdate={needsUpdate} />
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

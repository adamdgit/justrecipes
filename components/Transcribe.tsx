'use client'

import React, { useState } from "react";
import { parse, Allow } from "partial-json";
import type { ErrorMsg, AssistantResponse } from "@/types/main";
import ErrorMessage from "./ErrorMessage";

export default function Transcribe() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedData, setStreamedData] = useState<AssistantResponse>();
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({msg: null, status: null});
  const [streamingIsDone, setStreamingIsDone] = useState(false);

  const [saved, setSaved] = useState(false);
  const [savedID, setSavedID] = useState();

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
        setErrorMsg({status: 400, msg: "No recipe found in video"});
        return
      }

      setStreamedData(parsedJSON)
    }
  }

  async function fetchRecipeTranscription() {
    // reset state each run
    setSaved(false);
    setSavedID(undefined);
    setLoading(true);
    setStreamingIsDone(false);
    setErrorMsg({msg: null, status: null});
    
    const response = await fetch(`http://localhost:3000/api/transcribe?url=${url}`, {
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
      setErrorMsg({msg: response.statusText, status: response.status});
    }
  }

  async function createRecipe() {
    const response = await fetch(`http://localhost:3000/api/recipe/create`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...streamedData, "video_url": url})
    });

    if (!response.ok) {
      // handle error
    }

    // if successful get newly created items ID
    setSaved(true);
    const res = await response.json();
    setSavedID(res.item_id);

  }

  return (
    <div className="content-wrap">
      <div className="url-wrap">
        <label htmlFor="url">Paste URL here:</label>
        <input name="url" 
          type="url" 
          placeholder="example: https://www.youtube.com/shorts/[video-id]" 
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn" onClick={() => fetchRecipeTranscription()}>Generate</button>
      </div>

      {loading && <p>Connecting to AI assistant..</p>}

      {errorMsg.status ?  
        <ErrorMessage msg={errorMsg?.msg} />
      : streamedData?.recipe && !saved &&
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

          {streamingIsDone ? <button onClick={() => createRecipe()}>Save Recipe</button> : null}
        </div>}

        {/* TODO CLEAN UP THIS SECTION */}
        {saved ? 
          <div style={{"display": "flex", "gap" : "1rem"}}>
            <p>Recipe has been saved, view it here: </p>
            <a href={`http://localhost:3000/recipes/${savedID}`} className="">View Created Item</a>
          </div>
        : null}

    </div>
  )
}

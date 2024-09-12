'use client'

import React, { useState } from "react";
import { parse, Allow } from "partial-json";
import type { ErrorMsg, AssistantResponse } from "@/types/main";

export default function Transcribe() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AssistantResponse>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg | undefined>();

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
        setError(true);
        setErrorMsg({status: 400, msg: "No recipe found in video"});
        return
      }

      setData(parsedJSON)
    }
  }

  async function fetchRecipeTranscription() {
    setLoading(true);
    setError(false);
    
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
    } else {
      setLoading(false);
      setError(true);
      setErrorMsg({status: response.status, msg: response.statusText});
    }
  }

  async function saveRecipe() {
    const response = await fetch(`http://localhost:3000/api/recipe/create`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...data, "shorts_url": url})
    });
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
        <button className="generate-btn" onClick={() => fetchRecipeTranscription()}>Generate</button>
      </div>

      {loading && <p>Connecting to AI assistant..</p>}

      {error ?  
        <p>{errorMsg?.msg}</p>
      : data?.recipe &&
        <div className={"streamed-content"}>
          <h3>Name: {data?.recipe.name}</h3>
          <p><strong>Description: </strong> {data?.recipe.description}</p>
          <p><strong>Cooking Time: </strong>{data?.recipe.cooking_time}</p>
          <strong>Tags</strong>
          <ul style={{display: 'flex', gap: "1rem"}}>
            {data?.recipe.tags?.map((tag, i) => <li key={i}>{tag}</li>)}
          </ul>
          <strong>Ingredients</strong>
          <ul>
            {data?.recipe.ingredients?.map((ingr, i) => <li key={i}>{ingr}</li>)}
          </ul>
          <strong>Instructions</strong>
          <ol>
            {data?.recipe.instructions?.map((inst, i) => <li key={i}>{inst}</li>)}
          </ol>

          <button onClick={() => saveRecipe()}>Save Recipe</button>
        </div>}

    </div>
  )
}

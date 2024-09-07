'use client'

import React, { useState } from "react";
import Markdown from 'react-markdown'

type ErrorMsg = {
  status: number,
  msg: string
}

export default function Transcribe() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg | undefined>();

  async function handleStreaming(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // decodes unit8array into a string
      const chunk = decoder.decode(value, { stream: true });
      // append chunks to the string as they stream in
      setData(prev => prev += chunk)
    }
  }

  async function handleOpenAIAPI() {
    setLoading(true);

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

  return (
    <div className="content-wrap">
      <div className="url-wrap">
        <label htmlFor="url">Paste URL here:</label>
        <input name="url" 
          type="url" 
          placeholder="example: https://www.youtube.com/shorts/[video-id]" 
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="generate-btn" onClick={() => handleOpenAIAPI()}>Generate</button>
      </div>

      {loading && <p>Connecting to AI assistant..</p>}

      {error && <p>{errorMsg?.msg}</p>}

      {data && <Markdown className={"streamed-content"}>{data}</Markdown>}

    </div>
  )
}

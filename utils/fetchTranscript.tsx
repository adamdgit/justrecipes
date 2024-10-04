
export async function fetchTranscript(id: string) {
  const RE_XML_TRANSCRIPT = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
  const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)'
  
  const response = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: { 'User-Agent': USER_AGENT }
  });

  if (!response.ok) {
    return { error: true, msg: "error fetching video data", data: null }
  }

  console.error(response.body);
  console.error(response)

  const captionsText = await response.text();
  const html = captionsText.split('"captions":');
  const captions = await JSON.parse(html[1].split(',"videoDetails')[0].replace('\n', ''));
  const transcriptURL = captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl as string;

  const transcriptResponse = await fetch(transcriptURL, {
      headers: { 'User-Agent': USER_AGENT }
  });

  if (!transcriptResponse.ok) {
    return { error: true, msg: "error fetching video data", data: null }
  }

  const transcript = await transcriptResponse.text();
  const results = transcript.replace(/<text.*?>(.*?)<\/text>/g, '$1 ').replace(/&amp;#39;/g, "'");

  return { error: false, msg: "success", data: results };
}
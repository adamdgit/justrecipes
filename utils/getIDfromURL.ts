/**
 * Extracts the video ID from a YouTube video, shorts URL or share link.
 * @param {string} url - The full YouTube URL.
 * @returns {string} The extracted video ID from the provided URL.
 * @example
 * getIDfromURL("https://www.youtube.com/shorts/abc123?si=example");
 * // returns 'abc123'
 */
export function getIDfromURL(url: string) {
  let URL_ID;

  // shorts link
  if (url.includes("/shorts")) {
    URL_ID = url.split("/shorts/")[1];

    // URL is share link, remove share component of url to get ID
    if (URL_ID.includes("?si=")) {
      URL_ID = URL_ID.split("?si=")[0];
    }
    return URL_ID;
  }

  // normal video share link
  if (url.includes("youtu.be/")) {
    URL_ID = url.split("youtu.be/")[1];

    // URL is share link, remove share component of url to get ID
    if (URL_ID.includes("?si=")) {
      URL_ID = URL_ID.split("?si=")[0];
    }
    return URL_ID;
  }

  // normal video
  if (url.includes("/watch")) {
    URL_ID = url.split("/watch?v=")[1];
    return URL_ID;
  }

  return URL_ID ?? "";
}
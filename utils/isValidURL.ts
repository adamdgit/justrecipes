/**
 * Validates if a given URL is a valid youtube link.
 * @param {string} url - The full URL.
 * @returns {boolean} true or false.
 * @example
 * isValidURL("https://www.youtube.com/shorts/abc123?si=example");
 * // returns 'true'
 */
export function isValidURL(url: string) {
  if (!url || url.length === 0) return false
  if (url.startsWith("https://youtube.com")) return true
  if (url.startsWith("https://www.youtube.com")) return true
  if (url.startsWith("https://youtu.be")) return true
  return false
}
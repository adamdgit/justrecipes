export function isValidURL(url: string) {
  if (!url || url.length === 0) return false
  if (!url.startsWith("https://youtube.com")) return false
  if (!url.startsWith("https://www.youtube.com")) return false
  if (!url.includes("/shorts")) return false
  return true
}
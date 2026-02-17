export function createSnippet(html: string, maxLength = 400): string {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  const text = html
    .replace(/<\/(p|div)>/gi, "$& ") // add space after closing p/div
    .replace(/<br\s*\/?>/gi, " ") // replace <br> with space
    .replace(/<[^>]+>/g, ""); // remove other tags

  return (
    text.slice(0, maxLength).trim() + (text.length > maxLength ? "..." : "")
  );
}

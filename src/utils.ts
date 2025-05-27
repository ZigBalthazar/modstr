// Utility functions for handling text and Markdown
export function cleanMarkdownText(text: string) {
  let cleanedText = text
    .replace(/[\r\n]+/g, " ") // Remove newlines and carriage returns
    .replace(/\\n/g, " ") // Remove escaped newlines
    .replace(/\s{2,}/g, " ") // Collapse multiple spaces
    .trim();

  // Remove Markdown code block markers if present
  cleanedText = cleanedText.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  return cleanedText;
}

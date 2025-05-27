import { ClassificationLabel, ClassificationStatus } from "./enums";

export function createClassificationPrompt(eventContent: string): string {
  return `
You are an AI classifier for Nostr events. Your task is to analyze the following event and return:

1. A "status" from this fixed list:

${Object.values(ClassificationStatus)
  .map((status) => `"${status}"`)
  .join(",\n\t")}
}

2. One or more "labels" from this fixed list:
${Object.values(ClassificationLabel)
  .map((label) => `"${label}"`)
  .join(",\n\t")}

3. A short explanation in "reason".

Event Text:
\`\`\`
${eventContent}
\`\`\`

Expected Output Format:
\`\`\`json
{
	"status": "SAFE" | "WARNING" | "HARMFUL",
	"labels": ["OK", "INFORMATIVE"],
	"reason": "Short explanation of the classification"
}
\`\`\`
`.trim();
}
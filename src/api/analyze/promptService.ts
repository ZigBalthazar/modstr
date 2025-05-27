import { ClassificationLabel, ClassificationStatus } from "./enums";

export function createClassificationPrompt(eventContent: string): string {
	return `
You are an AI classifier for Nostr events. Your task is to analyze the following event and return:

1. A "status" from this fixed list:

${Object.values(ClassificationStatus)
	.map((status) => `"${status}"`)
	.join(",\n\t")}

2. One or more "labels" from this fixed list:
${Object.values(ClassificationLabel)
	.map((label) => `"${label}"`)
	.join(",\n\t")}

3. A short explanation in "reason".

Analyze the event for:
- Content classification based on text and context
- Presence of suspicious or malicious URLs (if any, label as dangerous)
- Spam signals (repetition, irrelevance, unsolicited promotion)
- Toxic or harmful language (hate speech, threats, obscenity)
- Misinformation or manipulative content (especially financial or health-related)
- Signs of impersonation or social engineering
- Any violation of known community or platform norms

Be strict, consistent, and assume your response will trigger moderation or alerting mechanisms.

Event Text:
\`\`\`
${eventContent}
\`\`\`
`.trim();
}

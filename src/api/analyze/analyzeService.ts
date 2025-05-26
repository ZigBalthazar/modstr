import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { generateText, type LanguageModelV1 } from "ai";
import { google } from "@ai-sdk/google";

function createClassificationPrompt(eventContent: string, tags: string[] = []): string {
	const tagText = tags.length > 0 ? `\n\nTags: ${tags.join(", ")}` : "";

	return `
You are an AI classifier for Nostr events. Your task is to analyze the following event and return:

1. A "status" from this fixed list:
[
  "SAFE",
  "WARNING",
  "HARMFUL"
]

2. One or more "labels" from this fixed list:
[
  "OK",
  "INFORMATIVE",
  "FRIENDLY",
  "OFFENSIVE",
  "SPAM",
  "MISLEADING",
  "SENSITIVE",
  "PROFANITY",
  "HATEFUL",
  "VIOLENT",
  "SEXUAL",
  "SELF_HARM",
  "DANGEROUS",
  "NSFW",
  "AI_GENERATED",
  "UNVERIFIED",
  "LANGUAGE_UNKNOWN"
]

3. A short explanation in "reason".

Event Text:
\`\`\`
${eventContent}${tagText}
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

export class AnalyzeService {
	private model: LanguageModelV1;

	constructor() {
		this.model = google("gemini-2.0-flash-001");
	}

	async analyze(content: string, tags: string[][]): Promise<ServiceResponse<string | null>> {
		try {
			const message = createClassificationPrompt(content, tags.flat());
			const { text } = await generateText({
				model: this.model,
				prompt: message,
				maxSteps: 2,
			});

			return ServiceResponse.success("Classification generated successfully.", text, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error generate message : $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while generating message.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export const analyzeService = new AnalyzeService();

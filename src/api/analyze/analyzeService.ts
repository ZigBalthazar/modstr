import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { generateText, type LanguageModelV1 } from "ai";
import { google } from "@ai-sdk/google";
import { Event, verifyEvent } from "nostr-tools";
import { AnalyzeEventResponse } from "./analyzeModel";
import { ClassificationLabel, ClassificationStatus } from "./enums";
import { createClassificationPrompt } from "./promptService";
import { cleanMarkdownText } from "@/utils";

export class AnalyzeService {
  private model: LanguageModelV1;

  constructor() {
    this.model = google("gemini-2.0-flash-001", {
      structuredOutputs: true,
    });
  }

  private async analyze(
    content: string
  ): Promise<{ status: ClassificationStatus; labels: ClassificationLabel[]; reason: string }> {
    const message = createClassificationPrompt(content);
    const { text } = await generateText({
      model: this.model,
      prompt: message,
      maxSteps: 1,
	  maxTokens: 1000,
	  temperature: 0.2,
	  topP: 0.8,
    });

    // Clean up the text before parsing to JSON
    let cleanedText = cleanMarkdownText(text);

    return JSON.parse(cleanedText);
  }

  async analyzeEvent(event: Event): Promise<ServiceResponse<AnalyzeEventResponse | null>> {
    try {
      const isGood = verifyEvent(event);
      if (!isGood) {
        return ServiceResponse.failure("Invalid event format.", null, StatusCodes.BAD_REQUEST);
      }

      const tagText = event.tags.length > 0 ? `\n\nTags: ${event.tags.join(", ")}` : "";
      const contentAndTags = `${event.content}${tagText}`;

      const analyzeResponse = await this.analyze(contentAndTags);

      const result = {
        event_id: event.id,
        status: analyzeResponse.status,
        labels: analyzeResponse.labels,
        reason: analyzeResponse.reason,
      };

      return ServiceResponse.success("Classification generated successfully.", result, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error generate message : ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while generating message.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const analyzeService = new AnalyzeService();

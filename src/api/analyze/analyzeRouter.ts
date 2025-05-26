import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { analyzeEventRequestSchema, analyzeEventResponseSchema } from "@/api/analyze/analyzeModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { analyzeController } from "./analyzeController";


export const analyzeRegistry = new OpenAPIRegistry();
export const analyzeRouter: Router = express.Router();

// chatRegistry.register("Chat", ChatSchema);

analyzeRegistry.registerPath({
  method: "post",
  path: "/analyze",
  tags: ["Analyze"],
  description: "Analyze a Nostr event content and tags for safety and content labels",
  summary: "Analyze Nostr event",
  request: { body: { content: { "application/json": { schema: analyzeEventRequestSchema.shape.body } } } },
  responses: {
    ...createApiResponse(analyzeEventResponseSchema, "Success"),
    400: {
      description: "Invalid event format",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Invalid event format" },
              responseObject: { type: "null", example: null },
              statusCode: { type: "integer", example: 400 }
            },
            required: ["success", "message", "responseObject", "statusCode"]
          },
          examples: {
            invalidEvent: {
              value: {
                success: false,
                message: "Invalid event format",
                responseObject: null,
                statusCode: 400
              }
            }
          }
        }
      }
    }
  }
});

analyzeRouter.post("/", validateRequest(analyzeEventRequestSchema), analyzeController.analyzeEvent);

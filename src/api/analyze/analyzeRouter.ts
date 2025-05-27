import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  analyzeBlobRequestSchema,
  analyzeBlobResponseSchema,
  analyzeEventRequestSchema,
  analyzeEventResponseSchema,
} from "@/api/analyze/analyzeModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { analyzeController } from "./analyzeController";

export const analyzeRegistry = new OpenAPIRegistry();
export const analyzeRouter: Router = express.Router();

//! POST /analyze/event
analyzeRegistry.registerPath({
  method: "post",
  path: "/analyze/event",
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
              statusCode: { type: "integer", example: 400 },
            },
            required: ["success", "message", "responseObject", "statusCode"],
          },
          examples: {
            invalidEvent: {
              value: {
                success: false,
                message: "Invalid event format",
                responseObject: null,
                statusCode: 400,
              },
            },
          },
        },
      },
    },
  },
});

analyzeRouter.post("/event", validateRequest(analyzeEventRequestSchema), analyzeController.analyzeEvent);

//! POST /analyze/Blob
analyzeRegistry.registerPath({
  method: "post",
  path: "/analyze/blob",
  tags: ["Analyze"],
  summary: "Analyze Blob Media",
  description:
    "Analyze Blob content and tags for safety and content labels. \n\n **NOTE**: The correct MIME type is required; an incorrect MIME type may affect the analysis result.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: analyzeBlobRequestSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(analyzeBlobResponseSchema, "Success"),
    400: {
      description: "Invalid request. Possible reasons: invalid URL or MIME type.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Invalid url or mime type" },
              responseObject: { type: "null", example: null },
              statusCode: { type: "integer", example: 400 },
            },
            required: ["success", "message", "responseObject", "statusCode"],
          },
          examples: {
            invalidUrl: {
              value: {
                success: false,
                message: "Invalid url",
                responseObject: null,
                statusCode: 400,
              },
            },
            invalidMimeType: {
              value: {
                success: false,
                message: "Invalid mime type",
                responseObject: null,
                statusCode: 400,
              },
            },
          },
        },
      },
    },
  },
});

analyzeRouter.post("/blob", validateRequest(analyzeBlobRequestSchema), analyzeController.analyzeBlob);

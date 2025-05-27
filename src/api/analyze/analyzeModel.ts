import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  BlobClassificationStatus,
  BlobSupportedMimeTypes,
  EventClassificationLabel,
  EventClassificationStatus,
} from "./enums";

extendZodWithOpenApi(z);

export const analyzeEventRequestSchema = z.object({
  body: z.object({
    id: z
      .string()
      .length(64)
      .regex(/^[0-9a-f]{64}$/)
      .describe("32-bytes lowercase hex-encoded sha256 of the serialized event data"),
    pubkey: z
      .string()
      .length(64)
      .regex(/^[0-9a-f]{64}$/)
      .describe("32-bytes lowercase hex-encoded public key of the event creator"),
    created_at: z.number().int().describe("Unix timestamp in seconds"),
    kind: z.number().int().min(0).max(65535).describe("Integer between 0 and 65535"),
    tags: z.array(z.array(z.string())).describe("Array of tag arrays, e.g. [['e', 'id', 'relay'], ['alt', 'reply']]"),
    content: z.string().describe("Arbitrary string content of the event"),
    sig: z
      .string()
      .length(128)
      .regex(/^[0-9a-f]{128}$/)
      .describe(
        "64-bytes lowercase hex of the signature of the sha256 hash of the serialized event data, same as the 'id' field"
      ),
  }),
});

export const analyzeEventResponseSchema = z.object({
  event_id: z.string().describe("Unique identifier for the Nostr event"),
  status: z.nativeEnum(EventClassificationStatus).describe("Status of the analysis"),
  labels: z.array(z.nativeEnum(EventClassificationLabel)).describe("Array of labels assigned to the event"),
  reason: z.string().describe("Reason for the assigned status"),
});
export type AnalyzeEventResponse = z.infer<typeof analyzeEventResponseSchema>;

export const analyzeResultSchema = z.object({
  status: z.nativeEnum(EventClassificationStatus).describe("Status of the analysis"),
  labels: z.array(z.nativeEnum(EventClassificationLabel)).describe("Array of labels assigned to the event"),
  reason: z.string().describe("Reason for the assigned status"),
});
export type AnalyzeResult = z.infer<typeof analyzeResultSchema>;

export const analyzeBlobRequestSchema = z.object({
  body: z.object({
    url: z.string().url().describe("URL of the Blob media to analyze"),
    mimeType: z.nativeEnum(BlobSupportedMimeTypes).describe("Mime type of the Blob media to analyze"),
  }),
});

export const analyzeBlobResponseSchema = z.object({
  url: z.string().url().describe("URL of the Blob media that was analyzed"),
  status: z.nativeEnum(BlobClassificationStatus).describe("Status of the analysis"),
  labels: z.array(z.nativeEnum(BlobClassificationStatus)).describe("Array of labels assigned to the event"),
  reason: z.string().describe("Reason for the assigned status"),
});
export type AnalyzeBlobResponse = z.infer<typeof analyzeBlobResponseSchema>;

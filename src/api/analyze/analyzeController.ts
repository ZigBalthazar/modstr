import type { Request, RequestHandler, Response } from "express";
import { analyzeService } from "./analyzeService";
import type { Event } from "nostr-tools";

class AnalyzeController {
  public analyzeEvent: RequestHandler = async (req: Request, res: Response) => {
    const event = req.body as Event;

    const serviceResponse = await analyzeService.analyzeEvent(event);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public analyzeBlob: RequestHandler = async (req: Request, res: Response) => {
    const url = req.body.url as string;
    const mimeType = req.body.mimeType as string;

    const serviceResponse = await analyzeService.analyzeBlob(url, mimeType);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const analyzeController = new AnalyzeController();

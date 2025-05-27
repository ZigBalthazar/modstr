import type { Request, RequestHandler, Response } from "express";
import { analyzeService } from "./analyzeService";
import type { Event } from "nostr-tools";

class AnalyzeController {
	public analyzeEvent: RequestHandler = async (req: Request, res: Response) => {
		const event = req.body as Event;

		const serviceResponse = await analyzeService.analyzeEvent(event);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const analyzeController = new AnalyzeController();

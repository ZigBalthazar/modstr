import type { Request, RequestHandler, Response } from "express";
import { analyzeService } from "./analyzeService";
import { type Event, verifyEvent } from "nostr-tools";
import { ServiceResponse } from "@/common/models/serviceResponse";

class AnalyzeController {
	public analyzeEvent: RequestHandler = async (req: Request, res: Response) => {
		const event = req.body as Event;

		const isGood = verifyEvent(event);
		if (!isGood) {
			res.status(400).send(ServiceResponse.failure("Invalid event format", null, 400));
			return;
		}

		const serviceResponse = await analyzeService.analyze(event.content, event.tags);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const analyzeController = new AnalyzeController();

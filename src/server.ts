import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import path from "node:path";
import { name, version, repository, description } from "../package.json";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import { analyzeRouter } from "./api/analyze/analyzeRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/static", express.static(path.join(__dirname, "views", "assets")));

app.get("/", (req, res) => {
	res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com");
	res.render("home", {
		Name: name,
		Icon: "/static/icon.png",
		Description: description,
		Email: "hi@dezh.tech",
		PubKey: "npub1...",
		DocsURL: "https://docs.dezh.tech/docs/category/modstr",
		ServiceName: "",
		Version: version,
		SupportedNIPs: "",
		RepoURL: repository,
	});
});
app.use("/health-check", healthCheckRouter);
app.use("/analyze", analyzeRouter);

// Swagger UI
app.use("/docs", openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };

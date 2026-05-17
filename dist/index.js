#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { registerJobTools } from "./tools/jobs.js";
import { registerDashboardTools } from "./tools/dashboard.js";
import { registerAiTools } from "./tools/ai.js";
import { registerCoffeeChatTools } from "./tools/coffee-chat.js";
import { registerNotificationTools } from "./tools/notifications.js";
import { registerProfileTools } from "./tools/profile.js";
import { registerDocumentTools } from "./tools/documents.js";
import { registerSubscriptionTools } from "./tools/subscription.js";
import { registerCommentTools } from "./tools/comments.js";
import { registerCvTools } from "./tools/cv.js";
import { registerChatbotTools } from "./tools/chatbot.js";
import { registerScrapingTools } from "./tools/scraping.js";
import { registerAnalyticsTools } from "./tools/analytics.js";
import { registerLocalScrapingTools } from "./tools/local-scraping.js";
import { registerAutoApplyTools } from "./auto-apply/tools.js";
import { PLUGIN_NAME, PLUGIN_VERSION } from "./version.js";
import { API_BASE_URL } from "./api.js";
const transport = (process.env.TRANSPORT || "stdio");
const server = new FastMCP({
    name: PLUGIN_NAME,
    version: PLUGIN_VERSION,
    oauth: {
        enabled: true,
        protectedResource: {
            resource: API_BASE_URL,
            authorizationServers: [API_BASE_URL],
        },
    },
    authenticate: async (request) => {
        // stdio transport: request is undefined, read API key from env
        if (!request) {
            const envKey = process.env.JOBJOURNEY_API_KEY;
            if (!envKey) {
                throw new Error("Missing JOBJOURNEY_API_KEY environment variable for stdio transport.");
            }
            return { apiKey: envKey };
        }
        // HTTP transport: detect OAuth bearer vs API key.
        const authHeader = request.headers.authorization;
        const xApiKey = request.headers["x-api-key"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.slice(7).trim();
            if (token.startsWith("jj_oat_")) {
                return { accessToken: token };
            }
            return { apiKey: token };
        }
        if (typeof xApiKey === "string" && xApiKey.trim()) {
            return { apiKey: xApiKey.trim() };
        }
        throw new Error("Missing credentials. Provide Authorization: Bearer <jj_oat_... or api-key> or X-API-Key header.");
    },
});
registerJobTools(server);
registerDashboardTools(server);
registerAiTools(server);
registerCoffeeChatTools(server);
registerNotificationTools(server);
registerProfileTools(server);
registerDocumentTools(server);
registerSubscriptionTools(server);
registerCommentTools(server);
registerCvTools(server);
registerChatbotTools(server);
registerScrapingTools(server);
registerAnalyticsTools(server);
registerLocalScrapingTools(server);
registerAutoApplyTools(server);
if (transport === "httpStream") {
    const port = parseInt(process.env.PORT || "8080", 10);
    server.start({
        transportType: "httpStream",
        httpStream: { port },
    });
}
else {
    server.start({
        transportType: "stdio",
    });
    // Exit gracefully when Claude Code closes the stdio pipe
    process.stdin.on("end", () => {
        process.exit(0);
    });
    process.stdin.on("error", () => {
        process.exit(0);
    });
}

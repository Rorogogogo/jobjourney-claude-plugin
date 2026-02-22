import { FastMCP } from "fastmcp";
import { z } from "zod";
import { apiCall } from "../api.js";
import { SessionAuth } from "../types.js";

export function registerAnalyticsTools(server: FastMCP<SessionAuth>) {
  server.addTool({
    name: "get_portfolio_visits",
    description: "Get the user's portfolio visit count.",
    parameters: z.object({}),
    execute: async (_args, context) => {
      const apiKey = context.session?.apiKey;
      const data = (await apiCall("/api/profile/portfolio/visits", {}, apiKey)) as {
        data?: { totalVisits?: number; visitsThisMonth?: number; visitsThisWeek?: number };
      };

      const visits = data.data;
      if (!visits) return "Could not retrieve portfolio visit data.";

      return [
        "Portfolio Visits",
        `Total: ${visits.totalVisits ?? 0}`,
        `This month: ${visits.visitsThisMonth ?? 0}`,
        `This week: ${visits.visitsThisWeek ?? 0}`,
      ].join("\n");
    },
  });

  server.addTool({
    name: "get_portfolio_analytics",
    description: "Get detailed analytics for a portfolio page.",
    parameters: z.object({
      report_slug: z.string().describe("The portfolio slug to get analytics for"),
    }),
    execute: async (args, context) => {
      const apiKey = context.session?.apiKey;
      const data = (await apiCall(`/api/report-tracking/analytics/${args.report_slug}`, {}, apiKey)) as {
        data?: unknown;
      };

      if (!data.data) return "Could not retrieve portfolio analytics.";
      return typeof data.data === "string" ? data.data : JSON.stringify(data.data, null, 2);
    },
  });
}

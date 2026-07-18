import { z } from "zod";
import { generateIcs } from "@/lib/calendar/ics";
import { createLLMProvider } from "@/lib/llm/provider";
import { createTripFromText } from "@/lib/planner/createTrip";
import { parseGenericEmail } from "@/lib/parsers/genericEmail";
import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  extractIntent: publicProcedure.input(z.object({ text: z.string().min(1) })).query(async ({ input }) => createLLMProvider().extractIntent(input.text)),
  parseAnchor: publicProcedure.input(z.object({ text: z.string().min(1) })).query(({ input }) => parseGenericEmail(input.text)),
  planTrip: publicProcedure.input(z.object({ text: z.string().min(1) })).query(({ input }) => createTripFromText(input.text)),
  exportIcs: publicProcedure.input(z.object({ text: z.string().min(1) })).query(({ input }) => generateIcs(createTripFromText(input.text)))
});

export type AppRouter = typeof appRouter;

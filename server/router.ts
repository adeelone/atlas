import { z } from "zod";
import { createLLMProvider } from "@/lib/llm/provider";
import { parseGenericEmail } from "@/lib/parsers/genericEmail";
import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  extractIntent: publicProcedure.input(z.object({ text: z.string().min(1) })).query(async ({ input }) => createLLMProvider().extractIntent(input.text)),
  parseAnchor: publicProcedure.input(z.object({ text: z.string().min(1) })).query(({ input }) => parseGenericEmail(input.text))
});

export type AppRouter = typeof appRouter;

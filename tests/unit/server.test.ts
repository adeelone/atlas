import { describe, expect, it } from "vitest";
import { appRouter } from "@/server/router";
import { createContext } from "@/server/trpc";

describe("server router", () => {
  it("extracts intent through tRPC caller", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.extractIntent({ text: "5 days in Japan in November" })).resolves.toMatchObject({ destinations: ["Japan"] });
  });

  it("parses anchors through tRPC caller", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.parseAnchor({ text: "Flight: BKK\nConfirmation: ABC123\n2026-11-14T21:10:00+07:00" })).resolves.toHaveLength(1);
  });
});

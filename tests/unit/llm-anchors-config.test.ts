import { describe, expect, it } from "vitest";
import { anchorsToItems } from "@/lib/itinerary/anchors";
import { cacheWindows, featureFlags } from "@/lib/config";
import { createLLMProvider } from "@/lib/llm/provider";
import type { Anchor } from "@/types/trip";

describe("llm, anchors, and config", () => {
  it("streams planner progress chunks", async () => {
    const chunks: string[] = [];
    for await (const chunk of createLLMProvider().streamText({ prompt: "plan" })) {
      chunks.push(chunk);
    }
    expect(chunks).toContain("Scheduling around anchors...");
  });

  it("extracts alternate LLM defaults", async () => {
    await expect(createLLMProvider().extractIntent("2 weeks somewhere cheap in Asia with vegetarian food, no nightclubs")).resolves.toMatchObject({
      destinations: ["Southeast Asia"],
      durationDays: 14,
      budgetTier: "shoestring",
      dietaryRestrictions: ["vegetarian"],
      noGoList: ["nightclubs"]
    });
    await expect(createLLMProvider().extractIntent("3 days premium luxury stay for 4 people")).resolves.toMatchObject({
      partySize: 4,
      budgetTier: "premium",
      lodgingStyle: "luxury hotel"
    });
  });

  it("converts anchors to scheduled items with notes", () => {
    const anchors: Anchor[] = [{ id: "a", title: "Hotel", startsAt: "2026-01-01T10:00:00Z", endsAt: "2026-01-01T12:00:00Z", location: "Kyoto", source: "email", locked: true, confirmationCode: "ZZ99" }];
    expect(anchorsToItems(anchors)[0]).toMatchObject({ kind: "anchor", notes: "Confirmation ZZ99" });
  });

  it("exposes cache windows and feature flags", () => {
    expect(cacheWindows.geocoding).toBeGreaterThan(cacheWindows.weather);
    expect(typeof featureFlags.liveMode).toBe("boolean");
  });
});

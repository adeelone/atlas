import type { TripIntent } from "@/types/trip";

export interface LLMRequest {
  prompt: string;
  jsonSchemaName?: string;
}

export interface LLMProvider {
  name: string;
  extractIntent(input: string): Promise<TripIntent>;
  streamText(request: LLMRequest): AsyncIterable<string>;
}

export class MockLLMProvider implements LLMProvider {
  name = "mock";

  async extractIntent(input: string): Promise<TripIntent> {
    const lower = input.toLowerCase();
    const duration = Number(lower.match(/(\d+)\s*(day|days|week|weeks)/)?.[1] ?? 7);
    const durationDays = lower.includes("week") ? duration * 7 : duration;
    return {
      destinations: lower.includes("japan") ? ["Japan"] : lower.includes("asia") ? ["Southeast Asia"] : ["Open destination"],
      dateWindow: lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)[^\.,]*/i)?.[0] ?? "Flexible dates",
      durationDays,
      partySize: Number(lower.match(/(\d+)\s*(people|travelers|adults)/)?.[1] ?? 2),
      budgetTier: lower.includes("cheap") ? "shoestring" : lower.includes("premium") ? "premium" : "mid",
      budgetCapUsd: Number(lower.match(/\$([0-9,]+)/)?.[1]?.replace(",", "") ?? 0) || undefined,
      interests: ["food", "culture", "walking"].filter((interest) => lower.includes(interest)).concat(lower.includes("hiking") ? ["hiking"] : []),
      pace: lower.includes("chill") ? "chill" : lower.includes("packed") ? "packed" : "balanced",
      lodgingStyle: lower.includes("hostel") ? "hostel" : lower.includes("luxury") ? "luxury hotel" : "boutique hotel",
      dietaryRestrictions: lower.includes("vegetarian") ? ["vegetarian"] : [],
      accessibilityNeeds: [],
      noGoList: lower.includes("no nightclubs") ? ["nightclubs"] : []
    };
  }

  async *streamText(): AsyncIterable<string> {
    for (const chunk of ["Allocating cities...", "Discovering iconic and hidden picks...", "Scheduling around anchors...", "Preparing exports..."]) {
      yield chunk;
    }
  }
}

export function createLLMProvider(): LLMProvider {
  return new MockLLMProvider();
}

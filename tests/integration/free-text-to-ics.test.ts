import { describe, expect, it } from "vitest";
import { generateIcs } from "@/lib/calendar/ics";
import { createLLMProvider } from "@/lib/llm/provider";
import { demoTrip } from "@/lib/demoTrip";

describe("free text to itinerary export", () => {
  it("extracts intent and exports a generated trip snapshot", async () => {
    const intent = await createLLMProvider().extractIntent("5 days in Japan in November, $3000, hiking and ramen");
    const trip = { ...demoTrip, intent, name: "Japan 5 Day Draft" };
    expect(intent.destinations).toEqual(["Japan"]);
    expect(generateIcs(trip)).toMatchSnapshot();
  });
});

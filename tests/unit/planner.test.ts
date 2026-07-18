import { describe, expect, it } from "vitest";
import { createTripFromText, extractIntent } from "@/lib/planner/createTrip";

describe("trip planner", () => {
  it("turns chat text into a full trip", () => {
    const trip = createTripFromText("12 days in Japan late October, $4000, love hiking, ramen, quiet shrines, photography");
    expect(trip.cities.length).toBeGreaterThan(1);
    expect(trip.days).toHaveLength(11);
    expect(trip.flights[0].route).toContain("Home");
    expect(trip.hotels.length).toBe(trip.cities.length);
    expect(trip.activities.some((activity) => activity.stream === "hidden")).toBe(true);
    expect(trip.knowBeforeYouGo[0].country).toBe("Japan");
  });

  it("extracts sensible defaults", () => {
    const intent = extractIntent("two people want a cheap week somewhere in Southeast Asia in November with beaches and jungle");
    expect(intent.destinations).toEqual(["Southeast Asia"]);
    expect(intent.budgetTier).toBe("shoestring");
    expect(intent.interests).toContain("jungle");
  });
});

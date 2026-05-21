import { describe, expect, it } from "vitest";
import { allocateDays } from "@/lib/itinerary/dayAllocation";
import { detectConflicts } from "@/lib/itinerary/conflicts";
import { orderCities } from "@/lib/itinerary/cityOrdering";
import { violatesLockedAnchor } from "@/lib/itinerary/anchors";
import type { Anchor, ItineraryItem, TripIntent } from "@/types/trip";

const intent: TripIntent = {
  destinations: ["Japan"],
  dateWindow: "October",
  durationDays: 8,
  partySize: 2,
  budgetTier: "mid",
  interests: [],
  pace: "balanced",
  lodgingStyle: "hotel",
  dietaryRestrictions: [],
  accessibilityNeeds: [],
  noGoList: []
};

describe("itinerary utilities", () => {
  it("allocates days across cities", () => {
    const result = allocateDays(intent, [
      { name: "Tokyo", location: { lat: 35.6, lon: 139.6 }, reason: "arrival" },
      { name: "Kyoto", location: { lat: 35, lon: 135.7 }, reason: "shrines" }
    ]);
    expect(result).toHaveLength(2);
    expect(result[0].nights + result[1].nights).toBeGreaterThanOrEqual(7);
  });

  it("orders cities by nearest neighbor", () => {
    const result = orderCities([
      { name: "A", nights: 1, location: { lat: 0, lon: 0 }, reason: "" },
      { name: "C", nights: 1, location: { lat: 50, lon: 50 }, reason: "" },
      { name: "B", nights: 1, location: { lat: 1, lon: 1 }, reason: "" }
    ]);
    expect(result.map((city) => city.name)).toEqual(["A", "B", "C"]);
  });

  it("detects overlapping schedule conflicts", () => {
    const items: ItineraryItem[] = [
      { id: "a", title: "A", kind: "activity", startsAt: "2026-01-01T10:00:00Z", endsAt: "2026-01-01T12:00:00Z", location: "x" },
      { id: "b", title: "B", kind: "activity", startsAt: "2026-01-01T11:00:00Z", endsAt: "2026-01-01T13:00:00Z", location: "y" }
    ];
    expect(detectConflicts(items)).toHaveLength(1);
  });

  it("protects locked anchors", () => {
    const anchors: Anchor[] = [{ id: "a", title: "Flight", startsAt: "2026-01-01T10:00:00Z", endsAt: "2026-01-01T12:00:00Z", location: "BKK", source: "email", locked: true }];
    expect(violatesLockedAnchor({ id: "a", title: "Flight", kind: "anchor", startsAt: "2026-01-01T11:00:00Z", endsAt: "2026-01-01T12:00:00Z", location: "BKK" }, anchors)).toBe(true);
  });
});

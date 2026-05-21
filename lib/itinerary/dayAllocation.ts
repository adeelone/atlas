import type { TripIntent } from "@/types/trip";
import type { CityCandidate } from "./cityOrdering";

export function allocateDays(intent: TripIntent, cities: Omit<CityCandidate, "nights">[]): CityCandidate[] {
  const cityCount = Math.max(1, cities.length);
  const base = Math.floor(intent.durationDays / cityCount);
  let remainder = intent.durationDays % cityCount;
  return cities.map((city, index) => ({
    ...city,
    nights: Math.max(1, base + (remainder-- > 0 ? 1 : 0) - (index === 0 && intent.durationDays > 6 ? 1 : 0))
  }));
}

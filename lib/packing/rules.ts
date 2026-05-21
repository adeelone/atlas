import type { TripIntent } from "@/types/trip";

export function buildPackingList(intent: TripIntent): string[] {
  const items = ["Passport", "Travel insurance copy", "Phone charger", "Reusable water bottle"];
  if (intent.dateWindow.toLowerCase().includes("november")) items.push("Light rain shell");
  if (intent.interests.includes("hiking")) items.push("Trail shoes", "Daypack");
  if (intent.destinations.join(" ").toLowerCase().includes("asia") || intent.interests.join(" ").toLowerCase().includes("temple")) items.push("Temple-ready shoulder cover");
  return items;
}

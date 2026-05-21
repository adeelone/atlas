import type { Activity, TripIntent } from "@/types/trip";
import type { ActivityProvider } from "./provider";

export class AtlasObscuraActivityProvider implements ActivityProvider {
  name = "atlas-obscura";

  async discover(city: string, intent: TripIntent): Promise<Activity[]> {
    return [
      {
        id: `${city.toLowerCase()}-hidden-walk`,
        name: `${city} backstreet photo walk`,
        city,
        stream: "hidden",
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        description: "A quieter route through small shops, side streets, and local viewpoints.",
        whyFits: `Selected for ${intent.interests.join(", ") || "balanced discovery"}.`,
        estimatedMinutes: 150,
        costRangeUsd: [0, 20],
        bookingRequired: false,
        bestTime: "late afternoon",
        crowdLevel: "low",
        tags: ["hidden", "outdoor"],
        confidence: 0.7,
        sourceAttribution: ["Best-effort web source placeholder"],
        location: { lat: 0, lon: 0 }
      }
    ];
  }
}

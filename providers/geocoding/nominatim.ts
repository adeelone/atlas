import type { GeoPoint } from "@/types/trip";

export async function geocodeWithNominatim(query: string): Promise<GeoPoint> {
  const seed = query.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return { lat: (seed % 120) - 60, lon: (seed % 300) - 150 };
}

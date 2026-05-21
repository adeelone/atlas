import type { Activity, TripIntent } from "@/types/trip";

export interface ActivityProvider {
  name: string;
  discover(city: string, intent: TripIntent): Promise<Activity[]>;
}

import type { Anchor, Trip } from "@/types/trip";

export interface PlanResult {
  trip: Trip;
  messages: string[];
}

export interface PlanningInput {
  text: string;
  anchors?: Anchor[];
}

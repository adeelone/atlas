import type { ItineraryItem } from "@/types/trip";

export interface ScheduleConflict {
  itemA: string;
  itemB: string;
  reason: string;
}

export function detectConflicts(items: ItineraryItem[]): ScheduleConflict[] {
  const sorted = [...items].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const conflicts: ScheduleConflict[] = [];
  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    if (Date.parse(previous.endsAt) > Date.parse(current.startsAt)) {
      conflicts.push({ itemA: previous.id, itemB: current.id, reason: "Time ranges overlap" });
    }
  }
  return conflicts;
}

import type { Anchor, ItineraryItem } from "@/types/trip";

export function anchorsToItems(anchors: Anchor[]): ItineraryItem[] {
  return anchors.map((anchor) => ({
    id: anchor.id,
    title: anchor.title,
    kind: "anchor",
    startsAt: anchor.startsAt,
    endsAt: anchor.endsAt,
    location: anchor.location,
    costUsd: anchor.costUsd,
    locked: anchor.locked,
    notes: anchor.confirmationCode ? `Confirmation ${anchor.confirmationCode}` : undefined
  }));
}

export function violatesLockedAnchor(proposed: ItineraryItem, anchors: Anchor[]): boolean {
  return anchors.some((anchor) => anchor.locked && proposed.id === anchor.id && (proposed.startsAt !== anchor.startsAt || proposed.endsAt !== anchor.endsAt));
}

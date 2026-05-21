import type { Trip } from "@/types/trip";

function escapeIcs(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll(",", "\\,").replaceAll(";", "\\;").replaceAll("\n", "\\n");
}

export function generateIcs(trip: Trip): string {
  const events = trip.days.flatMap((day) => day.slots.flatMap((slot) => (slot.primary ? [slot.primary] : [])));
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Atlas//Travel Planner//EN"];
  for (const event of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.id}@atlas`);
    lines.push(`SUMMARY:${escapeIcs(event.title)}`);
    lines.push(`LOCATION:${escapeIcs(event.location)}`);
    lines.push(`DTSTART:${new Date(event.startsAt).toISOString().replace(/[-:]/g, "").replace(".000", "")}`);
    lines.push(`DTEND:${new Date(event.endsAt).toISOString().replace(/[-:]/g, "").replace(".000", "")}`);
    if (event.notes) lines.push(`DESCRIPTION:${escapeIcs(event.notes)}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

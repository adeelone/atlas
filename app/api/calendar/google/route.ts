import { createTripFromText } from "@/lib/planner/createTrip";

export async function POST(req: Request) {
  const body = (await req.json()) as { text?: string };
  const trip = createTripFromText(body.text ?? "7 days in Japan");
  const events = trip.days.flatMap((day) =>
    day.slots.flatMap((slot) =>
      slot.primary
        ? [
            {
              summary: slot.primary.title,
              location: slot.primary.location,
              start: slot.primary.startsAt,
              end: slot.primary.endsAt,
              notes: slot.primary.notes ?? ""
            }
          ]
        : []
    )
  );

  return Response.json({
    calendarName: `Atlas - ${trip.name}`,
    mode: "mock",
    events
  });
}

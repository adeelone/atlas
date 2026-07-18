import { generateIcs } from "@/lib/calendar/ics";
import { createTripFromText } from "@/lib/planner/createTrip";

export async function POST(req: Request) {
  const body = (await req.json()) as { text?: string };
  const trip = createTripFromText(body.text ?? "7 days in Japan in November");
  return new Response(generateIcs(trip), {
    headers: {
      "content-type": "text/calendar",
      "content-disposition": `attachment; filename="${trip.shareSlug}.ics"`
    }
  });
}
